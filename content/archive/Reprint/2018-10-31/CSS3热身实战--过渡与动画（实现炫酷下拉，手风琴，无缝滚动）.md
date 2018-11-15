---
title: CSS3热身实战--过渡与动画（实现炫酷下拉，手风琴，无缝滚动）
reprint: true
categories: reprint
abbrlink: ac352b02
date: 2018-10-31 02:30:10
---

{{% raw %}}
<h2 id="articleHeader0">1.&#x524D;&#x8A00;</h2><p>&#x5728;&#x81EA;&#x5DF1;&#x7684;&#x4E13;&#x680F;&#x4E0A;&#x5199;&#x4E86;&#x5341;&#x51E0;&#x7BC7;&#x6587;&#x7AE0;&#x4E86;&#xFF0C;&#x90FD;&#x662F;&#x4E0E;js&#x6709;&#x5173;&#x7684;&#x3002;&#x6682;&#x65F6;&#x8FD8;&#x6CA1;&#x6709;&#x5199;&#x8FC7;&#x5173;&#x4E8E;css3&#x7684;&#x6587;&#x7AE0;&#x3002;css3&#xFF0C;&#x7ED9;&#x6211;&#x7684;&#x611F;&#x89C9;&#x5C31;&#x662F;&#xFF0C;&#x4E0D;&#x96BE;&#xFF0C;&#x4F46;&#x662F;&#x5F88;&#x96BE;&#x73A9;&#x8F6C;&#x81EA;&#x5982;&#x3002;&#x4ECA;&#x5929;&#xFF0C;&#x5C31;&#x7528;css3&#x6765;&#x5B9E;&#x73B0;&#x4E09;&#x4E2A;&#x7279;&#x6548;&#xFF0C;&#x5E0C;&#x671B;&#x8FD9;&#x4E09;&#x4E2A;&#x7279;&#x6B8A;&#x80FD;&#x8BA9;&#x5927;&#x5BB6;&#x53D7;&#x5230;&#x542F;&#x53D1;&#xFF0C;&#x5229;&#x7528;css3&#x505A;&#x51FA;&#x66F4;&#x597D;&#xFF0C;&#x66F4;&#x70AB;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x5E76;&#x4E14;&#x5BF9;&#x6BD4;&#x8FD9;&#x4E09;&#x4E2A;&#x7279;&#x6548;&#x548C;JS&#x7279;&#x6548;&#x7684;&#x5BF9;&#x6BD4;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x5E2E;&#x52A9;&#x5230;&#x662F;&#x5927;&#x5BB6;&#x5B66;&#x5230;CSS3&#x7684;&#x4E00;&#x4E9B;&#x77E5;&#x8BC6;&#x3002;&#x4ECA;&#x5929;&#x8FD9;&#x4E09;&#x4E2A;&#x6848;&#x4F8B;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x4E00;&#x4E2A;&#x9884;&#x4E60;&#x6216;&#x8005;&#x70ED;&#x8EAB;&#x5427;&#xFF0C;&#x4EE5;&#x540E;&#x4E5F;&#x4F1A;&#x5199;&#x5173;&#x4E8E;CSS3&#x66F4;&#x597D;&#x7684;&#x4F5C;&#x54C1;&#x6216;&#x8005;&#x6587;&#x7AE0;&#xFF0C;&#x6700;&#x8FD1;&#x6211;&#x4E5F;&#x662F;&#x5728;&#x7F16;&#x5199;&#x4E00;&#x4E2A;css3&#x7684;&#x52A8;&#x753B;&#x5E93;&#xFF01;</p><p>&#x8FD9;&#x51E0;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF0C;&#x6458;&#x81EA;&#x6211;&#x81EA;&#x5DF1;&#x7684;&#x5E73;&#x5E38;&#x7EC3;&#x4E60;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x63D0;&#x5230;github&#x4E0A;&#x9762;&#x4E86;(<a href="https://github.com/chenhuiYj/demos/tree/master/css3-demos" rel="nofollow noreferrer" target="_blank">css3-demos</a>)&#x3002;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;star&#x3002;</p><h2 id="articleHeader1">2.&#x8FC7;&#x6E21;&#x4E0E;&#x52A8;&#x753B;&#x6982;&#x5FF5;&#x7406;&#x89E3;</h2><h3 id="articleHeader2">css3&#x8FC7;&#x6E21;</h3><p>&#x5316;&#x7528;&#x83DC;&#x9E1F;&#x6559;&#x7A0B;&#x7684;&#x8BF4;&#x6CD5;&#xFF0C;CSS3&#x8FC7;&#x6E21;&#x662F;&#x5143;&#x7D20;&#x4ECE;&#x4E00;&#x79CD;&#x6837;&#x5F0F;&#x9010;&#x6E10;&#x6539;&#x53D8;&#x4E3A;&#x53E6;&#x4E00;&#x79CD;&#x7684;&#x6548;&#x679C;&#x3002;&#x8981;&#x5B9E;&#x73B0;&#x8FD9;&#x4E00;&#x70B9;&#xFF0C;&#x5FC5;&#x987B;&#x89C4;&#x5B9A;&#x4E24;&#x9879;&#x5185;&#x5BB9;&#xFF1A;1.&#x6307;&#x5B9A;&#x8981;&#x6DFB;&#x52A0;&#x6548;&#x679C;&#x7684;CSS&#x5C5E;&#x6027;&#x3002;2.&#x6307;&#x5B9A;&#x6548;&#x679C;&#x7684;&#x6301;&#x7EED;&#x65F6;&#x95F4;&#x3002;</p><h3 id="articleHeader3">css3&#x52A8;&#x753B;</h3><p>&#x5316;&#x7528;&#x83DC;&#x9E1F;&#x6559;&#x7A0B;&#x7684;&#x8BF4;&#x6CD5;&#xFF0C;CSS3&#x52A8;&#x753B;&#x662F;&#x6839;&#x636E;@keyframes&#x89C4;&#x5219;&#x5185;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;CSS&#x6837;&#x5F0F;&#x548C;&#x52A8;&#x753B;&#x5C06;&#x9010;&#x6B65;&#x4ECE;&#x76EE;&#x524D;&#x7684;&#x6837;&#x5F0F;&#x66F4;&#x6539;&#x4E3A;&#x65B0;&#x7684;&#x6837;&#x5F0F;&#x3002;&#x6307;&#x5B9A;&#x81F3;&#x5C11;&#x8FD9;&#x4E24;&#x4E2A;CSS3&#x7684;&#x52A8;&#x753B;&#x5C5E;&#x6027;&#x7ED1;&#x5B9A;&#x5411;&#x4E00;&#x4E2A;&#x9009;&#x62E9;&#x5668;&#xFF1A;1.&#x89C4;&#x5B9A;&#x52A8;&#x753B;&#x7684;&#x540D;&#x79F0;&#x3002;2.&#x89C4;&#x5B9A;&#x52A8;&#x753B;&#x7684;&#x65F6;&#x957F;&#x3002;</p><h2 id="articleHeader4">3.&#x8FC7;&#x6E21;&#x6848;&#x4F8B;-&#x70AB;&#x9177;&#x4E0B;&#x62C9;</h2><p><span class="img-wrap"><img data-src="/img/bVRzhq?w=465&amp;h=212" src="https://static.alili.tech/img/bVRzhq?w=465&amp;h=212" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader5">3-1&#x539F;&#x7406;&#x5206;&#x6790;</h3><p>1.&#x9996;&#x5148;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5BFC;&#x822A;&#x4E0B;&#x62C9;&#xFF0C;&#x5C31;&#x662F;&#x9F20;&#x6807;&#x653E;&#x4E0A;&#x53BB;&#x51FA;&#x73B0;&#x4E00;&#x4E2A;&#x4E0B;&#x62C9;&#x5217;&#x8868;<br>2.&#x7136;&#x540E;&#x53D1;&#x73B0;&#xFF0C;&#x4E0B;&#x62C9;&#x91CC;&#x9762;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x9009;&#x9879;&#x662F;&#x4ECE;&#x4E0D;&#x540C;&#x7684;&#x4E24;&#x4E2A;&#x65B9;&#x5411;&#x51FA;&#x73B0;&#x7684;<br>3.&#x51FA;&#x73B0;&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x5947;&#x6570;&#x9879;&#x4ECE;&#x5DE6;&#x8FB9;&#x8FDB;&#xFF0C;&#x5076;&#x6570;&#x9879;&#x4ECE;&#x53F3;&#x8FB9;&#x8FDB;&#xFF0C;&#x8FDB;&#x5165;&#x65B9;&#x5F0F;&#x662F;&#x6ED1;&#x52A8;&#x6DE1;&#x5165;&#x3002;</p><h3 id="articleHeader6">3-2&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;</h3><p>1.&#x9996;&#x5148;&#x9875;&#x9762;&#x7684;&#x5E03;&#x5C40;&#xFF0C;&#x8FD9;&#x4E2A;&#x5E94;&#x8BE5;&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x83DC;&#x5355;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;ul-li&#x5217;&#x8868;&#xFF0C;&#x4E0B;&#x62C9;&#x5217;&#x8868;&#x5C31;&#x662F;li&#x4E0B;&#x9762;&#x7684;&#x4E00;&#x4E2A;ul-li&#x3002;</p><p>reset.css&#xFF08;&#x6837;&#x5F0F;&#x91CD;&#x7F6E;&#x8868;&#x548C;&#x4E2A;&#x4EBA;&#x5E38;&#x7528;&#x6837;&#x5F0F;&#x5C01;&#x88C5;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400}ol,ul{list-style:none}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:400}fieldset,img{border:0}textarea{resize:none}a{color:#000;text-decoration:none}.fontsize24,h1{font-size:24px}.fontsize20,h2{font-size:20px}.fontsize18,h3{font-size:18px}.fontsize16,h4{font-size:16px}.fontsize14,h5{font-size:14px}.fontsize12,h6{font-size:12px}.bold{font-weight:700}.fllil li{float:left}.fllir li{float:right}.fl{float:left}.fr{float:right}.radius{border-radius:100%}.positionCenterLeft{left:0;right:0;margin:auto}.positionCenterTop{top:0;bottom:0;margin:auto}.positionCenter{top:0;bottom:0;left:0;right:0;margin:auto}.distable{display:table}.distablecell{display:table-cell;vertical-align:middle}.textels{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.marginCenter{margin:0 auto}.t_l{text-align:left}.t_c{text-align:center}.t_r{text-align:right}.unLine{text-decoration:underline}.fiexd{position:fixed}.absolute{position:absolute}.relative{position:relative}.wrapper{clear:both;overflow:hidden}.o-hidden{overflow:hidden}.hidden{display:none}.block{display:block}.lblock{display:inline-block}.clear{clear:both}.pointer{cursor:pointer}img{border:0;vertical-align:middle} 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>*{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>}<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">font-weight</span>:<span class="hljs-number">400</span>}<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">ul</span>{<span class="hljs-attribute">list-style</span>:none}<span class="hljs-selector-tag">address</span>,<span class="hljs-selector-tag">caption</span>,<span class="hljs-selector-tag">cite</span>,<span class="hljs-selector-tag">code</span>,<span class="hljs-selector-tag">dfn</span>,<span class="hljs-selector-tag">em</span>,<span class="hljs-selector-tag">strong</span>,<span class="hljs-selector-tag">th</span>,<span class="hljs-selector-tag">var</span>{<span class="hljs-attribute">font-style</span>:normal;<span class="hljs-attribute">font-weight</span>:<span class="hljs-number">400</span>}<span class="hljs-selector-tag">fieldset</span>,<span class="hljs-selector-tag">img</span>{<span class="hljs-attribute">border</span>:<span class="hljs-number">0</span>}<span class="hljs-selector-tag">textarea</span>{<span class="hljs-attribute">resize</span>:none}<span class="hljs-selector-tag">a</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#000</span>;<span class="hljs-attribute">text-decoration</span>:none}<span class="hljs-selector-class">.fontsize24</span>,<span class="hljs-selector-tag">h1</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">24px</span>}<span class="hljs-selector-class">.fontsize20</span>,<span class="hljs-selector-tag">h2</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>}<span class="hljs-selector-class">.fontsize18</span>,<span class="hljs-selector-tag">h3</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">18px</span>}<span class="hljs-selector-class">.fontsize16</span>,<span class="hljs-selector-tag">h4</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">16px</span>}<span class="hljs-selector-class">.fontsize14</span>,<span class="hljs-selector-tag">h5</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span>}<span class="hljs-selector-class">.fontsize12</span>,<span class="hljs-selector-tag">h6</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>}<span class="hljs-selector-class">.bold</span>{<span class="hljs-attribute">font-weight</span>:<span class="hljs-number">700</span>}<span class="hljs-selector-class">.fllil</span> <span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">float</span>:left}<span class="hljs-selector-class">.fllir</span> <span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">float</span>:right}<span class="hljs-selector-class">.fl</span>{<span class="hljs-attribute">float</span>:left}<span class="hljs-selector-class">.fr</span>{<span class="hljs-attribute">float</span>:right}<span class="hljs-selector-class">.radius</span>{<span class="hljs-attribute">border-radius</span>:<span class="hljs-number">100%</span>}<span class="hljs-selector-class">.positionCenterLeft</span>{<span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>:auto}<span class="hljs-selector-class">.positionCenterTop</span>{<span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>:auto}<span class="hljs-selector-class">.positionCenter</span>{<span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>:auto}<span class="hljs-selector-class">.distable</span>{<span class="hljs-attribute">display</span>:table}<span class="hljs-selector-class">.distablecell</span>{<span class="hljs-attribute">display</span>:table-cell;<span class="hljs-attribute">vertical-align</span>:middle}<span class="hljs-selector-class">.textels</span>{<span class="hljs-attribute">overflow</span>:hidden;<span class="hljs-attribute">white-space</span>:nowrap;<span class="hljs-attribute">text-overflow</span>:ellipsis}<span class="hljs-selector-class">.marginCenter</span>{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto}<span class="hljs-selector-class">.t_l</span>{<span class="hljs-attribute">text-align</span>:left}<span class="hljs-selector-class">.t_c</span>{<span class="hljs-attribute">text-align</span>:center}<span class="hljs-selector-class">.t_r</span>{<span class="hljs-attribute">text-align</span>:right}<span class="hljs-selector-class">.unLine</span>{<span class="hljs-attribute">text-decoration</span>:underline}<span class="hljs-selector-class">.fiexd</span>{<span class="hljs-attribute">position</span>:fixed}<span class="hljs-selector-class">.absolute</span>{<span class="hljs-attribute">position</span>:absolute}<span class="hljs-selector-class">.relative</span>{<span class="hljs-attribute">position</span>:relative}<span class="hljs-selector-class">.wrapper</span>{<span class="hljs-attribute">clear</span>:both;<span class="hljs-attribute">overflow</span>:hidden}<span class="hljs-selector-class">.o-hidden</span>{<span class="hljs-attribute">overflow</span>:hidden}<span class="hljs-selector-class">.hidden</span>{<span class="hljs-attribute">display</span>:none}<span class="hljs-selector-class">.block</span>{<span class="hljs-attribute">display</span>:block}<span class="hljs-selector-class">.lblock</span>{<span class="hljs-attribute">display</span>:inline-block}<span class="hljs-selector-class">.clear</span>{<span class="hljs-attribute">clear</span>:both}<span class="hljs-selector-class">.pointer</span>{<span class="hljs-attribute">cursor</span>:pointer}<span class="hljs-selector-tag">img</span>{<span class="hljs-attribute">border</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">vertical-align</span>:middle} 
</code></pre><p>html&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;div class=&quot;demo-nav&quot;&gt;
    &lt;!--.fllil,.clear&#x662F;&#x5728;&#x6837;&#x5F0F;&#x91CD;&#x7F6E;&#x8868;&#xFF08;reset.css&#xFF09;&#x4E0A;&#x5199;&#x597D;&#x7684;&#x6837;&#x5F0F;&#xFF0C;.fllil li{fload:left;}.clear{clear:both;}--&gt;
    &lt;ul class=&quot;menu fllil&quot;&gt;
        &lt;li&gt;HTML5
            &lt;ul class=&quot;sub-menu&quot;&gt;
                &lt;li&gt;article&lt;/li&gt;
                &lt;li&gt;section&lt;/li&gt;
                &lt;li&gt;menu&lt;/li&gt;
                &lt;li&gt;nav&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;CSS3
            &lt;ul class=&quot;sub-menu&quot;&gt;
                &lt;li&gt;&#x52A8;&#x753B;&lt;/li&gt;
                &lt;li&gt;&#x8FC7;&#x6E21;&lt;/li&gt;
                &lt;li&gt;&#x5706;&#x5F62;&lt;/li&gt;
                &lt;li&gt;&#x8FB9;&#x6846;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;Javascript
            &lt;ul class=&quot;sub-menu&quot;&gt;
                &lt;li&gt;&#x5B57;&#x7B26;&#x4E32;&lt;/li&gt;
                &lt;li&gt;&#x6570;&#x7EC4;&lt;/li&gt;
                &lt;li&gt;&#x5BF9;&#x8C61;&lt;/li&gt;
                &lt;li&gt;&#x5E03;&#x5C14;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;Jquery
            &lt;ul class=&quot;sub-menu&quot;&gt;
                &lt;li&gt;&#x52A8;&#x753B;&lt;/li&gt;
                &lt;li&gt;&#x7279;&#x6548;&lt;/li&gt;
                &lt;li&gt;AJAX&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;VUE&lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class=&quot;clear&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;demo-nav&quot;</span>&gt;
    <span class="xml"><span class="hljs-comment">&lt;!--.fllil,.clear&#x662F;&#x5728;&#x6837;&#x5F0F;&#x91CD;&#x7F6E;&#x8868;&#xFF08;reset.css&#xFF09;&#x4E0A;&#x5199;&#x597D;&#x7684;&#x6837;&#x5F0F;&#xFF0C;.fllil li{fload:left;}.clear{clear:both;}--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;menu fllil&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>HTML5
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sub-menu&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>article<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>section<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>menu<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>nav<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>CSS3
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sub-menu&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x52A8;&#x753B;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8FC7;&#x6E21;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x5706;&#x5F62;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8FB9;&#x6846;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Javascript
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sub-menu&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x5B57;&#x7B26;&#x4E32;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x6570;&#x7EC4;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x5BF9;&#x8C61;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x5E03;&#x5C14;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Jquery
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sub-menu&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x52A8;&#x753B;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x7279;&#x6548;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>AJAX<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>VUE<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clear&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</code></pre><p>css&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .demo-nav {
        width: 500px;
        margin: 0 auto;
    }

    .demo-nav li {
        line-height: 40px;
        padding: 0 10px;
        background: #09f;
        color: #fff;
        position: relative;
    }

    .demo-nav li ul {
        position: absolute;
        left: 0;
        top: 40px;
        height: 0;
        overflow: hidden;
    }

    .demo-nav li ul li {
        float: none;
        /*&#x8FC7;&#x6E21;&#x4EE3;&#x7801;*/
        transition: all .3s;
        background: #f90;
        opacity: 0;
    }
    /*&#x5947;&#x6570;&#x9879;&#x521D;&#x59CB;&#x5F80;&#x53F3;&#x8FB9;&#x504F;&#x79FB;100%*/
    .demo-nav li ul li:nth-of-type(1n) {
        transform: translate3d(100%, 0, 0);
    }
    /*&#x5076;&#x6570;&#x9879;&#x521D;&#x59CB;&#x5F80;&#x5DE6;&#x8FB9;&#x504F;&#x79FB;100%*/
    .demo-nav li ul li:nth-of-type(2n) {
        transform: translate3d(-100%, 0, 0);
    }

    .demo-nav li:hover ul {
        overflow: visible;
    }
    /*&#x900F;&#x660E;&#x5EA6;&#x548C;&#x4E92;&#x52A8;&#x540C;&#x65F6;&#x8FDB;&#x884C;*/
    .demo-nav li:hover ul li {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>    <span class="hljs-selector-class">.demo-nav</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    }

    <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">position</span>: relative;
    }

    <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
    }

    <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">float</span>: none;
        <span class="hljs-comment">/*&#x8FC7;&#x6E21;&#x4EE3;&#x7801;*/</span>
        <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f90</span>;
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-comment">/*&#x5947;&#x6570;&#x9879;&#x521D;&#x59CB;&#x5F80;&#x53F3;&#x8FB9;&#x504F;&#x79FB;100%*/</span>
    <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(1n)</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(100%, 0, 0);
    }
    <span class="hljs-comment">/*&#x5076;&#x6570;&#x9879;&#x521D;&#x59CB;&#x5F80;&#x5DE6;&#x8FB9;&#x504F;&#x79FB;100%*/</span>
    <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(2n)</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-100%, 0, 0);
    }

    <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">overflow</span>: visible;
    }
    <span class="hljs-comment">/*&#x900F;&#x660E;&#x5EA6;&#x548C;&#x4E92;&#x52A8;&#x540C;&#x65F6;&#x8FDB;&#x884C;*/</span>
    <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
    }
</code></pre><blockquote><strong>&#x6CE8;&#x610F;1&#xFF1A;</strong>&#x5728;&#x663E;&#x793A;&#x4E0B;&#x62C9;&#x5217;&#x8868;&#x7684;&#x64CD;&#x4F5C;&#x4E0A;&#xFF0C;&#x521A;&#x5F00;&#x59CB;&#x9690;&#x85CF;&#x5B50;&#x83DC;&#x5355;ul&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x4E0D;&#x80FD;&#x8FD9;&#x6837;&#x5199;<code>.demo-nav li ul{display:none;}</code>&#x3002;&#x8981;&#x8FD9;&#x6837;&#x5199;<code>.demo-nav li ul{height: 0;overflow:hidden;}</code>&#xFF0C;&#x9F20;&#x6807;&#x653E;&#x4E0A;&#x7236;&#x7EA7;li&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x663E;&#x793A;ul&#x4E0D;&#x80FD;&#x8FD9;&#x6837;&#x5199;<code>.demo-nav li:hover ul{display:block;}</code>&#xFF0C;&#x8981;&#x8FD9;&#x6837;&#x5199;&#xFF0C;<code>.demo-nav li:hover ul{overflow: visible;}</code>&#x56E0;&#x4E3A;&#x4E00;&#x5F00;&#x59CB;&#x5982;&#x679C;&#x5B50;&#x83DC;&#x5355;ul&#x662F;&#x9690;&#x85CF;&#x7684;&#xFF0C;&#x9F20;&#x6807;&#x653E;&#x5230;&#x7236;&#x7EA7;li&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B50;&#x83DC;&#x5355;ul&#x5C31;&#x663E;&#x793A;&#x51FA;&#x6765;&#xFF0C;&#x8FD9;&#x6837;&#x662F;&#x770B;&#x5230;&#x5B50;&#x83DC;&#x5355;ul&#x4E0B;&#x9762;li&#x7684;&#x52A8;&#x753B;&#x7684;&#x3002;</blockquote><p><span class="img-wrap"><img data-src="/img/bVRzuK?w=476&amp;h=210" src="https://static.alili.tech/img/bVRzuK?w=476&amp;h=210" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><blockquote><strong>&#x6CE8;&#x610F;2&#xFF1A;</strong>&#x5B50;&#x83DC;&#x5355;ul&#x8981;&#x7528;<code>.demo-nav li ul{height: 0;overflow:hidden;}</code>&#x9690;&#x85CF;&#xFF0C;&#x5728;&#x663E;&#x793A;&#x7684;&#x65F6;&#x5019;&#x518D;&#x8BBE;&#x7F6E;<code>.demo-nav li:hover ul{overflow: visible;}</code>&#x3002;&#x8FD9;&#x4E00;&#x6B65;&#x4E0D;&#x80FD;&#x7701;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x51FA;&#x95EE;&#x9898;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x52A0;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5B50;&#x83DC;&#x5355;ul&#xFF0C;&#x4EE5;&#x53CA;&#x5B50;&#x83DC;&#x5355;<code>ul</code>&#x4E0B;&#x9762;&#x7684;<code>li</code>&#x4E00;&#x76F4;&#x5728;&#x9875;&#x9762;&#x4E0A;&#xFF0C;&#x5982;&#x679C;&#x9F20;&#x6807;&#x79FB;&#x4E0A;&#x53BB;&#x5B50;&#x83DC;&#x5355;<code>ul</code>&#xFF0C;&#x4EE5;&#x53CA;&#x5B50;&#x83DC;&#x5355;<code>ul</code>&#x4E0B;&#x9762;&#x7684;<code>li</code>&#x3002;&#x90A3;&#x4E48;&#x5B9E;&#x9645;&#x4E0A;&#x4E5F;&#x4F1A;&#x89E6;&#x53D1;&#x7236;&#x7EA7;<code>li</code>&#x7684;<code>hover</code>&#x3002;</blockquote><p><span class="img-wrap"><img data-src="/img/bVRzxh?w=1207&amp;h=665" src="https://static.alili.tech/img/bVRzxh?w=1207&amp;h=665" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVRzxr?w=476&amp;h=210" src="https://static.alili.tech/img/bVRzxr?w=476&amp;h=210" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader7">3-3&#x4E0E;JS&#x5B9E;&#x73B0;&#x5BF9;&#x6BD4;</h3><p>&#x8FD9;&#x4E2A;&#x6548;&#x679C;js&#x4E5F;&#x662F;&#x80FD;&#x5B9E;&#x73B0;&#xFF0C;&#x5B9E;&#x73B0;&#x4E0A;&#x4E5F;&#x4E0D;&#x96BE;&#xFF0C;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x8C03;&#x7528;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x95EE;&#x9898;&#x3002;&#x4F46;&#x662F;&#x5199;&#x7684;&#x80AF;&#x5B9A;&#x6BD4;css3&#x591A;&#xFF0C;&#x903B;&#x8F91;&#x4E5F;&#x4F1A;&#x6BD4;css3&#x590D;&#x6742;&#x3002;<br>1.&#x9996;&#x5148;&#xFF0C;&#x7236;&#x7EA7;li&#x5FC5;&#x987B;&#x8981;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x9F20;&#x6807;&#x79FB;&#x51FA;&#x548C;&#x79FB;&#x5165;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E5F;&#x8981;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x8BB0;&#x5F55;&#x5B9A;&#x65F6;&#x5668;&#xFF08;&#x4E0D;&#x540C;&#x7684;&#x7236;&#x7EA7;li&#x4E0D;&#x80FD;&#x5171;&#x7528;&#x4E00;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x53D7;&#x5230;&#x5E72;&#x6270;&#xFF0C;&#x5FC5;&#x987B;&#x6BCF;&#x4E00;&#x4E2A;&#x7236;&#x7EA7;li&#x4E0B;&#x9762;&#x90FD;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x8BB0;&#x5F55;&#x5B9A;&#x65F6;&#x5668;&#xFF09;&#x3002;obj.timer=setInterval(function(){},100)<br>2.&#x7528;js&#x5B9E;&#x73B0;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4E5F;&#x662F;&#x64CD;&#x4F5C;class&#x6216;&#x8005;css&#x3002;&#x6240;&#x4EE5;&#x6027;&#x80FD;&#x4E0A;css3&#x662F;&#x6BD4;js&#x597D;&#xFF01;<br>3.&#x9488;&#x5BF9;&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#xFF0C;css3&#x4E5F;&#x6BD4;js&#x597D;&#x63A7;&#x5236;&#x3002;</p><h3 id="articleHeader8">3-4&#x5B8C;&#x6574;&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;ec-css&#x5BFC;&#x822A;&#x680F;&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;reset.css&quot;&gt;
    &lt;style&gt;
        .demo-nav {
            width: 500px;
            margin: 0 auto;
        }

        .demo-nav li {
            line-height: 40px;
            padding: 0 10px;
            background: #09f;
            color: #fff;
            position: relative;
        }

        .demo-nav li ul {
            position: absolute;
            left: 0;
            top: 40px;
            /*height: 0;*/
            /*overflow: hidden;*/
        }

        .demo-nav li ul li {
            float: none;
            transition: all .3s;
            background: #f90;
            opacity: 0;
        }

        .demo-nav li ul li:nth-of-type(1n) {
            transform: translate3d(100%, 0, 0);
        }

        .demo-nav li ul li:nth-of-type(2n) {
            transform: translate3d(-100%, 0, 0);
        }

        .demo-nav li:hover ul {
            /*overflow: visible;*/
        }

        .demo-nav li:hover ul li {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
        /*&#x6700;&#x591A;10&#x7EA7;&#xFF0C;&#x8D85;&#x8FC7;10&#x7EA7;&#x7684;&#xFF0C;&#x5F97;&#x5199;js*/
        .demo-nav li ul li:nth-of-type(2) {
            transition-delay: .1s;
        }

        .demo-nav li ul li:nth-of-type(3) {
            transition-delay: .2s;
        }

        .demo-nav li ul li:nth-of-type(4) {
            transition-delay: .3s;
        }
        .demo-nav li ul li:nth-of-type(5) {
            transition-delay: .4s;
        }

        .demo-nav li ul li:nth-of-type(6) {
            transition-delay: .5s;
        }

        .demo-nav li ul li:nth-of-type(7) {
            transition-delay: .6s;
        }
        .demo-nav li ul li:nth-of-type(8) {
            transition-delay: .7s;
        }

        .demo-nav li ul li:nth-of-type(9) {
            transition-delay: .8s;
        }

        .demo-nav li ul li:nth-of-type(10) {
            transition-delay: .9s;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;demo-nav&quot;&gt;
    &lt;ul class=&quot;menu fllil&quot;&gt;
        &lt;li&gt;HTML5
            &lt;ul class=&quot;sub-menu&quot;&gt;
                &lt;li&gt;article&lt;/li&gt;
                &lt;li&gt;section&lt;/li&gt;
                &lt;li&gt;menu&lt;/li&gt;
                &lt;li&gt;nav&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;CSS3
            &lt;ul class=&quot;sub-menu&quot;&gt;
                &lt;li&gt;&#x52A8;&#x753B;&lt;/li&gt;
                &lt;li&gt;&#x8FC7;&#x6E21;&lt;/li&gt;
                &lt;li&gt;&#x5706;&#x5F62;&lt;/li&gt;
                &lt;li&gt;&#x8FB9;&#x6846;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;Javascript
            &lt;ul class=&quot;sub-menu&quot;&gt;
                &lt;li&gt;&#x5B57;&#x7B26;&#x4E32;&lt;/li&gt;
                &lt;li&gt;&#x6570;&#x7EC4;&lt;/li&gt;
                &lt;li&gt;&#x5BF9;&#x8C61;&lt;/li&gt;
                &lt;li&gt;&#x5E03;&#x5C14;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;Jquery
            &lt;ul class=&quot;sub-menu&quot;&gt;
                &lt;li&gt;&#x52A8;&#x753B;&lt;/li&gt;
                &lt;li&gt;&#x7279;&#x6548;&lt;/li&gt;
                &lt;li&gt;AJAX&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;VUE&lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class=&quot;clear&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>ec-css&#x5BFC;&#x822A;&#x680F;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;reset.css&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.demo-nav</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">position</span>: relative;
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> {
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-comment">/*height: 0;*/</span>
            <span class="hljs-comment">/*overflow: hidden;*/</span>
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">float</span>: none;
            <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f90</span>;
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(1n)</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(100%, 0, 0);
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(2n)</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-100%, 0, 0);
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">ul</span> {
            <span class="hljs-comment">/*overflow: visible;*/</span>
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
        }
        <span class="hljs-comment">/*&#x6700;&#x591A;10&#x7EA7;&#xFF0C;&#x8D85;&#x8FC7;10&#x7EA7;&#x7684;&#xFF0C;&#x5F97;&#x5199;js*/</span>
        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(2)</span> {
            <span class="hljs-attribute">transition-delay</span>: .<span class="hljs-number">1s</span>;
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(3)</span> {
            <span class="hljs-attribute">transition-delay</span>: .<span class="hljs-number">2s</span>;
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(4)</span> {
            <span class="hljs-attribute">transition-delay</span>: .<span class="hljs-number">3s</span>;
        }
        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(5)</span> {
            <span class="hljs-attribute">transition-delay</span>: .<span class="hljs-number">4s</span>;
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(6)</span> {
            <span class="hljs-attribute">transition-delay</span>: .<span class="hljs-number">5s</span>;
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(7)</span> {
            <span class="hljs-attribute">transition-delay</span>: .<span class="hljs-number">6s</span>;
        }
        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(8)</span> {
            <span class="hljs-attribute">transition-delay</span>: .<span class="hljs-number">7s</span>;
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(9)</span> {
            <span class="hljs-attribute">transition-delay</span>: .<span class="hljs-number">8s</span>;
        }

        <span class="hljs-selector-class">.demo-nav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-of-type(10)</span> {
            <span class="hljs-attribute">transition-delay</span>: .<span class="hljs-number">9s</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo-nav&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;menu fllil&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>HTML5
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sub-menu&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>article<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>section<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>menu<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>nav<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>CSS3
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sub-menu&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x52A8;&#x753B;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8FC7;&#x6E21;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x5706;&#x5F62;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8FB9;&#x6846;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Javascript
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sub-menu&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x5B57;&#x7B26;&#x4E32;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x6570;&#x7EC4;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x5BF9;&#x8C61;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x5E03;&#x5C14;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Jquery
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sub-menu&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x52A8;&#x753B;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x7279;&#x6548;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>AJAX<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>VUE<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clear&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><h2 id="articleHeader9">4.&#x8FC7;&#x6E21;&#x6848;&#x4F8B;-&#x624B;&#x98CE;&#x7434;</h2><p><span class="img-wrap"><img data-src="/img/bVRze0?w=597&amp;h=729" src="https://static.alili.tech/img/bVRze0?w=597&amp;h=729" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader10">4-1&#x539F;&#x7406;&#x5206;&#x6790;</h3><p>&#x8FD9;&#x4E2A;&#x770B;&#x7740;&#x5C31;&#x4E0D;&#x96BE;&#xFF0C;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;ul-li&#xFF0C;&#x9F20;&#x6807;&#x79FB;&#x5165;li&#xFF0C;li&#x4E0B;&#x9762;&#x7684;&#x6807;&#x9898;&#x989C;&#x8272;&#xFF0C;&#x80CC;&#x666F;&#x8272;&#xFF0C;&#x7BAD;&#x5934;&#x6539;&#x53D8;&#xFF0C;li&#x4E0B;&#x9762;&#x7684;div&#x7684;&#x9AD8;&#x5EA6;&#x6539;&#x53D8;&#xFF01;</p><h3 id="articleHeader11">4-2&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;</h3><p>1.&#x9996;&#x5148;&#xFF0C;&#x6392;&#x7248;ul-li&#xFF0C;li&#x4E0B;&#x9762;&#x53C8;&#x6709;&#x4E00;&#x4E2A;&#x6807;&#x9898;&#xFF08;&#x8FD9;&#x4E2A;&#x7528;h3&#xFF09;,&#x548C;&#x5185;&#x5BB9;&#xFF08;div&#xFF09;</p><p>html&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;demo-slide-tab&quot;&gt;
    &lt;ul&gt;
        &lt;li&gt;
            &lt;h3&gt;title 1&lt;/h3&gt;
            &lt;div&gt;content1&lt;/div&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;h3&gt;title 2&lt;/h3&gt;
            &lt;div&gt;content2conte nt2content2content2content2conten t2content2content2content2content2conte nt2content2content2content2conte nt2content2content2content2 content2content2content 2content2content2content2content2conten t2content2c ontent2content2content2&lt;/div&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;h3&gt;title 3&lt;/h3&gt;
            &lt;div&gt;content3&lt;/div&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;h3&gt;title 4&lt;/h3&gt;
            &lt;div&gt;content4.&lt;/div&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo-slide-tab&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>title 1<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>content1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>title 2<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>content2conte nt2content2content2content2conten t2content2content2content2content2conte nt2content2content2content2conte nt2content2content2content2 content2content2content 2content2content2content2content2conten t2content2c ontent2content2content2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>title 3<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>content3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>title 4<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>content4.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p>css&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;style&gt;
    .demo-slide-tab {
        width: 500px;
        margin: 0 auto;
    }

    .demo-slide-tab ul {
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .demo-slide-tab li {
        list-style: none outside none;
        display: block;
        margin: 0;
        padding: 0;
        height: 40px;
        width: 100%;
        overflow: hidden;
        background: #f0f0f0;
        transition: height 0.3s ease-in-out;
    }

    .demo-slide-tab h3 {
        margin: 0;
        padding: 10px;
        height: 19px;
        border-top: 1px solid #f0f0f0;
        color: #000;
        background: #ccc;
        background: linear-gradient(#0099ff, #71d1fd);
        custor: pointer;
        position: relative;
    }

    .demo-slide-tab h3:before {
        content: &quot;&quot;;
        border-width: 5px;
        border-color: transparent transparent transparent #000;
        position: absolute;
        right: 10px;
        top: 15px;
        width: 0;
        height: 0;
    }

    .demo-slide-tab div {
        margin: 0;
        voerflow: auto;
        padding: 10px;
        max-height: 220px;
    }
    //&#x9F20;&#x6807;&#x79FB;&#x5165;li&#xFF0C;&#x9AD8;&#x5EA6;&#x6539;&#x53D8;
    .demo-slide-tab li:hover {
        height: 280px;
    }
    //&#x9F20;&#x6807;&#x79FB;&#x5165;li&#xFF0C;h3&#x80CC;&#x666F;&#x989C;&#x8272;&#x548C;&#x5B57;&#x4F53;&#x989C;&#x8272;&#x6539;&#x53D8;
    .demo-slide-tab li:hover h3 {
        color: #fff;
        background: #000;
        background: linear-gradient(#faa305, #fcc054);
    }
    //&#x9F20;&#x6807;&#x79FB;&#x5165;li&#xFF0C;&#x7BAD;&#x5934;&#x65B9;&#x5411;&#x6539;&#x53D8;
    .demo-slide-tab li:hover h3:before{
        border-color: transparent transparent transparent #fff;
        transform: rotate(90deg);
    }
&lt;/style&gt;    
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>
&lt;<span class="hljs-built_in">style</span>&gt;
    .<span class="hljs-built_in">demo</span>-slide-<span class="hljs-built_in">tab</span> {
        <span class="hljs-built_in">width</span>: 500px;
        margin: <span class="hljs-number">0</span> auto;
    }

    .<span class="hljs-built_in">demo</span>-slide-<span class="hljs-built_in">tab</span> ul {
        <span class="hljs-built_in">width</span>: <span class="hljs-number">100</span><span class="hljs-symbol">%</span>;
        margin: <span class="hljs-number">0</span>;
        padding: <span class="hljs-number">0</span>;
    }

    .<span class="hljs-built_in">demo</span>-slide-<span class="hljs-built_in">tab</span> <span class="hljs-built_in">li</span> {
        list-<span class="hljs-built_in">style</span>: none outside none;
        <span class="hljs-built_in">display</span>: <span class="hljs-built_in">block</span>;
        margin: <span class="hljs-number">0</span>;
        padding: <span class="hljs-number">0</span>;
        <span class="hljs-built_in">height</span>: 40px;
        <span class="hljs-built_in">width</span>: <span class="hljs-number">100</span><span class="hljs-symbol">%</span>;
        overflow: hidden;
        <span class="hljs-built_in">background</span>: #f0f0f0;
        transition: <span class="hljs-built_in">height</span> <span class="hljs-number">0.</span>3s ease-<span class="hljs-keyword">in</span>-out;
    }

    .<span class="hljs-built_in">demo</span>-slide-<span class="hljs-built_in">tab</span> h3 {
        margin: <span class="hljs-number">0</span>;
        padding: 10px;
        <span class="hljs-built_in">height</span>: 19px;
        <span class="hljs-built_in">border</span>-top: 1px solid #f0f0f0;
        <span class="hljs-built_in">color</span>: #<span class="hljs-number">000</span>;
        <span class="hljs-built_in">background</span>: #ccc;
        <span class="hljs-built_in">background</span>: <span class="hljs-built_in">linear</span>-gradient(#<span class="hljs-number">0099ff</span>, #71d1fd);
        custor: pointer;
        <span class="hljs-built_in">position</span>: relative;
    }

    .<span class="hljs-built_in">demo</span>-slide-<span class="hljs-built_in">tab</span> h3:before {
        <span class="hljs-built_in">content</span>: <span class="hljs-string">&quot;&quot;</span>;
        <span class="hljs-built_in">border</span>-<span class="hljs-built_in">width</span>: 5px;
        <span class="hljs-built_in">border</span>-<span class="hljs-built_in">color</span>: <span class="hljs-built_in">transparent</span> <span class="hljs-built_in">transparent</span> <span class="hljs-built_in">transparent</span> #<span class="hljs-number">000</span>;
        <span class="hljs-built_in">position</span>: absolute;
        right: 10px;
        top: 15px;
        <span class="hljs-built_in">width</span>: <span class="hljs-number">0</span>;
        <span class="hljs-built_in">height</span>: <span class="hljs-number">0</span>;
    }

    .<span class="hljs-built_in">demo</span>-slide-<span class="hljs-built_in">tab</span> div {
        margin: <span class="hljs-number">0</span>;
        voerflow: auto;
        padding: 10px;
        <span class="hljs-built_in">max</span>-<span class="hljs-built_in">height</span>: 220px;
    }
    //&#x9F20;&#x6807;&#x79FB;&#x5165;<span class="hljs-built_in">li</span>&#xFF0C;&#x9AD8;&#x5EA6;&#x6539;&#x53D8;
    .<span class="hljs-built_in">demo</span>-slide-<span class="hljs-built_in">tab</span> <span class="hljs-built_in">li</span>:hover {
        <span class="hljs-built_in">height</span>: 280px;
    }
    //&#x9F20;&#x6807;&#x79FB;&#x5165;<span class="hljs-built_in">li</span>&#xFF0C;h3&#x80CC;&#x666F;&#x989C;&#x8272;&#x548C;&#x5B57;&#x4F53;&#x989C;&#x8272;&#x6539;&#x53D8;
    .<span class="hljs-built_in">demo</span>-slide-<span class="hljs-built_in">tab</span> <span class="hljs-built_in">li</span>:hover h3 {
        <span class="hljs-built_in">color</span>: #fff;
        <span class="hljs-built_in">background</span>: #<span class="hljs-number">000</span>;
        <span class="hljs-built_in">background</span>: <span class="hljs-built_in">linear</span>-gradient(#faa305, #fcc054);
    }
    //&#x9F20;&#x6807;&#x79FB;&#x5165;<span class="hljs-built_in">li</span>&#xFF0C;&#x7BAD;&#x5934;&#x65B9;&#x5411;&#x6539;&#x53D8;
    .<span class="hljs-built_in">demo</span>-slide-<span class="hljs-built_in">tab</span> <span class="hljs-built_in">li</span>:hover h3:before{
        <span class="hljs-built_in">border</span>-<span class="hljs-built_in">color</span>: <span class="hljs-built_in">transparent</span> <span class="hljs-built_in">transparent</span> <span class="hljs-built_in">transparent</span> #fff;
        <span class="hljs-built_in">transform</span>: rotate(90deg);
    }
&lt;/<span class="hljs-built_in">style</span>&gt;    
</code></pre><p>&#x7531;&#x4E8E;&#x8FD9;&#x6817;&#x5B50;&#xFF0C;li&#x91CC;&#x9762;&#x7684;div&#x5728;&#x6837;&#x5F0F;&#x4E0A;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E86;padding&#x3002;&#x6240;&#x4EE5;&#x5EFA;&#x8BAE;&#x6211;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x6539;&#x53D8;<code>li</code>&#x8BBE;&#x7F6E;<code>overflow: hidden;height:40px;/*&#x9AD8;&#x5EA6;&#x7B49;&#x4E8E;&#x6807;&#x9898;&#x7684;&#x9AD8;&#x5EA6;&#xFF0C;&#x521D;&#x59CB;&#x5C31;&#x662F;&#x9690;&#x85CF;div*/</code>&#x3002;&#x56E0;&#x4E3A;&#x5982;&#x679C;&#x9F20;&#x6807;&#x79FB;&#x5165;li&#xFF0C;&#x662F;&#x64CD;&#x4F5C;div&#x7684;&#x8BDD;&#x3002;<br>&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x95EE;&#x9898;&#xFF01;&#x5982;&#x4E0B;&#x6817;&#x5B50;&#xFF01;</p><p>&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x6539;&#x6210;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".demo-slide-tab li {
    display: block;
    margin: 0;
    padding: 0;
    width: 100%;
    background: #f0f0f0;
}
.demo-slide-tab div {
    margin: 0;
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease-in-out;
}
.demo-slide-tab li:hover div {
    padding: 10px;
    height: 220px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.demo-slide-tab</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#f0f0f0</span>;
}
<span class="hljs-selector-class">.demo-slide-tab</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">transition</span>: height <span class="hljs-number">0.3s</span> ease-in-out;
}
<span class="hljs-selector-class">.demo-slide-tab</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">220px</span>;
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVRzA9?w=629&amp;h=383" src="https://static.alili.tech/img/bVRzA9?w=629&amp;h=383" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVRzBe?w=758&amp;h=454" src="https://static.alili.tech/img/bVRzBe?w=758&amp;h=454" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br>&#x5927;&#x5BB6;&#x770B;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x9F20;&#x6807;&#x79FB;&#x51FA;&#x7684;&#x90A3;&#x4E00;&#x77AC;&#x95F4;&#xFF0C;&#x770B;&#x5230;div&#x91CC;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x4E5F;&#x8D34;&#x8FB9;&#x4E86;&#xFF01;&#x6211;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x907F;&#x514D;&#x8FD9;&#x4E2A;&#xFF0C;&#x624D;&#x901A;&#x8FC7;&#x64CD;&#x4F5C;<code>li</code>&#x7684;&#x9AD8;&#x5EA6;&#x6765;&#x63A7;&#x5236;<code>div</code>&#x7684;&#x9AD8;&#x5EA6;&#xFF01;</p><h3 id="articleHeader12">4-3&#x4E0E;JS&#x5B9E;&#x73B0;&#x5BF9;&#x6BD4;</h3><p>1.&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#xFF0C;&#x6211;&#x611F;&#x89C9;&#x867D;&#x7136;&#x6027;&#x80FD;&#x4E0A;css3&#x662F;&#x6BD4;js&#x8981;&#x597D;&#x4E00;&#x4E9B;&#x3002;&#x6BD5;&#x7ADF;js&#x4E5F;&#x662F;&#x63A7;&#x5236;css&#x6216;&#x8005;class&#x6765;&#x5B9E;&#x73B0;&#xFF01;<br>2.&#x7075;&#x6D3B;&#x6027;&#x7684;&#x8BDD;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C31;&#x8981;&#x6BD4;js&#x5DEE;&#x4E86;&#xFF0C;&#x6BD4;&#x5982;div&#x7684;&#x663E;&#x793A;&#x4E0E;&#x9690;&#x85CF;&#xFF0C;&#x6211;&#x4E0D;&#x60F3;&#x901A;&#x8FC7;&#x9F20;&#x6807;&#x79FB;&#x5165;&#x79FB;&#x51FA;&#x7684;&#x65B9;&#x5F0F;&#x63A7;&#x5236;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x60F3;&#x901A;&#x8FC7;&#x70B9;&#x51FB;&#x7684;&#x65B9;&#x5F0F;&#x63A7;&#x5236;div&#x7684;&#x663E;&#x793A;&#x4E0E;&#x9690;&#x85CF;&#x5462;&#x3002;&#x5BF9;&#x4E8E;js&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x8BF4;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x5BF9;&#x4E8E;&#x63D2;&#x4EF6;&#x6765;&#x8BF4;&#xFF0C;&#x53EF;&#x80FD;&#x5C31;&#x6539;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#x5C31;&#x884C;&#x4E86;&#xFF01;&#x5BF9;&#x4E8E;css3&#x5B9E;&#x73B0;&#x7684;&#x8BDD;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C31;&#x4E0D;&#x4F46;&#x8981;&#x6539;css&#x6837;&#x5F0F;&#x4E86;&#xFF0C;&#x4E5F;&#x8981;&#x6539;html&#x7ED3;&#x6784;&#x4E86;&#xFF01;<br>&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x7684;&#x5EFA;&#x8BAE;&#x5C31;&#x662F;&#xFF0C;&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#x6700;&#x7406;&#x60F3;&#x7684;&#x8FD8;&#x662F;&#x7528;js&#x548C;css3&#x7ED3;&#x679C;&#xFF0C;&#x7ED3;&#x679C;&#x662F;&#x6700;&#x597D;&#x7684;&#x3002;&#x5982;&#x679C;&#x9488;&#x5BF9;&#x7075;&#x6D3B;&#x6027;&#x4E0D;&#x9AD8;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x53EF;&#x4EE5;&#x53EA;&#x7528;css3&#x3002;</p><h3 id="articleHeader13">4-4&#x5B8C;&#x6574;&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
&lt;meta charset=&quot;UTF-8&quot;&gt;
&lt;title&gt;ec-css&#x624B;&#x98CE;&#x7434;&lt;/title&gt;
&lt;link rel=&quot;stylesheet&quot; href=&quot;reset.css&quot;&gt;
&lt;style&gt;
    .demo-slide-tab {
        width: 500px;
        margin: 0 auto;
    }

    .demo-slide-tab ul {
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .demo-slide-tab li {
        list-style: none outside none;
        display: block;
        margin: 0;
        padding: 0;
        height: 40px;
        width: 100%;
        overflow: hidden;
        background: #f0f0f0;
        transition: height 0.3s ease-in-out;
    }

    .demo-slide-tab h3 {
        margin: 0;
        padding: 10px;
        height: 19px;
        border-top: 1px solid #f0f0f0;
        color: #000;
        background: #ccc;
        background: linear-gradient(#0099ff, #71d1fd);
        custor: pointer;
        position: relative;
    }

    .demo-slide-tab h3:before {
        content: &quot;&quot;;
        border-width: 5px;
        border-color: transparent transparent transparent #000;
        position: absolute;
        right: 10px;
        top: 15px;
        width: 0;
        height: 0;
    }

    .demo-slide-tab div {
        margin: 0;
        voerflow: auto;
        padding: 10px;
        max-height: 220px;
    }

    .demo-slide-tab li:hover {
        height: 280px;
    }

    .demo-slide-tab li:hover h3 {
        color: #fff;
        background: #000;
        background: linear-gradient(#faa305, #fcc054);
    }

    .demo-slide-tab li:hover h3:before{
        border-color: transparent transparent transparent #fff;
        transform: rotate(90deg);
    }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;demo-slide-tab&quot;&gt;
    &lt;ul&gt;
        &lt;li&gt;
            &lt;h3&gt;title 1&lt;/h3&gt;
            &lt;div&gt;content1&lt;/div&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;h3&gt;title 2&lt;/h3&gt;
            &lt;div&gt;content2conte nt2content2content2content2conten t2content2content2content2content2conte nt2content2content2content2conte nt2content2content2content2 content2content2content 2content2content2content2content2conten t2content2c ontent2content2content2&lt;/div&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;h3&gt;title 3&lt;/h3&gt;
            &lt;div&gt;content3&lt;/div&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;h3&gt;title 4&lt;/h3&gt;
            &lt;div&gt;content4.&lt;/div&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>ec-css&#x624B;&#x98CE;&#x7434;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;reset.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.demo-slide-tab</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    }

    <span class="hljs-selector-class">.demo-slide-tab</span> <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.demo-slide-tab</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">list-style</span>: none outside none;
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f0f0f0</span>;
        <span class="hljs-attribute">transition</span>: height <span class="hljs-number">0.3s</span> ease-in-out;
    }

    <span class="hljs-selector-class">.demo-slide-tab</span> <span class="hljs-selector-tag">h3</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">19px</span>;
        <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#f0f0f0</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(#0099ff, #71d1fd);
        <span class="hljs-attribute">custor</span>: pointer;
        <span class="hljs-attribute">position</span>: relative;
    }

    <span class="hljs-selector-class">.demo-slide-tab</span> <span class="hljs-selector-tag">h3</span><span class="hljs-selector-pseudo">:before</span> {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
        <span class="hljs-attribute">border-width</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">border-color</span>: transparent transparent transparent <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.demo-slide-tab</span> <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">voerflow</span>: auto;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">max-height</span>: <span class="hljs-number">220px</span>;
    }

    <span class="hljs-selector-class">.demo-slide-tab</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">280px</span>;
    }

    <span class="hljs-selector-class">.demo-slide-tab</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">h3</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(#faa305, #fcc054);
    }

    <span class="hljs-selector-class">.demo-slide-tab</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">h3</span><span class="hljs-selector-pseudo">:before</span>{
        <span class="hljs-attribute">border-color</span>: transparent transparent transparent <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(90deg);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo-slide-tab&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>title 1<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>content1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>title 2<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>content2conte nt2content2content2content2conten t2content2content2content2content2conte nt2content2content2content2conte nt2content2content2content2 content2content2content 2content2content2content2content2conten t2content2c ontent2content2content2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>title 3<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>content3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>title 4<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>content4.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><h2 id="articleHeader14">5.&#x52A8;&#x753B;&#x6848;&#x4F8B;-&#x65E0;&#x7F1D;&#x6EDA;&#x52A8;</h2><p><span class="img-wrap"><img data-src="/img/bVRzfe?w=536&amp;h=240" src="https://static.alili.tech/img/bVRzfe?w=536&amp;h=240" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5982;&#x4E0A;&#x56FE;&#xFF0C;&#x65E0;&#x7F1D;&#x6EDA;&#x52A8;&#x4E5F;&#x79F0;&#x8DD1;&#x9A6C;&#x706F;&#xFF0C;&#x5C31;&#x662F;&#x4E00;&#x4E9B;&#x5185;&#x5BB9;&#xFF0C;&#x7136;&#x540E;&#x5411;&#x5DE6;&#x79FB;&#x52A8;&#x3002;&#x9F20;&#x6807;&#x653E;&#x4E0A;&#x53BB;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x52A8;&#x753B;&#x505C;&#x6B62;&#xFF01;&#x4EA4;&#x4E92;&#x5C31;&#x8FD9;&#x6837;&#xFF0C;&#x4E0B;&#x9762;&#x6765;&#x770B;&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;&#xFF01;</p><h3 id="articleHeader15">5-1&#x539F;&#x7406;&#x5206;&#x6790;</h3><p>1.&#x9996;&#x5148;&#xFF0C;&#x521D;&#x59CB;&#x72B6;&#x6001;&#x5C31;&#x662F;&#x5982;&#x4E0B;&#x56FE;&#xFF0C;&#x7136;&#x540E;&#x5411;&#x53F3;&#x6162;&#x6162;&#x79FB;&#x52A8;&#xFF08;&#x9ED1;&#x6846;&#x90E8;&#x5206;&#x4E3A;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/bVREfy?w=1017&amp;h=406" src="https://static.alili.tech/img/bVREfy?w=1017&amp;h=406" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>2.&#x4F46;&#x662F;&#x8FD9;&#x6837;&#xFF0C;&#x6EDA;&#x52A8;&#x5230;&#x6700;&#x540E;&#x4E00;&#x5F20;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4F1A;&#x51FA;&#x73B0;&#x95EE;&#x9898;&#xFF01;&#x5982;&#x4E0B;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/bVREfX?w=1115&amp;h=394" src="https://static.alili.tech/img/bVREfX?w=1115&amp;h=394" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>3.&#x6240;&#x4EE5;&#x6B63;&#x786E;&#x7684;&#x59FF;&#x52BF;&#x5E94;&#x8BE5;&#x662F;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x9700;&#x8981;&#x5BF9;&#x6EDA;&#x52A8;&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x590D;&#x5236;&#x4E00;&#x6B21;&#x4E86;&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/bVREf4?w=1544&amp;h=448" src="https://static.alili.tech/img/bVREf4?w=1544&amp;h=448" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>4.&#x4F46;&#x8FD8;&#x662F;&#x907F;&#x514D;&#x4E0D;&#x4E86;&#x7B2C;&#x4E8C;&#x6B65;&#x7684;&#x95EE;&#x9898;</p><p><span class="img-wrap"><img data-src="/img/bVREgf?w=1221&amp;h=346" src="https://static.alili.tech/img/bVREgf?w=1221&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>5.&#x8FD9;&#x91CC;&#x5C31;&#x9700;&#x8981;&#x505A;&#x4E00;&#x6B65;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x521A;&#x6EDA;&#x52A8;&#x5230;&#x4E0B;&#x8F6E;&#x7B2C;&#x4E00;&#x5F20;&#x7684;&#x65F6;&#x5019;&#x3002;&#x5982;&#x4E0B;&#x56FE;&#xFF08;&#x7528;&#x8FD9;&#x4E2A;&#x6848;&#x4F8B;&#x8BF4;&#xFF0C;&#x4E0D;&#x5305;&#x62EC;&#x590D;&#x5236;&#x51FA;&#x6765;&#x7684;4&#x4E2A;li&#xFF0C;&#x5C31;&#x603B;&#x5171;&#x6709;4&#x4E2A;&#xFF0C;&#x6BCF;&#x4E2A;200px&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x662F;&#x65B9;ul&#x6EDA;&#x52A8;&#x4E86;800px&#x7684;&#x65F6;&#x5019;&#xFF09;<br><span class="img-wrap"><img data-src="/img/bVRER1?w=1350&amp;h=393" src="https://static.alili.tech/img/bVRER1?w=1350&amp;h=393" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>6.&#x6EDA;&#x52A8;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x5C31;&#x77AC;&#x95F4;&#x62C9;&#x56DE;&#x6765;&#xFF0C;&#x56DE;&#x5230;&#x539F;&#x6765;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x518D;&#x8FDB;&#x884C;&#x6EDA;&#x52A8;&#x64CD;&#x4F5C;&#xFF08;&#x5F53;ul&#x6EDA;&#x52A8;&#x4E86;800px&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x77AC;&#x95F4;&#x62C9;&#x56DE;&#x539F;&#x6765;&#x4F4D;&#x7F6E;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x8FD8;&#x6CA1;&#x6709;&#x5F00;&#x59CB;&#x6EDA;&#x52A8;&#xFF09;<br><span class="img-wrap"><img data-src="/img/bVREkO?w=1565&amp;h=389" src="https://static.alili.tech/img/bVREkO?w=1565&amp;h=389" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader16">5-2&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;</h3><p>1.&#x9996;&#x5148;&#x5E03;&#x5C40;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x4E00;&#x4E2A;&#x9ED1;&#x6846;&#x5C31;&#x662F;&#x4E00;&#x4E2A;div,&#x6A59;&#x8272;&#x88C5;&#x7740;1234&#x7684;&#x5C31;&#x662F;ul-li&#x5E03;&#x5C40;&#xFF01;<br>&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x6CE8;&#x91CA;&#xFF0C;&#x518D;&#x7ED3;&#x5408;&#x4E0A;&#x9762;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x5927;&#x5BB6;&#x5C31;&#x5F88;&#x597D;&#x7406;&#x89E3;&#x4E86;&#xFF01;</p><p>html&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;div class=&quot;demo-marquee&quot;&gt;
    &lt;ul class=&quot;fllil&quot;&gt;
        &lt;li&gt;&lt;img src=&quot;image/1.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/2.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/3.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/4.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;!--&#x4E0B;&#x9762;&#x7684;&#x56DB;&#x4E2A;li&#x662F;&#x590D;&#x5236;&#x5185;&#x5BB9;--&gt;
        &lt;li&gt;&lt;img src=&quot;image/1.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/2.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/3.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/4.jpg&quot;/&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class=&quot;clear&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo-marquee&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fllil&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/1.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/2.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/3.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/4.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&#x4E0B;&#x9762;&#x7684;&#x56DB;&#x4E2A;li&#x662F;&#x590D;&#x5236;&#x5185;&#x5BB9;--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/1.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/2.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/3.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/4.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clear&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p>css&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;style&gt;
    .demo-marquee {
        width: 400px;
        margin: 20px auto;
        overflow: hidden;
    }

    .demo-marquee ul {
        /*&#x8FD9;&#x4E2A;&#x6848;&#x4F8B;ul&#x5BBD;&#x5EA6;&#x5E94;&#x8BE5;&#x4E3A;li&#x4E2A;&#x6570;*li&#x5BBD;&#x5EA6;*/
        width: 1600px;
        /*&#x6267;&#x884C;&#x52A8;&#x753B;*/
        animation: ec-marquee-move 6s infinite linear;
    }

    .demo-marquee ul:hover {
        /*&#x9F20;&#x6807;&#x653E;&#x4E0A;&#x53BB;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x52A8;&#x753B;&#x6682;&#x505C;*/
        animation-play-state: paused;
    }
    /*&#x5B9A;&#x4E49;&#x52A8;&#x753B;*/
    /*&#x5F53;&#x5411;&#x5DE6;&#x6EDA;&#x52A8;&#x4E86;800px&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x7ED3;&#x675F;&#xFF0C;&#x7136;&#x540E;&#x987A;&#x4FBF;&#x56DE;&#x5230;&#x8D77;&#x70B9;&#xFF0C;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B21;&#x7684;&#x52A8;&#x753B;*/
    @keyframes ec-marquee-move {
        0% {
            transform: translateX(0px);
        }
        100% {
            transform: translateX(-800px);
        }
    }
&lt;/style&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.demo-marquee</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
        <span class="hljs-attribute">overflow</span>: hidden;
    }

    <span class="hljs-selector-class">.demo-marquee</span> <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-comment">/*&#x8FD9;&#x4E2A;&#x6848;&#x4F8B;ul&#x5BBD;&#x5EA6;&#x5E94;&#x8BE5;&#x4E3A;li&#x4E2A;&#x6570;*li&#x5BBD;&#x5EA6;*/</span>
        <span class="hljs-attribute">width</span>: <span class="hljs-number">1600px</span>;
        <span class="hljs-comment">/*&#x6267;&#x884C;&#x52A8;&#x753B;*/</span>
        <span class="hljs-attribute">animation</span>: ec-marquee-move <span class="hljs-number">6s</span> infinite linear;
    }

    <span class="hljs-selector-class">.demo-marquee</span> <span class="hljs-selector-tag">ul</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-comment">/*&#x9F20;&#x6807;&#x653E;&#x4E0A;&#x53BB;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x52A8;&#x753B;&#x6682;&#x505C;*/</span>
        <span class="hljs-attribute">animation-play-state</span>: paused;
    }
    <span class="hljs-comment">/*&#x5B9A;&#x4E49;&#x52A8;&#x753B;*/</span>
    <span class="hljs-comment">/*&#x5F53;&#x5411;&#x5DE6;&#x6EDA;&#x52A8;&#x4E86;800px&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x7ED3;&#x675F;&#xFF0C;&#x7136;&#x540E;&#x987A;&#x4FBF;&#x56DE;&#x5230;&#x8D77;&#x70B9;&#xFF0C;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B21;&#x7684;&#x52A8;&#x753B;*/</span>
    @<span class="hljs-keyword">keyframes</span> ec-marquee-move {
        0% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0px);
        }
        100% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-800px);
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre><h3 id="articleHeader17">5-3&#x4E0E;JS&#x5B9E;&#x73B0;&#x5BF9;&#x6BD4;</h3><p>1.&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#xFF0C;&#x6027;&#x80FD;&#x4E0A;&#x5F53;&#x7136;&#x662F;css3&#x6BD4;&#x8F83;&#x597D;&#xFF0C;&#x800C;&#x7075;&#x6D3B;&#x6027;&#x4E0A;&#x4E5F;&#x80AF;&#x5B9A;&#x662F;&#x3002;&#x6BD4;&#x5982;&#x505A;&#x5230;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x56FE;&#x8FD9;&#x6837;&#x6548;&#x679C;&#x3002;&#x70B9;&#x51FB;&#x5DE6;&#x53F3;&#x7BAD;&#x5934;&#x5207;&#x6362;&#x65B9;&#x5411;&#xFF01;<br><span class="img-wrap"><img data-src="/img/bVREn8?w=707&amp;h=263" src="https://static.alili.tech/img/bVREn8?w=707&amp;h=263" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5C31;&#x662F;&#xFF0C;&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x6848;&#x4F8B;&#x4E2D;&#xFF0C;li&#x7684;&#x4E2A;&#x6570;&#x662F;&#x53D8;&#x5316;&#x7684;&#xFF0C;&#x90A3;&#x4E48;ul&#x7684;&#x5BBD;&#x5EA6;&#x4E5F;&#x662F;&#x8981;&#x7528;js&#x8BA1;&#x7B97;&#xFF0C;&#x4EE5;&#x53CA;ul&#x7684;&#x5185;&#x5BB9;&#x8981;&#x8FDB;&#x884C;&#x590D;&#x5236;&#x7684;&#x8BDD;&#xFF0C;&#x4EE5;&#x7A0B;&#x5E8F;&#x5458;&#x7684;&#x601D;&#x7EF4;&#xFF0C;&#x7406;&#x5E94;&#x4E5F;&#x662F;&#x7528;js&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x624B;&#x52A8;&#x590D;&#x5236;&#xFF01;</p><p>2.&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#xFF0C;&#x5EFA;&#x8BAE;&#x7684;&#x8FD8;&#x662F;&#x7528;js&#x548C;css3&#x7ED3;&#x5408;&#x4F7F;&#x7528;&#xFF0C;&#x8FD9;&#x6837;&#x7ED3;&#x679C;&#x6700;&#x597D;&#xFF0C;&#x6027;&#x80FD;&#x4E0A;&#x548C;&#x7075;&#x6D3B;&#x4E0A;&#x90FD;&#x5F97;&#x5230;&#x6298;&#x4E2D;&#xFF0C;&#x6027;&#x4EF7;&#x6BD4;&#x65E0;&#x7591;&#x662F;&#x6700;&#x597D;&#x7684;&#xFF01;</p><h3 id="articleHeader18">5-4&#x5B8C;&#x6574;&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;ec-css&#x65E0;&#x7F1D;&#x6EDA;&#x52A8;&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;reset.css&quot;&gt;
    &lt;style&gt;
        .demo-marquee {
            width: 400px;
            margin: 20px auto;
            overflow: hidden;
        }

        .demo-marquee ul {
            width: 1600px;
            animation: ec-marquee-move 6s infinite linear;
        }

        .demo-marquee ul:hover {
            animation-play-state: paused;
        }

        @keyframes ec-marquee-move {
            0% {
                transform: translateX(0px);
            }
            100% {
                transform: translateX(-800px);
            }
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;demo-marquee&quot;&gt;
    &lt;ul class=&quot;fllil&quot;&gt;
        &lt;li&gt;&lt;img src=&quot;image/1.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/2.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/3.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/4.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/1.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/2.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/3.jpg&quot;/&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;img src=&quot;image/4.jpg&quot;/&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class=&quot;clear&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>ec-css&#x65E0;&#x7F1D;&#x6EDA;&#x52A8;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;reset.css&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.demo-marquee</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
            <span class="hljs-attribute">overflow</span>: hidden;
        }

        <span class="hljs-selector-class">.demo-marquee</span> <span class="hljs-selector-tag">ul</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">1600px</span>;
            <span class="hljs-attribute">animation</span>: ec-marquee-move <span class="hljs-number">6s</span> infinite linear;
        }

        <span class="hljs-selector-class">.demo-marquee</span> <span class="hljs-selector-tag">ul</span><span class="hljs-selector-pseudo">:hover</span> {
            <span class="hljs-attribute">animation-play-state</span>: paused;
        }

        @<span class="hljs-keyword">keyframes</span> ec-marquee-move {
            0% {
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0px);
            }
            100% {
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-800px);
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo-marquee&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fllil&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/1.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/2.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/3.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/4.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/1.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/2.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/3.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;image/4.jpg&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clear&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><h2 id="articleHeader19">5.&#x603B;&#x7ED3;</h2><p>&#x5173;&#x4E8E;css3&#xFF0C;&#x6211;&#x7684;&#x5F00;&#x53D1;&#x5C0F;&#x539F;&#x5219;&#x5C31;&#x662F;&#x80FD;&#x7528;css3&#x89E3;&#x51B3;&#x7684;&#xFF0C;&#x6211;&#x4E0D;&#x4F1A;&#x5199;js&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x8981;&#x5199;js&#x7684;&#xFF0C;&#x6211;&#x4E5F;&#x4E0D;&#x4F1A;&#x541D;&#x556C;&#x5230;&#x4E0D;&#x5199;js&#xFF0C;&#x53EA;&#x7528;css3&#x5199;&#x51FA;&#x9000;&#x800C;&#x6C42;&#x4E4B;&#x7684;&#x6548;&#x679C;&#xFF01;css3&#x8DDF;js&#x642D;&#x914D;&#xFF0C;&#x80FD;&#x505A;&#x51FA;&#x5F88;&#x591A;&#x610F;&#x60F3;&#x4E0D;&#x5230;&#x7684;&#x9707;&#x64BC;&#x6548;&#x679C;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C31;&#x5F97;&#x770B;&#x5927;&#x5BB6;&#x8111;&#x6D1E;&#x6709;&#x591A;&#x5927;&#x4E86;&#xFF01;<br>&#x597D;&#x4E86;&#xFF0C;&#x4ECA;&#x5929;&#x901A;&#x8FC7;&#x4E09;&#x4E2A;&#x6848;&#x4F8B;&#x5E26;&#x5927;&#x5BB6;&#x521D;&#x6B65;&#x8BA4;&#x8BC6;&#x4E86;css3&#x7684;&#x8FC7;&#x6E21;&#x548C;&#x52A8;&#x753B;&#x3002;&#x5E0C;&#x671B;&#x80FD;&#x7ED9;&#x5927;&#x5BB6;&#x8D77;&#x4E00;&#x4E2A;&#x70ED;&#x8EAB;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x6216;&#x8005;&#x662F;&#x5927;&#x5BB6;&#x770B;&#x4E86;&#x8FD9;&#x4E09;&#x4E2A;&#x6848;&#x4F8B;&#xFF0C;&#x77E5;&#x9053;&#x600E;&#x4E48;&#x53BB;&#x5F00;&#x53D1;&#x5176;&#x5B83;&#x7684;&#x6848;&#x4F8B;&#xFF0C;&#x53D1;&#x6563;&#x601D;&#x7EF4;&#xFF01;&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x53EA;&#x662F;css3&#x8FC7;&#x6E21;&#x548C;&#x52A8;&#x753B;&#x7684;&#x51B0;&#x5C71;&#x4E00;&#x89D2;&#x800C;&#x5DF2;&#xFF0C;css3&#x5C31;&#x7B97;&#x6CA1;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x5C31;&#x8BF4;&#x8FC7;&#x6E21;&#x548C;&#x52A8;&#x753B;&#xFF0C;&#x9B45;&#x529B;&#x5C31;&#x8DB3;&#x591F;&#x5927;&#xFF0C;&#x5927;&#x5BB6;&#x4E5F;&#x53EF;&#x4EE5;&#x5230;&#x7F51;&#x4E0A;&#x641C;&#x4E0B;css3&#x7684;&#x6848;&#x4F8B;&#xFF01;&#x5C31;&#x77E5;&#x9053;css3&#x7684;&#x9B45;&#x529B;&#x4E86;&#xFF01;&#x5173;&#x4E8E;css3&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x4EE5;&#x540E;&#x6211;&#x4F1A;&#x7EE7;&#x7EED;&#x5199;&#x6587;&#x7AE0;&#x3002;<br>&#x6700;&#x540E;&#x8FD8;&#x662F;&#x90A3;&#x53E5;&#x8001;&#x8BDD;&#xFF0C;&#x5982;&#x679C;&#x89C9;&#x5F97;&#x6211;&#x54EA;&#x91CC;&#x5199;&#x5F97;&#x4E0D;&#x597D;&#xFF0C;&#x5199;&#x9519;&#x4E86;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x70B9;&#xFF01;&#x8BA9;&#x5927;&#x5BB6;&#x76F8;&#x4E92;&#x5B66;&#x4E60;&#xFF0C;&#x76F8;&#x4E92;&#x5E2E;&#x52A9;&#xFF01;</p><p>-------------------------&#x534E;&#x4E3D;&#x7684;&#x5206;&#x5272;&#x7EBF;--------------------<br>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#xFF0C;&#x5173;&#x6CE8;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x5B88;&#x5019;&#x4E66;&#x9601;</p><p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3热身实战--过渡与动画（实现炫酷下拉，手风琴，无缝滚动）

## 原文链接
[https://segmentfault.com/a/1190000010427231](https://segmentfault.com/a/1190000010427231)


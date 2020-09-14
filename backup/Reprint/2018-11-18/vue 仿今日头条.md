---
title: 'vue 仿今日头条' 
date: 2018-11-18 3:32:07
hidden: true
slug: cj4wbtiiehm
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">vue &#x4EFF;&#x4ECA;&#x65E5;&#x5934;&#x6761;</h1><p>&#x4E3A;&#x4E86;&#x589E;&#x52A0;&#x79FB;&#x52A8;&#x7AEF;&#x9879;&#x76EE;&#x7684;&#x7ECF;&#x9A8C;&#xFF0C;&#x8FD1;&#x4E00;&#x5468;&#x901A;&#x8FC7; vue &#x4EFF;&#x5199;&#x4ECA;&#x65E5;&#x5934;&#x6761;&#xFF0C;&#x4EE5;&#x4E0B;&#x5C31;&#x9879;&#x76EE;&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;&#x4E2D;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;&#x4EE5;&#x53CA;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x7ED9;&#x51FA;&#x603B;&#x7ED3;&#xFF0C;&#x6709;&#x4EC0;&#x4E48;&#x4E0D;&#x6B63;&#x786E;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6073;&#x8BF7;&#x5927;&#x5BB6;&#x6279;&#x8BC4;&#x6307;&#x6B63;^&#x2006;_&#x2006;^&#xFF01;&#xFF0C;&#x4EE3;&#x7801;&#x4ED3;&#x5E93;&#x5730;&#x5740;&#x4E3A; <a href="https://github.com/Msxiaoma/vue-news" rel="nofollow noreferrer" target="_blank">github</a></p><h2 id="articleHeader1">&#x4E00;&#x3001;&#x5B9E;&#x73B0;&#x529F;&#x80FD;</h2><ul><li>&#x9996;&#x9875;&#x5C55;&#x793A;</li><li>&#x67E5;&#x770B;&#x6D88;&#x606F;</li><li>&#x56FE;&#x6587;&#x61D2;&#x52A0;&#x8F7D;</li><li>&#x6ED1;&#x52A8;&#x9009;&#x9879;&#x5361;&#xFF0C;&#x5207;&#x6362;&#x9891;&#x9053;&#xFF0C;&#x70B9;&#x51FB;&#x9891;&#x9053;&#x5207;&#x6362;&#x4E0D;&#x540C;&#x65B0;&#x95FB;</li><li>&#x70B9;&#x51FB;&#x9009;&#x9879;&#x5361;&#x7684; + &#x6309;&#x94AE;&#xFF0C;&#x5B9E;&#x73B0;&#x9891;&#x9053;&#x7684;&#x6DFB;&#x52A0;&#x548C;&#x5220;&#x9664;</li><li>&#x70B9;&#x51FB;&#x641C;&#x7D22;&#x6309;&#x94AE;&#xFF0C;&#x8F93;&#x5165;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x56DE;&#x8F66;&#x8FDB;&#x884C;&#x5B9E;&#x65F6;&#x641C;&#x7D22;&#xFF0C;&#x5728;&#x7ED3;&#x679C;&#x4E2D;&#x9AD8;&#x4EAE;&#x663E;&#x793A;&#x5173;&#x952E;&#x5B57;</li><li>&#x70B9;&#x51FB;&#x5BFC;&#x822A;&#x680F;&#x7684;&#x5237;&#x65B0;&#x6309;&#x94AE;&#x53EA;&#x5B9E;&#x73B0;&#x4E86;&#x6309;&#x94AE;&#x7684;&#x65CB;&#x8F6C;&#x7279;&#x6548;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x5B9E;&#x73B0;&#x9875;&#x9762;&#x5237;&#x65B0;&#x52A0;&#x8F7D;&#x529F;&#x80FD;</li></ul><h2 id="articleHeader2">&#x4E8C;&#x3001;&#x529F;&#x80FD;&#x5C0F;&#x7ED3;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2.1 &#x9009;&#x9879;&#x5361;&#x5C01;&#x88C5;&#x4E3A;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x6ED1;&#x52A8;&#x9009;&#x9879;&#x5361;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code style="word-break:break-word;white-space:initial">2<span class="hljs-selector-class">.1</span> &#x9009;&#x9879;&#x5361;&#x5C01;&#x88C5;&#x4E3A;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x6ED1;&#x52A8;&#x9009;&#x9879;&#x5361;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNmZ?w=664&amp;h=164" src="https://static.alili.tech/img/bVbeNmZ?w=664&amp;h=164" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x4F7F;&#x7528;&#x5F39;&#x6027;&#x5E03;&#x5C40;&#xFF0C;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;ul class=&quot;silder-list&quot;&gt;
    &lt;li v-for=&quot;(item,index) in tabArr&quot;  @click=&quot;changeTab(index,item)&quot; :class=&quot;{&apos;current&apos;:  currentIndex === index}&quot; :key=&quot;item.id&quot;&gt;"{{"item.title"}}"&lt;/li&gt;
 &lt;/ul&gt;

&lt;style&gt;
.silder-list{
    width: 6.67rem;
    height: .72rem;
    padding: .1rem .1rem;
    box-sizing: border-box;
    overflow-x: scroll;
    list-style: none;
    display: -webkit-box;
}
.silder-list li{
    width: .68rem;
    height: .52rem;
    font-size: .34rem;
    padding: 0rem .24rem;
    color: #505050bf;
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;silder-list&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item,index) in tabArr&quot;</span>  @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;changeTab(index,item)&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;{&apos;current&apos;:  currentIndex === index}&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;item.id&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.silder-list</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6.67rem</span>;
    <span class="hljs-attribute">height</span>: .<span class="hljs-number">72rem</span>;
    <span class="hljs-attribute">padding</span>: .<span class="hljs-number">1rem</span> .<span class="hljs-number">1rem</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">overflow-x</span>: scroll;
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">display</span>: -webkit-box;
}
<span class="hljs-selector-class">.silder-list</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">width</span>: .<span class="hljs-number">68rem</span>;
    <span class="hljs-attribute">height</span>: .<span class="hljs-number">52rem</span>;
    <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">34rem</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0rem</span> .<span class="hljs-number">24rem</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#505050bf</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 2.2 &#x95EE;&#x9898;&#xFF1A;img &#x6A2A;&#x5411;&#x6392;&#x5217;&#x8BBE;&#x7F6E; display:inline-block&#x65F6;&#xFF0C;&#x6709;&#x9ED8;&#x8BA4;&#x7684;&#x95F4;&#x9699;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A; &#x7236;&#x5143;&#x7D20;&#x6DFB;&#x52A0; font-size&#xFF1A;0&#xFF1B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code> <span class="hljs-number">2.2</span> &#x95EE;&#x9898;&#xFF1A;<span class="hljs-selector-tag">img</span> &#x6A2A;&#x5411;&#x6392;&#x5217;&#x8BBE;&#x7F6E; <span class="hljs-attribute">display</span>:inline-block&#x65F6;&#xFF0C;&#x6709;&#x9ED8;&#x8BA4;&#x7684;&#x95F4;&#x9699;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A; &#x7236;&#x5143;&#x7D20;&#x6DFB;&#x52A0; <span class="hljs-attribute">font-size</span>&#xFF1A;<span class="hljs-number">0</span>&#xFF1B;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 2.3 &#x95EE;&#x9898;&#xFF1A;vue &#x5165;&#x53E3;&#x6587;&#x4EF6; main.js &#x5F15;&#x5165; vuex &#x7684; store &#x65F6;&#x4E0D;&#x8D77;&#x4F5C;&#x7528;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A; store &#x4E0D;&#x53EF;&#x4EE5;&#x5927;&#x5199;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code> 2<span class="hljs-selector-class">.3</span> &#x95EE;&#x9898;&#xFF1A;<span class="hljs-selector-tag">vue</span> &#x5165;&#x53E3;&#x6587;&#x4EF6; <span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.js</span> &#x5F15;&#x5165; <span class="hljs-selector-tag">vuex</span> &#x7684; <span class="hljs-selector-tag">store</span> &#x65F6;&#x4E0D;&#x8D77;&#x4F5C;&#x7528;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A; <span class="hljs-selector-tag">store</span> &#x4E0D;&#x53EF;&#x4EE5;&#x5927;&#x5199;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 2.4 &#x95EE;&#x9898;&#xFF1A;&#x79FB;&#x52A8;&#x7AEF;&#x901A;&#x8FC7;&#x63A7;&#x5236;&#x6839;&#x5143;&#x7D20;&#x7684; font-size &#x503C;&#x5B9E;&#x73B0;&#x8BBE;&#x5907;&#x7684;&#x9002;&#x914D;&#x65F6;&#xFF0C;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x59CB;&#x7EC8;&#x6709;&#x9ED8;&#x8BA4;&#x7684;&#x5BBD;&#x5EA6;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A; &#x6211;&#x7684;&#x7406;&#x89E3;&#x662F;&#x56E0;&#x4E3A;&#x6839;&#x5143;&#x7D20;&#x59CB;&#x7EC8;&#x6709; font-size &#x7684;&#x503C;&#xFF0C;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x7EE7;&#x627F;&#x4E86;font-size&#xFF0C;&#x6240;&#x4EE5;&#x7ED9;&#x5B83;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;font-size&#x5C31;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x5143;&#x7D20;&#x7684;&#x9AD8;&#x5EA6;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code> <span class="hljs-number">2.4</span> &#x95EE;&#x9898;&#xFF1A;&#x79FB;&#x52A8;&#x7AEF;&#x901A;&#x8FC7;&#x63A7;&#x5236;&#x6839;&#x5143;&#x7D20;&#x7684; <span class="hljs-built_in">font</span>-<span class="hljs-built_in">size</span> &#x503C;&#x5B9E;&#x73B0;&#x8BBE;&#x5907;&#x7684;&#x9002;&#x914D;&#x65F6;&#xFF0C;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x59CB;&#x7EC8;&#x6709;&#x9ED8;&#x8BA4;&#x7684;&#x5BBD;&#x5EA6;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A; &#x6211;&#x7684;&#x7406;&#x89E3;&#x662F;&#x56E0;&#x4E3A;&#x6839;&#x5143;&#x7D20;&#x59CB;&#x7EC8;&#x6709; <span class="hljs-built_in">font</span>-<span class="hljs-built_in">size</span> &#x7684;&#x503C;&#xFF0C;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x7EE7;&#x627F;&#x4E86;<span class="hljs-built_in">font</span>-<span class="hljs-built_in">size</span>&#xFF0C;&#x6240;&#x4EE5;&#x7ED9;&#x5B83;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;<span class="hljs-built_in">font</span>-<span class="hljs-built_in">size</span>&#x5C31;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x5143;&#x7D20;&#x7684;&#x9AD8;&#x5EA6;&#x3002;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 2.5 &#x95EE;&#x9898;&#xFF1A;&#x70B9;&#x51FB;&#x5143;&#x7D20;&#xFF0C;&#x8BE5;&#x5143;&#x7D20;360&#xB0;&#x65CB;&#x8F6C;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A; 
     &#x7C7B;rotate&#x5B9E;&#x73B0;&#x65CB;&#x8F6C;&#x52A8;&#x753B;
     &lt;img src=&quot;../assets/img/refresh.png&quot; class=&quot;rotate&quot;/&gt;
     
      .rotate {
          -webkit-transform-style: preserve-3d;
          -webkit-animation: x-spin 0.7s linear;
        }
        @-webkit-keyframes x-spin {
          0% {
            -webkit-transform: rotateZ(0deg);
          }
          50% {
            -webkit-transform: rotateZ(180deg);
          }
          100% {
            -webkit-transform: rotateZ(360deg);
          }
        }
     " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code> <span class="hljs-number">2.5</span> &#x95EE;&#x9898;&#xFF1A;&#x70B9;&#x51FB;&#x5143;&#x7D20;&#xFF0C;&#x8BE5;&#x5143;&#x7D20;<span class="hljs-number">360</span>&#xB0;&#x65CB;&#x8F6C;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A; 
     &#x7C7B;rotate&#x5B9E;&#x73B0;&#x65CB;&#x8F6C;&#x52A8;&#x753B;
     &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">&quot;../assets/img/refresh.png&quot;</span> class=<span class="hljs-string">&quot;rotate&quot;</span>/&gt;
     
      <span class="hljs-selector-class">.rotate</span> {
          -webkit-<span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
          -webkit-<span class="hljs-attribute">animation</span>: x-spin <span class="hljs-number">0.7s</span> linear;
        }
        @-webkit-keyframes x-spin {
          <span class="hljs-number">0%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: rotateZ(<span class="hljs-number">0deg</span>);
          }
          <span class="hljs-number">50%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: rotateZ(<span class="hljs-number">180deg</span>);
          }
          <span class="hljs-number">100%</span> {
            -webkit-<span class="hljs-attribute">transform</span>: rotateZ(<span class="hljs-number">360deg</span>);
          }
        }
     </code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 2.7 &#x95EE;&#x9898;&#xFF1A;&#x7EC4;&#x4EF6;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF08;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x89C1;&#x53C2;&#x8003;&#x6587;&#x732E;&#xFF09;
         &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A; 
           {
                path: &apos;/promisedemo&apos;,
                name: &apos;PromiseDemo&apos;,
                component: resolve =&gt; require([&apos;../components/PromiseDemo&apos;], resolve)
            }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code> 2<span class="hljs-selector-class">.7</span> &#x95EE;&#x9898;&#xFF1A;&#x7EC4;&#x4EF6;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF08;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x89C1;&#x53C2;&#x8003;&#x6587;&#x732E;&#xFF09;
         &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A; 
           {
                <span class="hljs-attribute">path</span>: <span class="hljs-string">&apos;/promisedemo&apos;</span>,
                name: <span class="hljs-string">&apos;PromiseDemo&apos;</span>,
                component: resolve =&gt; <span class="hljs-built_in">require</span>([<span class="hljs-string">&apos;../components/PromiseDemo&apos;</span>], resolve)
            }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 2.8 &#x95EE;&#x9898;&#xFF1A;&#x57FA;&#x4E8E; vue &#x7684;&#x5B9E;&#x65F6;&#x641C;&#x7D22;&#xFF0C;&#x5728;&#x7ED3;&#x679C;&#x4E2D;&#x9AD8;&#x4EAE;&#x663E;&#x793A;&#x5173;&#x952E;&#x5B57;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;
     &#x4E07;&#x80FD;&#x7684;```replace```&#x51FD;&#x6570;, searchKey &#x4E3A;&#x5173;&#x952E;&#x5B57;
     title = title.replace(this.searchKey, `&lt;span style=\&quot;color: red;font-weight: 500;\&quot;&gt;${this.searchKey}&lt;/span&gt;`)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autohotkey"><code> <span class="hljs-number">2.8</span> &#x95EE;&#x9898;&#xFF1A;&#x57FA;&#x4E8E; vue &#x7684;&#x5B9E;&#x65F6;&#x641C;&#x7D22;&#xFF0C;&#x5728;&#x7ED3;&#x679C;&#x4E2D;&#x9AD8;&#x4EAE;&#x663E;&#x793A;&#x5173;&#x952E;&#x5B57;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;
     &#x4E07;&#x80FD;&#x7684;```replace```&#x51FD;&#x6570;, searchKey &#x4E3A;&#x5173;&#x952E;&#x5B57;
     title = title.replace(this.searchKey, `&lt;span style=\<span class="hljs-string">&quot;color: red;font-weight: 500;\&quot;</span>&gt;${this.searchKey}&lt;/span&gt;`)</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 2.8 &#x95EE;&#x9898;&#xFF1A;&#x57FA;&#x4E8E; vue &#x7684;&#x5B9E;&#x65F6;&#x641C;&#x7D22;&#xFF0C;&#x5728;&#x7ED3;&#x679C;&#x4E2D;&#x9AD8;&#x4EAE;&#x663E;&#x793A;&#x5173;&#x952E;&#x5B57;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;
     &#x4E07;&#x80FD;&#x7684;```replace```&#x51FD;&#x6570;, searchKey &#x4E3A;&#x5173;&#x952E;&#x5B57;
     title = title.replace(this.searchKey, `&lt;span style=\&quot;color: red;font-weight: 500;\&quot;&gt;${this.searchKey}&lt;/span&gt;`)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autohotkey"><code> <span class="hljs-number">2.8</span> &#x95EE;&#x9898;&#xFF1A;&#x57FA;&#x4E8E; vue &#x7684;&#x5B9E;&#x65F6;&#x641C;&#x7D22;&#xFF0C;&#x5728;&#x7ED3;&#x679C;&#x4E2D;&#x9AD8;&#x4EAE;&#x663E;&#x793A;&#x5173;&#x952E;&#x5B57;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;
     &#x4E07;&#x80FD;&#x7684;```replace```&#x51FD;&#x6570;, searchKey &#x4E3A;&#x5173;&#x952E;&#x5B57;
     title = title.replace(this.searchKey, `&lt;span style=\<span class="hljs-string">&quot;color: red;font-weight: 500;\&quot;</span>&gt;${this.searchKey}&lt;/span&gt;`)</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 2.9 &#x95EE;&#x9898;&#xFF1A;&#x89E3;&#x51B3;&#x5B89;&#x5353;&#x5E73;&#x53F0;&#x4E0B;&#xFF0C;input&#x6807;&#x7B7E;&#x88AB;&#x906E;&#x6321;&#x95EE;&#x9898;&#xFF0C;&#x7528;&#x6237;&#x70B9;&#x51FB; input &#x65F6;&#xFF0C;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#x4E0A;&#x79FB;&#xFF0C;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x4E0D;&#x53D8;&#x3002;&#x5728; ios &#x4E0B;&#x6CA1;&#x6709;&#x8BE5;&#x95EE;&#x9898;&#x3002;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;
     css&#x90E8;&#x5206;&#xFF1A;
        body{
            width:100%;
            height:100%;
            overflow:scrool;
        } 
        .container{
            width: 100%;
            height: &#xFF08;&#x8FD9;&#x91CC;&#x968F;&#x610F;&#xFF0C;&#x9700;&#x8981;&#x7528;js&#x8BBE;&#x5B9A;&#xFF09;;
            position: absolute;
            top: 0;
        }    
        js&#x90E8;&#x5206;&#xFF1A;
        var winHeight = document.documentElement.clientHeight;
        $(&apos;.container&apos;).css(&apos;height&apos;,winHeight+&apos;px&apos;);
  2.10 &#x95EE;&#x9898;&#xFF1A; &#x61D2;&#x52A0;&#x8F7D;
       &#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF1A;&#x7A0D;&#x540E;&#x8865;&#x5145;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code> <span class="hljs-number">2</span>.<span class="hljs-number">9</span> &#x95EE;&#x9898;&#xFF1A;&#x89E3;&#x51B3;&#x5B89;&#x5353;&#x5E73;&#x53F0;&#x4E0B;&#xFF0C;input&#x6807;&#x7B7E;&#x88AB;&#x906E;&#x6321;&#x95EE;&#x9898;&#xFF0C;&#x7528;&#x6237;&#x70B9;&#x51FB; input &#x65F6;&#xFF0C;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#x4E0A;&#x79FB;&#xFF0C;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x4E0D;&#x53D8;&#x3002;&#x5728; ios &#x4E0B;&#x6CA1;&#x6709;&#x8BE5;&#x95EE;&#x9898;&#x3002;
     &#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;
     css&#x90E8;&#x5206;&#xFF1A;
        <span class="hljs-keyword">body{
</span><span class="hljs-symbol">            width:</span><span class="hljs-number">100</span>%<span class="hljs-comment">;</span>
<span class="hljs-symbol">            height:</span><span class="hljs-number">100</span>%<span class="hljs-comment">;</span>
<span class="hljs-symbol">            overflow:</span><span class="hljs-keyword">scrool;
</span>        } 
        .container{
<span class="hljs-symbol">            width:</span> <span class="hljs-number">100</span>%<span class="hljs-comment">;</span>
<span class="hljs-symbol">            height:</span> &#xFF08;&#x8FD9;&#x91CC;&#x968F;&#x610F;&#xFF0C;&#x9700;&#x8981;&#x7528;<span class="hljs-keyword">js&#x8BBE;&#x5B9A;&#xFF09;;
</span><span class="hljs-symbol">            position:</span> absolute<span class="hljs-comment">;</span>
<span class="hljs-symbol">            top:</span> <span class="hljs-number">0</span><span class="hljs-comment">;</span>
        }    
        <span class="hljs-keyword">js&#x90E8;&#x5206;&#xFF1A;
</span>        var winHeight = document.documentElement.clientHeight<span class="hljs-comment">;</span>
        $(<span class="hljs-string">&apos;.container&apos;</span>).css(<span class="hljs-string">&apos;height&apos;</span>,winHeight+<span class="hljs-string">&apos;px&apos;</span>)<span class="hljs-comment">;</span>
  <span class="hljs-number">2</span>.<span class="hljs-number">10</span> &#x95EE;&#x9898;&#xFF1A; &#x61D2;&#x52A0;&#x8F7D;
       &#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF1A;&#x7A0D;&#x540E;&#x8865;&#x5145;
</code></pre><h3 id="articleHeader3">&#x53C2;&#x8003;&#x6587;&#x732E;</h3><blockquote><a href="https://segmentfault.com/a/1190000011519350">https://segmentfault.com/a/11...</a> &#x7EC4;&#x4EF6;&#x6309;&#x9700;&#x52A0;&#x8F7D;<br><a href="https://router.vuejs.org/zh/guide/advanced/lazy-loading.html" rel="nofollow noreferrer" target="_blank">https://router.vuejs.org/zh/g...</a> &#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;<br><a href="https://segmentfault.com/a/1190000008376183">https://segmentfault.com/a/11...</a> &#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528; webpack &#x5C06;&#x591A;&#x4E2A;&#x7EC4;&#x4EF6;&#x5408;&#x5E76;&#x6253;&#x5305;&#x5E76;&#x5B9E;&#x73B0;&#x6309;&#x9700;&#x52A0;&#x8F7D;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 仿今日头条

## 原文链接
[https://segmentfault.com/a/1190000015881295](https://segmentfault.com/a/1190000015881295)


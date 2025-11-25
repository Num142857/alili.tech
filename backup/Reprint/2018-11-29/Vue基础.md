---
title: 'Vue基础' 
date: 2018-11-29 9:27:39
hidden: true
slug: sgal657u56i
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>&#x67E5;&#x770B;<a href="https://whjin.github.io/full-stack-development/" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x7AD9;&#x70B9;</a>&#xFF0C;&#x66F4;&#x591A;&#x6269;&#x5C55;&#x5185;&#x5BB9;&#x53CA;&#x66F4;&#x4F73;&#x9605;&#x8BFB;&#x4F53;&#x9A8C;&#xFF01;</blockquote>
<h1 id="articleHeader0">Vue&#x57FA;&#x7840;</h1>
<p>&#x6784;&#x9020;&#x51FD;&#x6570;Vue&#x7684;&#x6839;&#x5B9E;&#x4F8B;<code>new Vue({})</code>&#xFF0C;&#x5E76;&#x542F;&#x52A8;Vue&#x5E94;&#x7528;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = Vue({
    el: &quot;#app&quot;,
    data: {},
    methods: {}
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dts"><code>var app = Vue({
<span class="hljs-symbol">    el:</span> <span class="hljs-string">&quot;#app&quot;</span>,
<span class="hljs-symbol">    data:</span> {},
<span class="hljs-symbol">    methods:</span> {}
});
</code></pre>
<p>&#x53D8;&#x91CF;<code>app</code>&#x4EE3;&#x8868;&#x8FD9;&#x4E2A;Vue&#x5B9E;&#x4F8B;&#x3002;</p>
<p>&#x5176;&#x4E2D;&#xFF0C;&#x5FC5;&#x4E0D;&#x53EF;&#x5C11;&#x7684;&#x9009;&#x9879;&#x662F;<code>el</code>&#xFF0C;&#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x4E2D;&#x5DF2;&#x5B58;&#x5728;&#x7684;DOM&#x5143;&#x7D20;&#x6765;&#x6302;&#x8F7D;Vue&#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;<code>HTMLElement</code>&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;CSS&#x9009;&#x62E9;&#x5668;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = Vue({
    el: document.getElementById(&apos;app&apos;)
});
    " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> app = Vue({
    el: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;app&apos;</span>)
});
    </code></pre>
<p>&#x6302;&#x8F7D;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>app.$el</code>&#x8BBF;&#x95EE;&#x8BE5;&#x5143;&#x7D20;&#x3002;Vue&#x63D0;&#x4F9B;&#x4E86;&#x5F88;&#x591A;&#x5E38;&#x7528;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x90FD;&#x4EE5;<code>$</code>&#x5F00;&#x5934;&#x3002;</p>
<p><code>data</code>&#x9009;&#x9879;&#x7528;&#x4E8E;&#x58F0;&#x660E;&#x5E94;&#x7528;&#x5185;&#x9700;&#x8981;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x6570;&#x636E;&#x3002;&#x5EFA;&#x8BAE;&#x6240;&#x6709;&#x4F1A;&#x7528;&#x5230;&#x7684;&#x6570;&#x636E;&#x90FD;&#x9884;&#x5148;&#x5728;<code>data</code>&#x5185;&#x58F0;&#x660E;&#xFF0C;&#x63D0;&#x5347;&#x4E1A;&#x52A1;&#x7684;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x3002;</p>
<p>Vue&#x5B9E;&#x4F8B;<code>new Vue({})</code>&#xFF0C;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>app</code>&#x4EE3;&#x7406;&#x4E86;<code>data</code>&#x5BF9;&#x8C61;&#x91CC;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x8BBF;&#x95EE;<code>data</code>&#x4E2D;&#x7684;&#x6570;&#x636E;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(app.name);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>console.<span class="hljs-built_in">log</span>(app.<span class="hljs-built_in">name</span>);
</code></pre>
<p>&#x9664;&#x4E86;&#x663E;&#x5F0F;&#x5730;&#x58F0;&#x660E;&#x6570;&#x636E;&#x5916;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x5DF2;&#x6709;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x5E76;&#x4E14;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x9ED8;&#x8BA4;&#x5EFA;&#x7ACB;&#x4E86;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#xFF0C;&#x5F53;&#x4FEE;&#x6539;&#x5176;&#x4E2D;&#x4EFB;&#x610F;&#x4E00;&#x4E2A;&#x65F6;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x4E5F;&#x4F1A;&#x8DDF;&#x7740;&#x53D8;&#x5316;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myData = {
    a: 1
};

var app = Vue({
    el: &quot;#app&quot;,
    data: myData
});

app.a = 2;
console.log(myData.a);//2
myData.a = 3;
console.log(app.a);//3
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> myData = {
    a: 1
};

<span class="hljs-keyword">var</span> <span class="hljs-keyword">app</span> = Vue({
    el: <span class="hljs-string">&quot;#app&quot;</span>,
    data: myData
});

<span class="hljs-keyword">app</span>.a = 2;
console.<span class="hljs-built_in">log</span>(myData.a);<span class="hljs-comment">//2</span>
myData.a = 3;
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">app</span>.a);<span class="hljs-comment">//3</span>
</code></pre>
<h2 id="articleHeader1">&#x751F;&#x547D;&#x5468;&#x671F;</h2>
<p>Vue&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#xFF1A;</p>
<ul>
<li>
<code>created</code>&#xFF1A;&#x5B9E;&#x4F8B;&#x521B;&#x5EFA;&#x5B8C;&#x6210;&#x540E;&#x8C03;&#x7528;&#xFF0C;&#x6B64;&#x9636;&#x6BB5;&#x5B8C;&#x6210;&#x4E86;&#x6570;&#x636E;&#x7684;&#x89C2;&#x6D4B;&#x7B49;&#xFF0C;&#x4F46;&#x672A;&#x6302;&#x8F7D;&#xFF0C;<code>$el</code>&#x8FD8;&#x4E0D;&#x53EF;&#x7528;&#x3002;&#xFF08;&#x9700;&#x8981;&#x521D;&#x59CB;&#x5316;&#x5904;&#x7406;&#x4E00;&#x4E9B;&#x6570;&#x636E;&#x65F6;&#x4F1A;&#x6BD4;&#x8F83;&#x6709;&#x7528;&#xFF09;</li>
<li>
<code>mounted</code>&#xFF1A;<code>el</code>&#x6302;&#x8F7D;&#x5230;&#x5B9E;&#x4F8B;&#x4E0A;&#x540E;&#x8C03;&#x7528;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4F1A;&#x5728;&#x8FD9;&#x91CC;&#x5F00;&#x59CB;&#x3002;</li>
<li>
<code>beforeDestroy</code>&#xFF1A;&#x5B9E;&#x4F8B;&#x9500;&#x6BC1;&#x4E4B;&#x524D;&#x8C03;&#x7528;&#x3002;&#x4E3B;&#x8981;&#x89E3;&#x7ED1;&#x4E00;&#x4E9B;&#x4F7F;&#x7528;<code>addEventListener</code>&#x76D1;&#x542C;&#x7684;&#x4E8B;&#x4EF6;&#x7B49;&#x3002;</li>
</ul>
<p>&#x8FD9;&#x4E9B;&#x94A9;&#x5B50;&#x4E0E;<code>el</code>&#x548C;<code>data</code>&#x7C7B;&#x4F3C;&#xFF0C;&#x4E5F;&#x662F;&#x4F5C;&#x4E3A;&#x9009;&#x9879;&#x5199;&#x5165;Vue&#x5B9E;&#x4F8B;&#x4E2D;&#xFF0C;&#x5E76;&#x4E14;&#x94A9;&#x5B50;&#x7684;<code>this</code>&#x6307;&#x5411;&#x7684;&#x662F;&#x8C03;&#x7528;&#x5B83;&#x7684;Vue&#x5B9E;&#x4F8B;&#x3002;</p>
<h2 id="articleHeader2">&#x63D2;&#x503C;&#x4E0E;&#x8868;&#x8FBE;&#x5F0F;</h2>
<p>&#x4F7F;&#x7528;&#xFF08;Mustache&#x8BED;&#x6CD5;&#xFF09;<code>"{{""}}"</code>&#x662F;&#x6700;&#x57FA;&#x672C;&#x7684;&#x6587;&#x672C;&#x63D2;&#x503C;&#x65B9;&#x6CD5;&#xFF0C;&#x5B83;&#x4F1A;&#x81EA;&#x52A8;&#x5C06;&#x6211;&#x4EEC;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x6570;&#x636E;&#x5B9E;&#x65F6;&#x663E;&#x793A;&#x51FA;&#x6765;&#x3002;</p>
<p><code>v-html</code>&#x76F4;&#x63A5;&#x8F93;&#x51FA;HTML&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5C06;&#x6570;&#x636E;&#x89E3;&#x6790;&#x540E;&#x7684;&#x7EAF;&#x6587;&#x672C;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
&lt;span v-html=&quot;link&quot;&gt;&lt;/span&gt;
&lt;/div&gt;

new Vue({
    el: &quot;#app&quot;,
    data: {
        link: &apos;&lt;a href=&quot;#&quot;&gt;this is a link.&lt;/a&gt;&apos;
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">&quot;link&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

new Vue({
    el: &quot;#app&quot;,
    data: {
        link: &apos;<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>this is a link.<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>&apos;
    }
});
</code></pre>
<p>link&#x7684;&#x5185;&#x5BB9;&#x5C06;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x6210;&#x4E00;&#x4E2A;<code>a</code>&#x6807;&#x7B7E;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x7EAF;&#x6587;&#x672C;&#x3002;</p>
<p>&#x5982;&#x679C;&#x5C06;&#x7528;&#x6237;&#x4EA7;&#x751F;&#x7684;&#x5185;&#x5BB9;&#x4F7F;&#x7528;<code>v-html</code>&#x8F93;&#x51FA;&#x540E;&#xFF0C;&#x6709;&#x53EF;&#x80FD;&#x5BFC;&#x81F4;XSS&#x653B;&#x51FB;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x5BF9;&#x7528;&#x6237;&#x63D0;&#x4EA4;&#x7684;&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x4E00;&#x822C;&#x53EF;&#x5C06;<code>&lt;&gt;</code>&#x8F6C;&#x4E49;&#x3002;</p>
<p>&#x5982;&#x679C;&#x60F3;&#x8981;&#x663E;&#x793A;<code>"{{""}}"</code>&#x6807;&#x7B7E;&#xFF0C;&#x4E0D;&#x8FDB;&#x884C;&#x66FF;&#x6362;&#xFF0C;&#x4F7F;&#x7528;<code>v-pre</code>&#x5373;&#x53EF;&#x8DF3;&#x8FC7;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x548C;&#x5B83;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x3002;</p>
<ul>
<li>&#x5728;<code>"{{""}}"</code>&#x4E2D;&#x9664;&#x4E86;&#x7B80;&#x5355;&#x7684;&#x7ED1;&#x5B9A;&#x5C5E;&#x6027;&#x503C;&#x5916;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;JavaScript&#x8868;&#x8FBE;&#x5F0F;&#x8FDB;&#x884C;&#x7B80;&#x5355;&#x7684;&#x8FD0;&#x7B97;&#x3001;&#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x7B49;&#x3002;</li>
<li>Vue&#x53EA;&#x652F;&#x6301;&#x5355;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4E0D;&#x652F;&#x6301;&#x8BED;&#x53E5;&#x548C;&#x6D41;&#x7A0B;&#x63A7;&#x5236;&#x3002;</li>
<li>&#x5728;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x7528;&#x6237;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x53EA;&#x80FD;&#x4F7F;&#x7528;Vue&#x767D;&#x540D;&#x5355;&#x5185;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x4F8B;&#x5982;<code>Math</code>&#x548C;<code>Date</code>&#x3002;</li>
</ul>
<h2 id="articleHeader3">&#x8FC7;&#x6EE4;&#x5668;</h2>
<p>Vue.js&#x652F;&#x6301;&#x5728;<code>"{{""}}"</code>&#x63D2;&#x503C;&#x7684;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x7BA1;&#x9053;&#x7B26;<code>(|)</code>&#x5BF9;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x8FC7;&#x6EE4;&#xFF0C;&#x7ECF;&#x5E38;&#x7528;&#x6237;&#x683C;&#x5F0F;&#x5316;&#x6587;&#x672C;&#xFF0C;&#x6BD4;&#x5982;<strong>&#x5B57;&#x6BCD;&#x5168;&#x90E8;&#x5927;&#x5199;</strong>&#x3001;<strong>&#x8D27;&#x5E01;&#x5343;&#x4F4D;&#x4F7F;&#x7528;&#x9017;&#x53F7;&#x5206;&#x9694;</strong>&#x7B49;&#x3002;&#x8FC7;&#x6EE4;&#x7684;&#x89C4;&#x5219;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#xFF0C;&#x901A;&#x8FC7;&#x7ED9;Vue&#x5B9E;&#x4F8B;&#x6DFB;&#x52A0;&#x9009;&#x9879;<code>filter</code>&#x6765;&#x8BBE;&#x7F6E;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    "{{"date | formatDate"}}"
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;
    "{{"<span class="hljs-built_in">date</span> | formatDate"}}"
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>&#x8FC7;&#x6EE4;&#x5668;&#x4E5F;&#x53EF;&#x4EE5;&#x4E32;&#x8054;&#xFF0C;&#x800C;&#x4E14;&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x53C2;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--&#x4E32;&#x8054;--&gt;
"{{"message | filterA | filterB"}}"

&lt;!--&#x63A5;&#x6536;&#x53C2;&#x6570;--&gt;
"{{"message | filterA(&apos;arg1&apos;,&apos;arg2&apos;)"}}"
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!--&#x4E32;&#x8054;--&gt;</span>
</span><span class="hljs-template-variable">"{{"message | filterA | filterB"}}"</span><span class="xml">

<span class="hljs-comment">&lt;!--&#x63A5;&#x6536;&#x53C2;&#x6570;--&gt;</span>
</span><span class="hljs-template-variable">"{{"message | filterA(&apos;arg1&apos;,&apos;arg2&apos;)"}}"</span><span class="xml">
</span></code></pre>
<p>&#x8FC7;&#x6EE4;&#x5668;&#x5E94;&#x5F53;&#x7528;&#x4E8E;&#x5904;&#x7406;&#x7B80;&#x5355;&#x7684;&#x6587;&#x672C;&#x8F6C;&#x6362;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x5B9E;&#x73B0;&#x66F4;&#x4E3A;&#x590D;&#x6742;&#x7684;&#x6570;&#x636E;&#x8F6C;&#x6362;&#xFF0C;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x3002;</p>
<h2 id="articleHeader4">&#x6307;&#x4EE4;&#x4E8B;&#x4EF6;</h2>
<p>&#x6307;&#x4EE4;&#xFF08;<code>Directives</code>&#xFF09;&#x662F;Vue.js&#x6A21;&#x677F;&#x4E2D;&#x6700;&#x5E38;&#x7528;&#x7684;&#x4E00;&#x9879;&#x529F;&#x80FD;&#xFF0C;&#x5B83;&#x5E26;&#x6709;&#x524D;&#x7F00;<code>v-</code>&#x3002;&#x6307;&#x4EE4;&#x7684;&#x4E3B;&#x8981;&#x804C;&#x8D23;&#x5C31;&#x662F;&#x5F53;&#x5176;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x503C;&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x76F8;&#x5E94;&#x5730;&#x5C06;&#x67D0;&#x4E9B;&#x884C;&#x4E3A;&#x5E94;&#x7528;&#x5230;DOM&#x4E0A;&#x3002;</p>
<p><code>v-bind</code>&#x7684;&#x57FA;&#x672C;&#x7528;&#x9014;&#x662F;&#x52A8;&#x6001;&#x66F4;&#x65B0;HTML&#x5143;&#x7D20;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x6BD4;&#x5982;<code>id</code>&#x3001;<code>class</code>&#x7B49;&#x3002;</p>
<p>&#x53E6;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x91CD;&#x8981;&#x7684;&#x6307;&#x4EE4;&#x5C31;&#x662F;<code>v-on</code>&#xFF0C;&#x7528;&#x6765;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;&#x3002;</p>
<p>&#x5728;&#x666E;&#x901A;&#x5143;&#x7D20;&#x4E0A;&#xFF0C;<code>v-on</code>&#x53EF;&#x4EE5;&#x76D1;&#x542C;&#x539F;&#x751F;&#x7684;DOM&#x4E8B;&#x4EF6;&#xFF0C;&#x9664;&#x4E86;<code>click</code>&#x5916;&#x8FD8;&#x6709;<code>dbclick</code>&#x3001;<code>keyup</code>&#x3001;<code>mousemove</code>&#x7B49;&#x3002;&#x8868;&#x8FBE;&#x5F0F;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x540D;&#xFF0C;&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x90FD;&#x5199;&#x5728;Vue&#x5E02;&#x91CC;&#x7684;<code>methods</code>&#x5C5E;&#x6027;&#x5185;&#xFF0C;&#x5E76;&#x4E14;&#x662F;&#x51FD;&#x6570;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x8FD9;&#x4E9B;&#x51FD;&#x6570;&#x7684;<code>this</code>&#x6307;&#x5411;&#x7684;&#x662F;&#x5F53;&#x524D;Vue&#x5B9E;&#x4F8B;&#x672C;&#x8EAB;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<code>this.xxx</code>&#x7684;&#x5F62;&#x5F0F;&#x8BBF;&#x95EE;&#x6216;&#x4FEE;&#x6539;&#x6570;&#x636E;&#x3002;</p>
<p>Vue.js&#x5C06;<code>methods</code>&#x91CC;&#x7684;&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x4EE3;&#x7406;&#xFF0C;&#x53EF;&#x4EE5;&#x50CF;&#x8BBF;&#x95EE;Vue&#x6570;&#x636E;&#x4E00;&#x6837;&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;p v-if=&quot;show&quot;&gt;&#x8FD9;&#x662F;&#x4E00;&#x6BB5;&#x4E3A;&#x672C;&lt;/p&gt;
    &lt;button @click=&quot;handleClose&quot;&gt;&#x70B9;&#x51FB;&#x9690;&#x85CF;&lt;/button&gt;
&lt;/div&gt;

new Vue({
    el: &quot;#app&quot;,
    data: {
        show: true
    },
    methods: {
        handleClose: function () {
            this.close()
        },
        close: function () {
            this.show = false
        }
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;p v-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;show&quot;</span>&gt;&#x8FD9;&#x662F;&#x4E00;&#x6BB5;&#x4E3A;&#x672C;&lt;/p&gt;
    &lt;button @click=<span class="hljs-string">&quot;handleClose&quot;</span>&gt;&#x70B9;&#x51FB;&#x9690;&#x85CF;&lt;/button&gt;
&lt;/div&gt;

<span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">&quot;#app&quot;</span>,
    data: {
        show: <span class="hljs-literal">true</span>
    },
    methods: {
        handleClose: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">this</span>.close()
        },
        close: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>
        }
    }
});
</code></pre>
<p>&#x5728;<code>handleClose</code>&#x65B9;&#x6CD5;&#x4E2D;&#x76F4;&#x63A5;&#x901A;&#x8FC7;<code>this.close()</code>&#x8C03;&#x7528;&#x4E86;<code>close()</code>&#x51FD;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: &quot;#app&quot;,
    data: {
        show: true
    },
    methods: {
        init: function (text) {
            console.log(text);
        },
    },
    mounted: function () {
        this.init(&apos;&#x5728;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x8C03;&#x7528;&apos;);
    }
});
app.init(&apos;&#x901A;&#x8FC7;&#x5916;&#x90E8;&#x8C03;&#x7528;&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&quot;#app&quot;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">show</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">text</span>) </span>{
            <span class="hljs-built_in">console</span>.log(text);
        },
    },
    <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.init(<span class="hljs-string">&apos;&#x5728;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x8C03;&#x7528;&apos;</span>);
    }
});
app.init(<span class="hljs-string">&apos;&#x901A;&#x8FC7;&#x5916;&#x90E8;&#x8C03;&#x7528;&apos;</span>);
</code></pre>
<h2 id="articleHeader5">&#x8BED;&#x6CD5;&#x7CD6;</h2>
<p>&#x8BED;&#x6CD5;&#x7CD6;&#x662F;&#x6307;&#x5728;&#x4E0D;&#x5F71;&#x54CD;&#x529F;&#x80FD;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6DFB;&#x52A0;&#x67D0;&#x79CD;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x540C;&#x6837;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x4ECE;&#x800C;&#x65B9;&#x4FBF;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x3002;</p>
<p>Vue.js&#x7684;<code>v-bind</code>&#x548C;<code>v-on</code>&#x6307;&#x4EE4;&#x90FD;&#x63D0;&#x4F9B;&#x4E86;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x7F29;&#x5199;&#xFF0C;&#x6BD4;&#x5982;<code>v-bind</code>&#x7F29;&#x5199;&#x6210;<code>:</code>&#xFF0C;&#x591A;&#x7528;&#x4E8E;<code>a</code>&#x3001;<code>img</code>&#x6807;&#x7B7E;&#xFF1B;<code>v-on</code>&#x7F29;&#x5199;&#x6210;<code>@</code>&#xFF0C;&#x6240;&#x7528;&#x4E8E;<code>input</code>&#x3001;<code>button</code>&#x6807;&#x7B7E;&#x3002;</p>
<h1 id="articleHeader6">&#x8BA1;&#x7B97;&#x5C5E;&#x6027;</h1>
<p>&#x6240;&#x6709;&#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x90FD;&#x4EE5;&#x51FD;&#x6570;&#x7684;&#x5F62;&#x5F0F;&#x5199;&#x5728;Vue&#x5B9E;&#x4F8B;&#x4E2D;&#x7684;<code>computed</code>&#x9009;&#x9879;&#x5185;&#xFF0C;&#x6700;&#x7EC8;&#x8FD4;&#x56DE;&#x8BA1;&#x7B97;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x3002;</p>
<h2 id="articleHeader7">&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x7528;&#x6CD5;</h2>
<p>&#x5728;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E2D;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x5404;&#x79CD;&#x590D;&#x6742;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x5305;&#x62EC;&#x8FD0;&#x7B97;&#x3001;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x7B49;&#xFF0C;&#x53EA;&#x8981;&#x6700;&#x7EC8;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7ED3;&#x679C;&#x5373;&#x53EF;&#x3002;</p>
<p>&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x8FD8;&#x53EF;&#x4EE5;&#x4F9D;&#x8D56;&#x591A;&#x4E2A;Vue&#x5B9E;&#x4F8B;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x53EA;&#x8981;&#x5176;&#x4E2D;&#x4EFB;&#x4E00;&#x6570;&#x636E;&#x53D8;&#x5316;&#xFF0C;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x5C31;&#x4F1A;&#x91CD;&#x65B0;&#x6267;&#x884C;&#xFF0C;&#x89C6;&#x56FE;&#x4E5F;&#x4F1A;&#x66F4;&#x65B0;&#x3002;</p>
<p>&#x6BCF;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x90FD;&#x5305;&#x542B;&#x4E00;&#x4E2A;<code>getter</code>&#x548C;&#x4E00;&#x4E2A;<code>setter</code>&#x3002;</p>
<p>&#x7EDD;&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x53EA;&#x4F1A;&#x7528;&#x9ED8;&#x8BA4;&#x7684;<code>getter</code>&#x65B9;&#x6CD5;&#x8BFB;&#x53D6;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#x5F88;&#x5C11;&#x7528;&#x5230;<code>setter</code>&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x4E0D;&#x5FC5;&#x5C06;<code>getter</code>&#x548C;<code>setter</code>&#x90FD;&#x58F0;&#x660E;&#x3002;</p>
<p>&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x9664;&#x4E86;&#x7B80;&#x5355;&#x7684;&#x6587;&#x672C;&#x63D2;&#x503C;&#x5916;&#xFF0C;&#x8FD8;&#x7ECF;&#x5E38;&#x7528;&#x4E8E;&#x52A8;&#x6001;&#x5730;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;&#x540D;&#x79F0;<code>class</code>&#x548C;&#x5185;&#x8054;&#x6837;&#x5F0F;<code>style</code>&#x3002;&#x5F53;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E5F;&#x7ECF;&#x5E38;&#x7528;&#x6765;&#x52A8;&#x6001;&#x4F20;&#x9012;<code>props</code>&#x3002;</p>
<p>&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x8FD8;&#x6709;&#x4E24;&#x4E2A;&#x5F88;&#x5B9E;&#x7528;&#x7684;&#x5C0F;&#x6280;&#x5DE7;&#x5BB9;&#x6613;&#x88AB;&#x5FFD;&#x7565;&#xFF1A;</p>
<ol>
<li>&#x4E00;&#x662F;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x4F9D;&#x8D56;&#x5176;&#x4ED6;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF1B;</li>
<li>&#x4E8C;&#x662F;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x4F9D;&#x8D56;&#x5F53;&#x524D;Vue&#x5B9E;&#x4F8B;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x4F9D;&#x8D56;&#x5176;&#x4ED6;&#x5B9E;&#x4F8B;&#x7684;&#x6570;&#x636E;&#x3002;</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app1&quot;&gt;&lt;/div&gt;
    &lt;div id=&quot;app2&quot;&gt;
    "{{"reverseText"}}"
&lt;/div&gt;

var app1 = new Vue({
    el: &quot;#app1&quot;,
    data: {
        text: &apos;123,456&apos;
    },
});
var app2 = new Vue({
    el: &quot;#app2&quot;,
    computed: {
        reverseText: function () {
            //&#x8FD9;&#x91CC;&#x4F9D;&#x8D56;&#x7684;&#x662F;&#x5B9E;&#x4F8B;app1&#x7684;&#x6570;&#x636E;text
            return app1.text.split(&apos;,&apos;).reverse().join(&apos;,&apos;);
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code>&lt;div id=<span class="hljs-string">&quot;app1&quot;</span>&gt;&lt;/div&gt;
    &lt;div id=<span class="hljs-string">&quot;app2&quot;</span>&gt;
    "{{"reverseText"}}"
&lt;/div&gt;

<span class="hljs-keyword">var</span> app1 = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">&quot;#app1&quot;</span>,
    data: {
        text: <span class="hljs-string">&apos;123,456&apos;</span>
    },
});
<span class="hljs-keyword">var</span> app2 = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">&quot;#app2&quot;</span>,
    computed: {
        reverseText: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x4F9D;&#x8D56;&#x7684;&#x662F;&#x5B9E;&#x4F8B;app1&#x7684;&#x6570;&#x636E;text</span>
            <span class="hljs-keyword">return</span> app1.text.split(<span class="hljs-string">&apos;,&apos;</span>).reverse().join(<span class="hljs-string">&apos;,&apos;</span>);
        }
    }
});</code></pre>
<h2 id="articleHeader8">&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7F13;&#x5B58;</h2>
<p>&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x5728;<code>methods</code>&#x4E2D;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x4E86;&#x76F8;&#x540C;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x751A;&#x81F3;&#x8BE5;&#x65B9;&#x6CD5;&#x8FD8;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x53C2;&#x6570;&#xFF0C;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x66F4;&#x7075;&#x6D3B;&#x3002;</p>
<p><strong>&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x539F;&#x56E0;&#x5728;&#x4E8E;&#x5B83;&#x7684;&#x4F9D;&#x8D56;&#x7F13;&#x5B58;</strong>&#x3002;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x6240;&#x4F9D;&#x8D56;&#x7684;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x5B83;&#x624D;&#x4F1A;&#x91CD;&#x65B0;&#x53D6;&#x503C;&#xFF0C;&#x5728;&#x4E0A;&#x4F8B;&#x4E2D;&#x53EA;&#x8981;<code>text</code>&#x503C;&#x4E0D;&#x6539;&#x53D8;&#xFF0C;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E5F;&#x5C31;&#x4E0D;&#x66F4;&#x65B0;&#x3002;&#x4F46;&#x662F;<code>methods</code>&#x5219;&#x4E0D;&#x540C;&#xFF0C;&#x53EA;&#x8981;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x5B83;&#x5C31;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x56E0;&#x6B64;&#x51FD;&#x6570;&#x4E5F;&#x4F1A;&#x88AB;&#x6267;&#x884C;&#x3002;</p>
<p>&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x8FD8;&#x662F;<code>methods</code>&#x53D6;&#x51B3;&#x4E8E;&#x4F60;&#x662F;&#x5426;&#x9700;&#x8981;&#x7F13;&#x5B58;&#xFF0C;&#x5F53;&#x904D;&#x5386;&#x5927;&#x6570;&#x7EC4;&#x548C;&#x505A;&#x5927;&#x91CF;&#x8BA1;&#x7B97;&#x65F6;&#xFF0C;&#x5E94;&#x5F53;&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x9664;&#x975E;&#x4F60;&#x4E0D;&#x5E0C;&#x671B;&#x5F97;&#x5230;&#x7F13;&#x5B58;&#x3002;</p>
<h1 id="articleHeader9">
<code>v-bind</code>&#x53CA;<code>class</code>&#x4E0E;<code>style</code>&#x7ED1;&#x5B9A;</h1>
<p><code>v-bind</code>&#x7684;&#x4E3B;&#x8981;&#x7528;&#x6CD5;&#x662F;&#x52A8;&#x6001;&#x66F4;&#x65B0;HTML&#x5143;&#x7D20;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#x3002;</p>
<p>&#x5728;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x4E2D;&#xFF0C;<code>v-bind</code>&#x6700;&#x5E38;&#x89C1;&#x7684;&#x4E24;&#x4E2A;&#x5E94;&#x7528;&#x5C31;&#x662F;&#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;&#x540D;&#x79F0;<code>class</code>&#x548C;&#x5185;&#x8054;&#x6837;&#x5F0F;<code>style</code>&#x7684;&#x52A8;&#x6001;&#x7ED1;&#x5B9A;&#x3002;</p>
<h2 id="articleHeader10">&#x7ED1;&#x5B9A;<code>class</code>&#x7684;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;</h2>
<h3 id="articleHeader11">&#x5BF9;&#x8C61;&#x8BED;&#x6CD5;</h3>
<p>&#x7ED9;<code>v-bind:class</code>&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x53EF;&#x4EE5;&#x52A8;&#x6001;&#x5730;&#x5207;&#x6362;<code>class</code>&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div :class=&quot;{&apos;active&apos;:&apos;isActive&apos;}&quot;&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;&lt;/div&gt;
&lt;/div&gt;

new Vue({
    el: &quot;#app&quot;,
    data: {
        isActive: true
    },
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> :<span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;{&apos;active&apos;:&apos;isActive&apos;}&quot;</span>&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

new Vue({
    el: <span class="hljs-string">&quot;#app&quot;</span>,
    data: {
        isActive: <span class="hljs-literal">true</span>
    },
});
</code></pre>
<p>&#x5BF9;&#x8C61;&#x4E2D;&#x4E5F;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x591A;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x52A8;&#x6001;&#x5207;&#x6362;<code>class</code>&#x3002;&#x53E6;&#x5916;&#xFF0C;<code>:class</code>&#x53EF;&#x4EE5;&#x4E0E;&#x666E;&#x901A;<code>class</code>&#x5171;&#x5B58;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;static&quot; :class=&quot;{&apos;active&apos;:&apos;isActive&apos;,&apos;error&apos;:isError}&quot;&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;&lt;/div&gt;

data: {
    isActive: true,
    isError: false
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;static&quot;</span> :<span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;{&apos;active&apos;:&apos;isActive&apos;,&apos;error&apos;:isError}&quot;</span>&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;&lt;/<span class="hljs-keyword">div</span>&gt;

data: {
    isActive: <span class="hljs-literal">true</span>,
    isError: <span class="hljs-literal">false</span>
}
</code></pre>
<p>&#x5F53;<code>:class</code>&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x8FC7;&#x957F;&#x6216;&#x903B;&#x8F91;&#x590D;&#x6742;&#x65F6;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x3002;&#x5F53;&#x6761;&#x4EF6;&#x591A;&#x4E8E;&#x4E24;&#x4E2A;&#x65F6;&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>data</code>&#x6216;<code>computed</code>&#x3002;</p>
<p>&#x9664;&#x4E86;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;Object&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x6216;&#x8005;&#x4F7F;&#x7528;&#x7C7B;&#x4F3C;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;<code>methods</code>&#x3002;</p>
<h3 id="articleHeader12">&#x6570;&#x7EC4;&#x8BED;&#x6CD5;</h3>
<p>&#x5F53;&#x9700;&#x8981;&#x5E94;&#x7528;&#x591A;&#x4E2A;<code>class</code>&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x8BED;&#x6CD5;&#xFF0C;&#x7ED9;<code>:class</code>&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5E94;&#x7528;&#x4E00;&#x4E2A;<code>class</code>&#x5217;&#x8868;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div :class=&quot;[activeCls,errorCls]&quot;&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;&lt;/div&gt;
&lt;/div&gt;

new Vue({
    el: &quot;#app&quot;,
    data: {
        activeCls: &apos;active&apos;,
        errorCls: &apos;error&apos;
    }
});

// &#x7ED3;&#x679C;
&lt;div class=&quot;active error&quot;&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs cal"><code>&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> :class=<span class="hljs-string">&quot;[activeCls,errorCls]&quot;</span>&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

new Vue({
    el: <span class="hljs-string">&quot;#app&quot;</span>,
    data: {
        activeCls: <span class="hljs-string">&apos;active&apos;</span>,
        errorCls: <span class="hljs-string">&apos;error&apos;</span>
    }
});

// &#x7ED3;&#x679C;
&lt;<span class="hljs-keyword">div</span> class=<span class="hljs-string">&quot;active error&quot;</span>&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E09;&#x5143;&#x8868;&#x8FBE;&#x5F0F;&#x6765;&#x6839;&#x636E;&#x6761;&#x4EF6;&#x5207;&#x6362;<code>class</code>&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div :class=&quot;[isActive ? activeCls : &apos;&apos;,errorCls]&quot;&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;&lt;/div&gt;

new Vue({
    el: &quot;#app&quot;,
    data: {
        isActive: true,
        activeCls: &apos;active&apos;,
        errorCls: &apos;error&apos;
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;div :<span class="hljs-class"><span class="hljs-keyword">class</span>=&quot;[<span class="hljs-title">isActive</span> ? <span class="hljs-title">activeCls</span> : <span class="hljs-type">&apos;&apos;</span>,<span class="hljs-type">errorCls]&quot;&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;</span>&lt;<span class="hljs-type">/div</span>&gt;</span>

new Vue({
    el: <span class="hljs-string">&quot;#app&quot;</span>,
    <span class="hljs-keyword">data</span>: {
        isActive: <span class="hljs-literal">true</span>,
        activeCls: <span class="hljs-string">&apos;active&apos;</span>,
        errorCls: <span class="hljs-string">&apos;error&apos;</span>
    }
});
</code></pre>
<p>&#x5F53;<code>class</code>&#x6709;&#x591A;&#x4E2A;&#x6761;&#x4EF6;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x6570;&#x7EC4;&#x8BED;&#x6CD5;&#x4E2D;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div :class=&quot;[{&apos;active&apos;:isActive},errorCls]&quot;&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;&lt;/div&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> :<span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;[{&apos;active&apos;:isActive},errorCls]&quot;</span>&gt;&#x6D4B;&#x8BD5;&#x6587;&#x5B57;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7ED9;&#x5143;&#x7D20;&#x52A8;&#x6001;&#x8BBE;&#x7F6E;&#x7C7B;&#x540D;&#xFF0C;&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#x7ECF;&#x5E38;&#x7528;&#x5230;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x5728;&#x5199;&#x590D;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;<strong>&#x5982;&#x679C;&#x8868;&#x8FBE;&#x5F0F;&#x8F83;&#x957F;&#x6216;&#x903B;&#x8F91;&#x590D;&#x6742;&#xFF0C;&#x5E94;&#x8BE5;&#x5C3D;&#x53EF;&#x80FD;&#x5730;&#x4F18;&#x5148;&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;</strong>&#x3002;</p>
<h3 id="articleHeader13">&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;</h3>
<p>&#x5982;&#x679C;&#x76F4;&#x63A5;&#x5728;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x4E0A;&#x4F7F;&#x7528;<code>class</code>&#x6216;<code>:class</code>&#xFF0C;&#x6837;&#x5F0F;&#x89C4;&#x5219;&#x4F1A;&#x76F4;&#x63A5;&#x5E94;&#x7528;&#x5230;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x6839;&#x5143;&#x7D20;&#x4E0A;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    template: `&lt;p class=&quot;article&quot;&gt;&#x4E00;&#x4E9B;&#x6587;&#x672C;&lt;/p&gt;`
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs clean"><code>Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    template: `&lt;p <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;article&quot;</span>&gt;&#x4E00;&#x4E9B;&#x6587;&#x672C;&lt;/p&gt;`
});
</code></pre>
<p>&#x7136;&#x540E;&#x5728;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x5E94;&#x7528;&#x5BF9;&#x8C61;&#x8BED;&#x6CD5;&#x6216;&#x6570;&#x7EC4;&#x8BED;&#x6CD5;&#x7ED9;&#x7EC4;&#x4EF6;&#x7ED1;&#x5B9A;<code>class</code>&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;my-component :class=&quot;{&apos;active&apos;:isActive}&quot;&gt;&lt;/my-component&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;<span class="hljs-keyword">my</span>-component :<span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;{&apos;active&apos;:isActive}&quot;</span>&gt;&lt;/<span class="hljs-keyword">my</span>-component&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>&#x8FD9;&#x79CD;&#x7528;&#x6CD5;&#x4EC5;&#x9002;&#x7528;&#x4E8E;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;&#x6700;&#x5916;&#x5C42;&#x662F;&#x4E00;&#x4E2A;&#x6839;&#x5143;&#x7D20;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x65E0;&#x6548;&#x3002;&#x5F53;&#x4E0D;&#x6EE1;&#x8DB3;&#x8FD9;&#x79CD;&#x6761;&#x4EF6;&#x6216;&#x9700;&#x8981;&#x7ED9;&#x5177;&#x4F53;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x7C7B;&#x540D;&#x65F6;&#xFF0C;&#x5E94;&#x5F53;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x7684;<code>props</code>&#x6765;&#x4F20;&#x9012;&#x3002;</p>
<h2 id="articleHeader14">&#x7ED1;&#x5B9A;&#x5185;&#x8054;&#x6837;&#x5F0F;</h2>
<p>&#x4F7F;&#x7528;<code>:style</code>&#x53EF;&#x4EE5;&#x7ED9;&#x5143;&#x7D20;&#x7ED1;&#x5B9A;&#x5185;&#x8054;&#x6837;&#x5F0F;&#xFF0C;&#x65B9;&#x6CD5;&#x4E0E;<code>:class</code>&#x7C7B;&#x4F3C;&#xFF0C;&#x4E5F;&#x6709;&#x5BF9;&#x8C61;&#x8BED;&#x6CD5;&#x548C;&#x6570;&#x7EC4;&#x8BED;&#x6CD5;&#xFF0C;&#x5F88;&#x50CF;&#x76F4;&#x63A5;&#x5728;&#x5143;&#x7D20;&#x4E0A;&#x5199;CSS&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div :style=&quot;{&apos;color&apos;:color, &apos;fontSize&apos;:fontSize+&apos;px&apos;}&quot;&gt;&#x6587;&#x672C;&lt;/div&gt;
&lt;/div&gt;

new Vue({
    el: &quot;#app&quot;,
    data: {
        color: &apos;red&apos;,
        fontSize: 14
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs axapta"><code>&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> :style=<span class="hljs-string">&quot;{&apos;color&apos;:color, &apos;fontSize&apos;:fontSize+&apos;px&apos;}&quot;</span>&gt;&#x6587;&#x672C;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

<span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">&quot;#app&quot;</span>,
    data: {
        color: <span class="hljs-string">&apos;red&apos;</span>,
        fontSize: <span class="hljs-number">14</span>
    }
});
</code></pre>
<p>&#x4E00;&#x822C;&#x628A;&#x6837;&#x5F0F;&#x5199;&#x5728;<code>data</code>&#x6216;<code>computed</code>&#x4E2D;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div :style=&quot;styles&quot;&gt;&#x6587;&#x672C;&lt;/div&gt;
&lt;/div&gt;

new Vue({
    el: &quot;#app&quot;,
    data: {
        styles: {
            color: &apos;red&apos;,
            fontSize: 16 + &apos;px&apos;
        }
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs axapta"><code>&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> :style=<span class="hljs-string">&quot;styles&quot;</span>&gt;&#x6587;&#x672C;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

<span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">&quot;#app&quot;</span>,
    data: {
        styles: {
            color: <span class="hljs-string">&apos;red&apos;</span>,
            fontSize: <span class="hljs-number">16</span> + <span class="hljs-string">&apos;px&apos;</span>
        }
    }
});
</code></pre>
<p>&#x5728;&#x5B9E;&#x9645;&#x4E1A;&#x52A1;&#x4E2D;&#xFF0C;<code>:style</code>&#x7684;&#x6570;&#x7EC4;&#x8BED;&#x6CD5;&#x5E76;&#x4E0D;&#x5E38;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x5199;&#x5728;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#xFF0C;&#x800C;&#x8F83;&#x4E3A;&#x5E38;&#x7528;&#x7684;&#x662F;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x3002;</p>
<p>&#x53E6;&#x5916;&#xFF0C;&#x4F7F;&#x7528;<code>:style</code>&#x65F6;&#xFF0C;Vue.js&#x4F1A;&#x81EA;&#x52A8;&#x7ED9;&#x7279;&#x6B8A;&#x7684;CSS&#x5C5E;&#x6027;&#x540D;&#x79F0;&#x589E;&#x52A0;&#x524D;&#x7F00;&#xFF0C;&#x6BD4;&#x5982;<code>transform</code>&#x3002;</p>
<h1 id="articleHeader15">&#x5185;&#x7F6E;&#x6307;&#x4EE4;</h1>
<h2 id="articleHeader16">&#x57FA;&#x672C;&#x6307;&#x4EE4;</h2>
<h3 id="articleHeader17"><code>v-cloak</code></h3>
<p><code>v-cloak</code>&#x4E0D;&#x9700;&#x8981;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5B83;&#x4F1A;&#x5728;Vue&#x5B9E;&#x4F8B;&#x7ED3;&#x675F;&#x7F16;&#x8BD1;&#x65F6;&#x4ECE;&#x7ED1;&#x5B9A;&#x7684;HTML&#x5143;&#x7D20;&#x4E0A;&#x79FB;&#x9664;&#xFF0C;&#x7ECF;&#x5E38;&#x548C;CSS&#x7684;<code>display: none;</code>&#x914D;&#x5408;&#x4F7F;&#x7528;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot; v-cloak&gt;
    "{{"message"}}"
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;app&quot;</span> v-cloak&gt;
    "{{"message"}}"
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>&#x5F53;&#x7F51;&#x901F;&#x8F83;&#x6162;&#x3001;Vue.js&#x6587;&#x4EF6;&#x8FD8;&#x6CA1;&#x52A0;&#x8F7D;&#x5B8C;&#x65F6;&#xFF0C;&#x5728;&#x9875;&#x9762;&#x4E0A;&#x4F1A;&#x663E;&#x793A;<code>"{{"message"}}"</code>&#x7684;&#x5B57;&#x6837;&#xFF0C;&#x76F4;&#x5230;Vue&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#x3001;&#x7F16;&#x8BD1;&#x6A21;&#x677F;&#x65F6;&#xFF0C;DOM&#x624D;&#x4F1A;&#x88AB;&#x66FF;&#x6362;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x5C4F;&#x5E55;&#x6709;&#x95EA;&#x3002;&#x53EA;&#x8981;&#x52A0;&#x4E00;&#x53E5;CSS&#x5C31;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[v-cloak] {
    display: none;
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-attr">[v-cloak]</span> {
    <span class="hljs-attribute">display</span>: none;
}
</code></pre>
<p>v-cloak&#x662F;&#x4E00;&#x4E2A;&#x89E3;&#x51B3;&#x521D;&#x59CB;&#x5316;&#x6162;&#x5BFC;&#x81F4;&#x9875;&#x9762;&#x95EA;&#x52A8;&#x7684;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#xFF0C;&#x5BF9;&#x4E8E;&#x7B80;&#x5355;&#x7684;&#x9879;&#x76EE;&#x5F88;&#x5B9E;&#x7528;&#x3002;</p>
<p>&#x5728;&#x5DE5;&#x7A0B;&#x5316;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x9879;&#x76EE;&#x7684;HTML&#x7ED3;&#x6784;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;<code>div</code>&#x5143;&#x7D20;&#xFF0C;&#x5269;&#x4E0B;&#x7684;&#x5185;&#x5BB9;&#x90FD;&#x7531;&#x8DEF;&#x7531;&#x6302;&#x8F7D;&#x4E0D;&#x540C;&#x7EC4;&#x4EF6;&#x5B8C;&#x6210;&#xFF0C;&#x8FD9;&#x65F6;&#x4E0D;&#x518D;&#x9700;&#x8981;<code>v-cloak</code>&#x3002;</p>
<h3 id="articleHeader18"><code>v-once</code></h3>
<p><code>v-once</code>&#x662F;&#x4E00;&#x4E2A;&#x4E0D;&#x9700;&#x8981;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x6307;&#x4EE4;&#xFF0C;&#x4F5C;&#x7528;&#x662F;&#x5B9A;&#x4E49;&#x5B83;&#x7684;&#x5143;&#x7D20;&#x6216;&#x8005;&#x7EC4;&#x4EF6;&#x53EA;&#x6E32;&#x67D3;&#x4E00;&#x6B21;&#xFF0C;&#x5305;&#x62EC;&#x5143;&#x7D20;&#x6216;&#x7EC4;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x5B50;&#x8282;&#x70B9;&#x3002;&#x9996;&#x6B21;&#x6E32;&#x67D3;&#x540E;&#xFF0C;&#x4E0D;&#x518D;&#x968F;&#x6570;&#x636E;&#x7684;&#x53D8;&#x5316;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x5C06;&#x88AB;&#x89C6;&#x4E3A;&#x9759;&#x6001;&#x5185;&#x5BB9;&#x3002;</p>
<p><code>v-once</code>&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#x5F88;&#x5C11;&#x4F7F;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x8FDB;&#x4E00;&#x6B65;&#x4F18;&#x5316;&#x6027;&#x80FD;&#x65F6;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x7528;&#x5230;&#x3002;</p>
<h2 id="articleHeader19">&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#x6307;&#x4EE4;</h2>
<h3 id="articleHeader20">
<code>v-if</code>&#x3001;<code>v-else-if</code>&#x3001;<code>v-else</code>
</h3>
<p>Vue.js&#x7684;&#x6761;&#x4EF6;&#x6307;&#x4EE4;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x503C;&#x5728;DOM&#x4E2D;&#x6E32;&#x67D3;&#x6216;&#x9500;&#x6BC1;&#x5143;&#x7D20;/&#x7EC4;&#x4EF6;&#x3002;</p>
<p><code>v-else-if</code>&#x8981;&#x7D27;&#x8DDF;<code>v-if</code>&#xFF0C;<code>v-else</code>&#x8981;&#x7D27;&#x8DDF;<code>v-else-if</code>&#x6216;<code>v-if</code>&#xFF0C;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x503C;&#x4E3A;&#x771F;&#x65F6;&#xFF0C;&#x5F53;&#x524D;&#x5143;&#x7D20;/&#x7EC4;&#x4EF6;&#x53CA;&#x6240;&#x6709;&#x5B50;&#x8282;&#x70B9;&#x5C06;&#x88AB;&#x6E32;&#x67D3;&#xFF0C;&#x4E3A;&#x5047;&#x65F6;&#x88AB;&#x79FB;&#x9664;&#x3002;</p>
<p>&#x5982;&#x679C;&#x4E00;&#x6B21;&#x5224;&#x65AD;&#x7684;&#x662F;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;Vue.js&#x5185;&#x7F6E;&#x7684;<code>&lt;template&gt;</code>&#x5143;&#x7D20;&#x4E0A;&#x4F7F;&#x7528;&#x6761;&#x4EF6;&#x6307;&#x4EE4;&#xFF0C;&#x6700;&#x7EC8;&#x6E32;&#x67D3;&#x7684;&#x7ED3;&#x679C;&#x4E0D;&#x4F1A;&#x5305;&#x542B;&#x8BE5;&#x5143;&#x7D20;&#x3002;</p>
<p>Vue&#x5728;&#x6E32;&#x67D3;&#x5143;&#x7D20;&#x65F6;&#xFF0C;&#x5904;&#x4E8E;&#x6548;&#x7387;&#x8003;&#x8651;&#xFF0C;&#x4F1A;&#x5C3D;&#x53EF;&#x80FD;&#x5730;&#x590D;&#x7528;&#x5DF2;&#x6709;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x800C;&#x975E;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
  &lt;template v-if=&quot;type===&apos;name&apos;&quot;&gt;
    &lt;label&gt;&#x7528;&#x6237;&#x540D;&#xFF1A;&lt;/label&gt;
    &lt;input type=&quot;text&quot; placeholder=&quot;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&quot;&gt;
  &lt;/template&gt;
  &lt;template v-else&gt;
    &lt;label&gt;&#x90AE;&#x7BB1;&#xFF1A;&lt;/label&gt;
    &lt;input type=&quot;text&quot; placeholder=&quot;&#x8F93;&#x5165;&#x90AE;&#x7BB1;&quot;&gt;
  &lt;/template&gt;
  &lt;button @click=&quot;handleToggleClick&quot;&gt;&#x5207;&#x6362;&#x8F93;&#x5165;&#x7C7B;&#x578B;&lt;/button&gt;
&lt;/div&gt;

new Vue({
  el:&quot;#app&quot;,
  data:{
    type:&apos;name&apos;
  },
  methods:{
    handleToggleClick:function(){
      this.type=this.type===&apos;name&apos;?&apos;mail&apos;:&apos;name&apos;;
    }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
  &lt;template v-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;type===&apos;name&apos;&quot;</span>&gt;
    &lt;label&gt;&#x7528;&#x6237;&#x540D;&#xFF1A;&lt;/label&gt;
    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">&quot;text&quot;</span> placeholder=<span class="hljs-string">&quot;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&quot;</span>&gt;
  &lt;/template&gt;
  &lt;template v-<span class="hljs-keyword">else</span>&gt;
    &lt;label&gt;&#x90AE;&#x7BB1;&#xFF1A;&lt;/label&gt;
    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">&quot;text&quot;</span> placeholder=<span class="hljs-string">&quot;&#x8F93;&#x5165;&#x90AE;&#x7BB1;&quot;</span>&gt;
  &lt;/template&gt;
  &lt;button <span class="hljs-meta">@click</span>=<span class="hljs-string">&quot;handleToggleClick&quot;</span>&gt;&#x5207;&#x6362;&#x8F93;&#x5165;&#x7C7B;&#x578B;&lt;/button&gt;
&lt;/div&gt;

<span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>({
  el:<span class="hljs-string">&quot;#app&quot;</span>,
  data:{
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>:<span class="hljs-symbol">&apos;nam</span>e&apos;
  },
  methods:{
    handleToggleClick:function(){
      <span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span>=<span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span>===<span class="hljs-symbol">&apos;nam</span>e&apos;?<span class="hljs-symbol">&apos;mai</span>l&apos;:<span class="hljs-symbol">&apos;nam</span>e&apos;;
    }
  }
})</code></pre>
<p>&#x793A;&#x4F8B;&#x4E2D;&#x952E;&#x5165;&#x5185;&#x5BB9;&#x540E;&#xFF0C;&#x70B9;&#x51FB;&#x5207;&#x6362;&#x6309;&#x94AE;&#xFF0C;&#x867D;&#x7136;DOM&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x4E4B;&#x524D;&#x5728;&#x8F93;&#x5165;&#x6846;&#x952E;&#x5165;&#x7684;&#x5185;&#x5BB9;&#x5E76;&#x6CA1;&#x6709;&#x6539;&#x53D8;&#xFF0C;&#x53EA;&#x662F;&#x66FF;&#x6362;&#x4E86;<code>placeholder</code>&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x8BF4;&#x660E;<code>&lt;input&gt;</code>&#x5143;&#x7D20;&#x88AB;&#x590D;&#x7528;&#x4E86;&#x3002;</p>
<p>&#x4F7F;&#x7528;Vue.js&#x63D0;&#x4F9B;&#x7684;<code>key</code>&#x5C5E;&#x6027;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x4F60;&#x81EA;&#x5DF1;&#x51B3;&#x5B9A;&#x662F;&#x5426;&#x8981;&#x590D;&#x7528;&#x5143;&#x7D20;&#xFF0C;<code>key</code>&#x7684;&#x503C;&#x5FC5;&#x987B;&#x662F;&#x552F;&#x4E00;&#x7684;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;input type=&quot;text&quot; placeholder=&quot;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&quot; key=&quot;name-input&quot;&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs fsharp"><code>&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">&quot;text&quot;</span> placeholder=<span class="hljs-string">&quot;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&quot;</span> key=<span class="hljs-string">&quot;name-input&quot;</span>&gt;
</code></pre>
<p>&#x7ED9;&#x4E24;&#x4E2A;<code>&lt;input&gt;</code>&#x5143;&#x7D20;&#x90FD;&#x589E;&#x52A0;&#x4E86;<code>key</code>&#x540E;&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x590D;&#x7528;&#x4E86;&#x3002;&#x5207;&#x6362;&#x7C7B;&#x578B;&#x65F6;&#x952E;&#x5165;&#x7684;&#x5185;&#x5BB9;&#x4E5F;&#x4F1A;&#x88AB;&#x5220;&#x9664;&#xFF0C;&#x4E0D;&#x8FC7;<code>&lt;label&gt;</code>&#x5143;&#x7D20;&#x4ECD;&#x7136;&#x4F1A;&#x88AB;&#x590D;&#x7528;&#xFF0C;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x6DFB;&#x52A0;<code>key</code>&#x5C5E;&#x6027;&#x3002;</p>
<h3 id="articleHeader21"><code>v-show</code></h3>
<p><code>v-show</code>&#x7684;&#x7528;&#x6CD5;&#x4E0E;<code>v-if</code>&#x57FA;&#x672C;&#x4E00;&#x81F4;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;<code>v-show</code>&#x662F;&#x6539;&#x53D8;&#x5143;&#x7D20;&#x7684;CSS&#x5C5E;&#x6027;<code>display</code>&#x3002;</p>
<p>&#x5F53;<code>v-show</code>&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x503C;&#x4E3A;<code>false</code>&#x65F6;&#x5143;&#x7D20;&#x4F1A;&#x9690;&#x85CF;&#xFF0C;DOM&#x7ED3;&#x6784;&#x5143;&#x7D20;&#x4E0A;&#x52A0;&#x8F7D;&#x4E86;&#x5185;&#x8054;&#x6837;&#x5F0F;<code>display:none;</code>&#x3002;</p>
<p><strong><code>v-show</code>&#x4E0D;&#x80FD;&#x5728;<code>&lt;template&gt;</code>&#x4E0A;&#x4F7F;&#x7528;</strong>&#x3002;</p>
<h3 id="articleHeader22">
<code>v-if</code>&#x4E0E;<code>v-show</code>&#x7684;&#x9009;&#x62E9;</h3>
<p><code>v-if</code>&#x548C;<code>v-show</code>&#x5177;&#x6709;&#x7C7B;&#x4F3C;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4E0D;&#x8FC7;<code>v-if</code>&#x624D;&#x662F;&#x771F;&#x6B63;&#x7684;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#xFF0C;&#x5B83;&#x4F1A;&#x6839;&#x636E;&#x8868;&#x8FBE;&#x5F0F;&#x9002;&#x5F53;&#x5730;<strong>&#x9500;&#x6BC1;&#x6216;&#x91CD;&#x5EFA;</strong>&#x5143;&#x7D20;&#x53CA;&#x7ED1;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x6216;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;</p>
<p>&#x82E5;&#x8868;&#x8FBE;&#x5F0F;&#x521D;&#x59CB;&#x503C;&#x4E3A;<code>false</code>&#xFF0C;&#x5219;&#x4E00;&#x5F00;&#x59CB;&#x5143;&#x7D20;/&#x7EC4;&#x4EF6;&#x5E76;&#x4E0D;&#x4F1A;&#x6E32;&#x67D3;&#xFF0C;&#x53EA;&#x6709;&#x5F53;&#x6761;&#x4EF6;&#x7B2C;&#x4E00;&#x6B21;&#x53D8;&#x4E3A;&#x771F;&#x65F6;&#x624D;&#x5F00;&#x59CB;&#x7F16;&#x8BD1;&#x3002;</p>
<p>&#x800C;<code>v-show</code>&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;CSS&#x5C5E;&#x6027;&#x5207;&#x6362;&#xFF0C;&#x65E0;&#x8BBA;&#x6761;&#x4EF6;&#x771F;&#x4E0E;&#x5426;&#xFF0C;&#x90FD;&#x4F1A;&#x88AB;&#x7F16;&#x8BD1;&#x3002;</p>
<p>&#x76F8;&#x6BD4;&#x4E4B;&#x4E0B;&#xFF0C;<code>v-if</code>&#x66F4;&#x9002;&#x5408;&#x6761;&#x4EF6;&#x4E0D;&#x7ECF;&#x5E38;&#x6539;&#x53D8;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x7684;&#x5207;&#x6362;&#x5F00;&#x9500;&#x76F8;&#x5BF9;&#x8F83;&#x5927;&#xFF0C;&#x800C;<code>v-show</code>&#x9002;&#x7528;&#x4E8E;&#x9891;&#x7E41;&#x5207;&#x6362;&#x6761;&#x4EF6;&#x3002;</p>
<h2 id="articleHeader23">&#x5217;&#x8868;&#x6E32;&#x67D3;&#x6307;&#x4EE4;<code>v-for</code>
</h2>
<h3 id="articleHeader24">&#x57FA;&#x672C;&#x7528;&#x6CD5;</h3>
<p>&#x5F53;&#x9700;&#x8981;&#x5C06;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x904D;&#x5386;&#x6216;&#x679A;&#x4E3E;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5FAA;&#x73AF;&#x663E;&#x793A;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x7528;&#x5230;&#x5217;&#x8868;&#x6E32;&#x67D3;&#x6307;&#x4EE4;<code>v-for</code>&#x3002;&#x5B83;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x9700;&#x7ED3;&#x5408;<code>in</code>&#x6765;&#x4F7F;&#x7528;&#xFF0C;&#x7C7B;&#x4F3C;<code>item in items</code>&#x7684;&#x5F62;&#x5F0F;&#x3002;</p>
<p>&#x5217;&#x8868;&#x6E32;&#x67D3;&#x4E5F;&#x652F;&#x6301;&#x7528;<code>of</code>&#x4EE3;&#x66FF;<code>in</code>&#x4F5C;&#x4E3A;&#x5206;&#x9694;&#x7B26;&#xFF0C;&#x5B83;&#x66F4;&#x63A5;&#x8FD1;JavaScript&#x8FED;&#x4EE3;&#x5668;&#x7684;&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;li v-for=&quot;book of books&quot;&gt;"{{"book.name"}}"&lt;/li&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;book of books&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"book.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
</span></code></pre>
<p><code>v-for</code>&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x652F;&#x6301;&#x4E00;&#x4E2A;&#x53EF;&#x9009;&#x53C2;&#x6570;&#x4F5C;&#x4E3A;&#x5F53;&#x524D;&#x9879;&#x7684;&#x7D22;&#x5F15;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;li v-for=&quot;(book,index) of books&quot;&gt;"{{"index"}}" - "{{"book.name"}}"&lt;/li&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(book,index) of books&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"index"}}"</span><span class="xml"> - </span><span class="hljs-template-variable">"{{"book.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
</span></code></pre>
<p>&#x5206;&#x9694;&#x7B26;<code>in</code>&#x524D;&#x7684;&#x8BED;&#x53E5;&#x4F7F;&#x7528;&#x62EC;&#x53F7;&#xFF0C;&#x7B2C;&#x4E8C;&#x9879;&#x5C31;&#x662F;<code>books</code>&#x5F53;&#x524D;&#x9879;&#x7684;&#x7D22;&#x5F15;&#x3002;</p>
<p>&#x4E0E;<code>v-if</code>&#x4E00;&#x6837;&#xFF0C;<code>v-for</code>&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x5185;&#x7F6E;&#x6807;&#x7B7E;<code>&lt;template&gt;</code>&#x4E0A;&#xFF0C;&#x5C06;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#x3002;</p>
<p>&#x9664;&#x4E86;&#x6570;&#x7EC4;&#x5916;&#xFF0C;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x904D;&#x5386;&#x7684;&#x3002;</p>
<p>&#x904D;&#x5386;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x6709;&#x4E24;&#x4E2A;&#x53EF;&#x9009;&#x53C2;&#x6570;&#xFF0C;&#x5206;&#x522B;&#x662F;&#x952E;&#x540D;&#x548C;&#x7D22;&#x5F15;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;ul&gt;
        &lt;li v-for=&quot;(value,key,index) of users&quot;&gt;
            "{{"index"}}" - "{{"key"}}" - "{{"value"}}"
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(value,key,index) of users&quot;</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"index"}}"</span><span class="xml"> - </span><span class="hljs-template-variable">"{{"key"}}"</span><span class="xml"> - </span><span class="hljs-template-variable">"{{"value"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre>
<p><code>v-for</code>&#x8FD8;&#x53EF;&#x4EE5;&#x8FED;&#x4EE3;&#x6574;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;span v-for=&quot;n in 10&quot;&gt;"{{"n"}}"&lt;/span&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;n in 10&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"n"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre>
<h2 id="articleHeader25">&#x6570;&#x7EC4;&#x66F4;&#x65B0;</h2>
<p>Vue&#x7684;&#x6838;&#x5FC3;&#x662F;&#x6570;&#x636E;&#x4E0E;&#x89C6;&#x56FE;&#x7684;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#xFF0C;&#x5305;&#x542B;&#x4E86;&#x4E00;&#x7EC4;&#x89C2;&#x5BDF;&#x6570;&#x7EC4;&#x53D8;&#x5316;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4F7F;&#x7528;&#x5B83;&#x4EEC;&#x6539;&#x53D8;&#x6570;&#x7EC4;&#x4E5F;&#x4F1A;&#x89E6;&#x53D1;&#x89C6;&#x56FE;&#x66F4;&#x65B0;&#xFF1A;</p>
<ul>
<li><code>push()</code></li>
<li><code>pop()</code></li>
<li><code>shift()</code></li>
<li><code>unshift()</code></li>
<li><code>splice()</code></li>
<li><code>sort()</code></li>
<li><code>reverse()</code></li>
</ul>
<p>&#x4F7F;&#x7528;&#x4EE5;&#x4E0A;&#x65B9;&#x6CD5;&#x4F1A;&#x6539;&#x53D8;&#x88AB;&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x7684;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x3002;</p>
<p>&#x4EE5;&#x4E0B;&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#xFF1A;</p>
<ul>
<li><code>filter()</code></li>
<li><code>concat()</code></li>
<li><code>slice()</code></li>
</ul>
<p>&#x5B83;&#x4EEC;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;&#xFF0C;&#x5728;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x975E;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x65B0;&#x6570;&#x7EC4;&#x6765;&#x66FF;&#x6362;&#x5143;&#x7D20;&#x7EC4;&#x3002;</p>
<p>Vue&#x5728;&#x68C0;&#x6D4B;&#x5230;&#x6570;&#x7EC4;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x6574;&#x4E2A;&#x5217;&#x8868;&#xFF0C;&#x800C;&#x662F;&#x6700;&#x5927;&#x5316;&#x5730;&#x590D;&#x7528;DOM&#x5143;&#x7D20;&#x3002;&#x66FF;&#x6362;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x542B;&#x6709;&#x76F8;&#x540C;&#x5143;&#x7D20;&#x7684;&#x9879;&#x4E0D;&#x4F1A;&#x88AB;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x5927;&#x80C6;&#x5730;&#x7528;&#x65B0;&#x6570;&#x7EC4;&#x6765;&#x66FF;&#x6362;&#x65E7;&#x6570;&#x7EC4;&#xFF0C;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x6027;&#x80FD;&#x95EE;&#x9898;&#x3002;</p>
<p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x4EE5;&#x4E0B;&#x53D8;&#x52A8;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;Vue&#x65F6;&#x4E0D;&#x80FD;&#x68C0;&#x6D4B;&#x5230;&#x7684;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x89C6;&#x56FE;&#x66F4;&#x65B0;&#xFF1A;</p>
<ul>
<li>&#x901A;&#x8FC7;&#x7D22;&#x5F15;&#x76F4;&#x63A5;&#x8BBE;&#x7F6E;&#x9879;&#xFF0C;<code>app.books[3]={}</code>
</li>
<li>&#x4FEE;&#x6539;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;<code>app.books.length=1</code>
</li>
</ul>
<p>&#x89E3;&#x51B3;&#x7B2C;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x53EF;&#x4EE5;&#x7528;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x540C;&#x6837;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x7B2C;&#x4E00;&#x79CD;&#x662F;&#x4F7F;&#x7528;Vue&#x5185;&#x7F6E;&#x7684;<code>set</code>&#x65B9;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.set(app.books, 3, {
    name: &apos;&#x300A;CSS&#x79D8;&#x5BC6;&#x82B1;&#x56ED;&#x300B;&apos;,
    author: &apos;&#x65E0;&#x540D;&#x6C0F;&apos;
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.set</span>(<span class="hljs-selector-tag">app</span><span class="hljs-selector-class">.books</span>, 3, {
    <span class="hljs-attribute">name</span>: <span class="hljs-string">&apos;&#x300A;CSS&#x79D8;&#x5BC6;&#x82B1;&#x56ED;&#x300B;&apos;</span>,
    author: <span class="hljs-string">&apos;&#x65E0;&#x540D;&#x6C0F;&apos;</span>
});
</code></pre>
<p>&#x5982;&#x679C;&#x662F;&#x5728;webpack&#x4E2D;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x5316;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x6CA1;&#x6709;&#x5BFC;&#x5165;Vue&#x7684;&#xFF0C;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>this.$set</code>&#x3002;</p>
<p>&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#xFF1A;<code>app.books.splice(3,1,{})</code></p>
<h2 id="articleHeader26">&#x8FC7;&#x6EE4;&#x4E0E;&#x6392;&#x5E8F;</h2>
<p>&#x5982;&#x679C;&#x4E0D;&#x5E0C;&#x671B;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#xFF0C;&#x60F3;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x526F;&#x672C;&#x6765;&#x505A;&#x8FC7;&#x6EE4;&#x6216;&#x6392;&#x5E8F;&#x7684;&#x663E;&#x793A;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x8FD4;&#x56DE;&#x8FC7;&#x6EE4;&#x6216;&#x6392;&#x5E8F;&#x540E;&#x7684;&#x6570;&#x7EC4;&#x3002;</p>
<h1 id="articleHeader27">&#x65B9;&#x6CD5;&#x4E0E;&#x4E8B;&#x4EF6;</h1>
<p>@click&#x8C03;&#x7528;&#x5F97;&#x65B9;&#x6CD5;&#x540D;&#x540E;&#x53EF;&#x4EE5;&#x4E0D;&#x8DDF;&#x62EC;&#x53F7;<code>()</code>&#xFF0C;&#x5982;&#x679C;&#x8BE5;&#x65B9;&#x6CD5;&#x6709;&#x53C2;&#x6570;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F1A;&#x5C06;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;<code>event</code>&#x4F20;&#x5165;&#x3002;</p>
<p>&#x8FD9;&#x79CD;&#x5728;HTML&#x5143;&#x7D20;&#x4E0A;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x7684;&#x8BBE;&#x8BA1;&#x770B;&#x4F3C;&#x5C06;DOM&#x4E0E;JavaScript&#x7D27;&#x8026;&#x5408;&#xFF0C;&#x8FDD;&#x80CC;&#x5206;&#x79BB;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x5B9E;&#x5219;&#x521A;&#x597D;&#x76F8;&#x53CD;&#x3002;&#x56E0;&#x4E3A;&#x901A;&#x8FC7;HTML&#x5C31;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#x8C03;&#x7528;&#x7684;&#x662F;&#x54EA;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x903B;&#x8F91;&#x4E0E;DOM&#x89E3;&#x8026;&#xFF0C;&#x4FBF;&#x4E8E;&#x7EF4;&#x62A4;&#x3002;</p>
<p><strong>&#x6700;&#x91CD;&#x8981;&#x7684;&#x662F;&#xFF0C;&#x5F53;<code>viewModel</code>&#x9500;&#x6BC1;&#x65F6;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x5668;&#x90FD;&#x4F1A;&#x81EA;&#x52A8;&#x9500;&#x6BC1;&#xFF0C;&#x65E0;&#x9700;&#x81EA;&#x5DF1;&#x5904;&#x7406;&#x3002;</strong></p>
<p>Vue&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x53D8;&#x91CF;<code>$event</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBF;&#x95EE;&#x539F;&#x751F;DOM&#x4E8B;&#x4EF6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;a href=&quot;https://www.apple.com/&quot; @click=&quot;handleClick(&apos;&#x7981;&#x6B62;&#x6253;&#x5F00;&apos;,$event)&quot;&gt;&#x6253;&#x5F00;&#x94FE;&#x63A5;&lt;/a&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://www.apple.com/&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleClick(&apos;&#x7981;&#x6B62;&#x6253;&#x5F00;&apos;,$event)&quot;</span>&gt;</span>&#x6253;&#x5F00;&#x94FE;&#x63A5;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="articleHeader28">&#x4FEE;&#x9970;&#x7B26;</h2>
<p>Vue&#x652F;&#x6301;&#x4EE5;&#x4E0B;&#x4FEE;&#x9970;&#x7B26;&#xFF1A;</p>
<ul>
<li><code>.stop</code></li>
<li><code>.prevent</code></li>
<li><code>.capture</code></li>
<li><code>.self</code></li>
<li><code>.once</code></li>
</ul>
<p>&#x5177;&#x4F53;&#x7528;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p>
<table>
<thead><tr>
<th>&#x4FEE;&#x9970;&#x7B26;&#x529F;&#x80FD;</th>
<th>&#x4F7F;&#x7528;&#x793A;&#x4F8B;</th>
</tr></thead>
<tbody>
<tr>
<td>&#x963B;&#x6B62;&#x5355;&#x51FB;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;</td>
<td><code>&lt;a @click.stop=&quot;handle&quot;&gt;&lt;/a&gt;</code></td>
</tr>
<tr>
<td>&#x63D0;&#x4EA4;&#x4E8B;&#x4EF6;&#x4E0D;&#x518D;&#x91CD;&#x8F7D;&#x9875;&#x9762;</td>
<td><code>&lt;form @submit.prevent=&quot;handle&quot;&gt;&lt;/form&gt;</code></td>
</tr>
<tr>
<td>&#x4FEE;&#x9970;&#x7B26;&#x53EF;&#x4EE5;&#x4E32;&#x8054;</td>
<td><code>&lt;a @click.stop.prevent=&quot;handle&quot;&gt;&lt;/a&gt;</code></td>
</tr>
<tr>
<td>&#x53EA;&#x6709;&#x4FEE;&#x9970;&#x7B26;</td>
<td><code>&lt;form @submit.prevent&gt;&lt;/form&gt;</code></td>
</tr>
<tr>
<td>&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x4FA6;&#x542C;&#x5668;&#x65F6;&#x4F7F;&#x7528;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x6A21;&#x5F0F;</td>
<td><code>&lt;div @click.capture=&quot;handle&quot;&gt;...&lt;/div&gt;</code></td>
</tr>
<tr>
<td>&#x53EA;&#x5F53;&#x4E8B;&#x4EF6;&#x5728;&#x8BE5;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#xFF08;&#x4E0D;&#x662F;&#x5B50;&#x5143;&#x7D20;&#xFF09;&#x89E6;&#x53D1;&#x65F6;&#x6267;&#x884C;&#x56DE;&#x8C03;</td>
<td><code>&lt;div @click.self=&quot;handle&quot;&gt;...&lt;/div&gt;</code></td>
</tr>
<tr>
<td>&#x53EA;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#xFF0C;&#x7EC4;&#x4EF6;&#x540C;&#x6837;&#x9002;&#x7528;</td>
<td><code>&lt;div @click.once=&quot;handle&quot;&gt;...&lt;/div&gt;</code></td>
</tr>
</tbody>
</table>
<p>&#x5728;&#x8868;&#x5355;&#x5143;&#x7D20;&#x4E0A;&#x76D1;&#x542C;&#x952E;&#x76D8;&#x4E8B;&#x4EF6;&#x65F6;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6309;&#x952E;&#x4FEE;&#x9970;&#x7B26;&#x3002;</p>
<table>
<thead><tr>
<th>&#x4FEE;&#x9970;&#x7B26;&#x529F;&#x80FD;</th>
<th>&#x4F7F;&#x7528;&#x793A;&#x4F8B;</th>
</tr></thead>
<tbody><tr>
<td>&#x53EA;&#x6709;&#x5728;<code>keyCode</code>&#x662F;<code>13</code>&#x65F6;&#x8C03;&#x7528;<code>vm.submit()</code>
</td>
<td><code>&lt;input @keyup.13=&quot;submit&quot;&gt;</code></td>
</tr></tbody>
</table>
<p>&#x9664;&#x4E86;&#x5177;&#x4F53;&#x7684;&#x67D0;&#x4E2A;<code>keyCode</code>&#x5916;&#xFF0C;Vue&#x8FD8;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E9B;&#x5FEB;&#x6377;&#x540D;&#x79F0;&#xFF1A;</p>
<ul>
<li><code>.enter</code></li>
<li><code>.tab</code></li>
<li>
<code>.delete</code>&#xFF08;&#x8865;&#x8D27;&#x201C;&#x5220;&#x9664;&#x201D;&#x548C;&#x201C;&#x9000;&#x683C;&#x201D;&#x952E;&#xFF09;</li>
<li><code>.esc</code></li>
<li><code>.space</code></li>
<li><code>.up</code></li>
<li><code>.down</code></li>
<li><code>.left</code></li>
<li><code>.right</code></li>
</ul>
<p>&#x8FD9;&#x4E9B;&#x6309;&#x952E;&#x4FEE;&#x9970;&#x7B26;&#x4E5F;&#x53EF;&#x4EE5;&#x7EC4;&#x5408;&#x4F7F;&#x7528;&#xFF0C;&#x6216;&#x548C;&#x9F20;&#x6807;&#x4E00;&#x8D77;&#x914D;&#x5408;&#x4F7F;&#x7528;&#xFF1A;</p>
<ul>
<li><code>.ctrl</code></li>
<li><code>.alt</code></li>
<li><code>.shift</code></li>
<li><code>.meta</code></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue基础

## 原文链接
[https://segmentfault.com/a/1190000015125866](https://segmentfault.com/a/1190000015125866)


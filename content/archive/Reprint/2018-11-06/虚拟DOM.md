---
title: 虚拟DOM
hidden: true
categories: [reprint]
slug: f78772e0
date: 2018-11-06 15:28:31
---

{{< raw >}}
<h1 id="articleHeader0">&#x865A;&#x62DF;DOM</h1><p>&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x8FD9;&#x4E2A;&#x6587;&#x7AE0;<br>&#x5982;&#x4F55;&#x7406;&#x89E3;&#x865A;&#x62DF;DOM&#xFF1F; - &#x6234;&#x5609;&#x534E;&#x7684;&#x56DE;&#x7B54; - &#x77E5;&#x4E4E;</p><p><a href="https://www.zhihu.com/question/29504639/answer/73607810" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a></p><p><a href="https://github.com/livoras/blog/issues/13" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5EA6;&#x5256;&#x6790;&#xFF1A;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; Virtual DOM &#x7B97;&#x6CD5; #13</a></p><h2 id="articleHeader1">&#x662F;&#x4EC0;&#x4E48;</h2><h3 id="articleHeader2">&#x4EC0;&#x4E48;&#x662F;DOM&#xFF1F;</h3><p>DOM &#x662F; JavaScript &#x64CD;&#x4F5C;&#x7F51;&#x9875;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x5168;&#x79F0;&#x4E3A;&#x201C;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x6A21;&#x578B;&#x201D;&#xFF08;Document Object Model&#xFF09;&#x3002;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5C06;&#x7F51;&#x9875;&#x8F6C;&#x4E3A;&#x4E00;&#x4E2A; JavaScript &#x5BF9;&#x8C61;&#xFF0C;&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x7528;&#x811A;&#x672C;&#x8FDB;&#x884C;&#x5404;&#x79CD;&#x64CD;&#x4F5C;&#xFF08;&#x6BD4;&#x5982;&#x589E;&#x5220;&#x5185;&#x5BB9;&#xFF09;&#x3002;<br>DOM&#x5C31;&#x662F;&#x5C06;&#x7F51;&#x9875;&#x8F6C;&#x5316;&#x4E3A;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5E76;&#x63D0;&#x4F9B;&#x64CD;&#x4F5C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x63A5;&#x53E3;(&#x5373;&#x64CD;&#x4F5C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;)&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;DOM&#x5BF9;&#x7F51;&#x9875;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x3002;&#x5982;&#x5BF9;&#x67D0;&#x4E2A;&#x8282;&#x70B9;&#x589E;&#x52A0;&#x5C5E;&#x6027;&#xFF0C;&#x589E;&#x52A0;&#x5B69;&#x5B50;&#xFF0C;&#x5220;&#x9664;&#x7B49;&#x3002;<br>DOM&#x5C31;&#x662F;&#x7F51;&#x9875;&#x91CC;&#x4F60;&#x770B;&#x5F97;&#x89C1;&#x7684;&#x5BF9;&#x5E94;&#x7684;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x3002;</p><h3 id="articleHeader3">&#x4EC0;&#x4E48;&#x662F;&#x865A;&#x62DF;DOM&#xFF1F;</h3><p>&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;&#xFF1A;&#x5982;&#x679C;&#x7F51;&#x9875;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x8868;&#x683C;&#xFF0C;&#x8868;&#x5934;&#x662F;&#x59D3;&#x540D;&#xFF0C;&#x5E74;&#x7EA7;&#xFF0C;&#x5206;&#x6570;&#x3002;&#x5982;&#x679C;&#x6211;&#x5E0C;&#x671B;&#x70B9;&#x51FB;&#x59D3;&#x540D;&#x8868;&#x683C;&#x5C31;&#x6309;&#x7167;&#x5B57;&#x5178;&#x5E8F;&#x6392;&#x5E8F;&#xFF0C;&#x70B9;&#x51FB;&#x5E74;&#x7EA7;&#xFF0C;&#x6309;&#x7167;&#x5E74;&#x7EA7;&#x4ECE;&#x5927;&#x5230;&#x5C0F;&#x6392;&#x5E8F;&#x7B49;&#x7B49;&#x64CD;&#x4F5C;&#xFF0C;&#x90A3;&#x4E48;&#x5982;&#x679C;&#x76F4;&#x63A5;&#x53BB;&#x64CD;&#x4F5C;DOM&#x7684;&#x8BDD;&#x5C31;&#x5F88;&#x96BE;&#x5B9E;&#x73B0;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x6211;&#x4EEC;&#x5220;&#x9664;&#x4E86;&#x4E00;&#x4E2A;DOM&#x7ED3;&#x70B9;&#xFF0C;&#x6216;&#x8005;&#x65B0;&#x589E;&#x4E86;&#x4E00;&#x6761;&#x6570;&#x636E;&#xFF0C;&#x90A3;&#x4E48;&#x91CD;&#x65B0;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#xFF0C;&#x5C31;&#x4F1A;&#x5220;&#x9664;&#x6240;&#x6709;DOM&#x7136;&#x540E;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x4E00;&#x904D;DOM&#x3002;&#x5982;&#x679C;&#x6570;&#x636E;&#x5F88;&#x591A;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x4F1A;&#x5F88;&#x6D6A;&#x8D39;&#x8D44;&#x6E90;&#xFF0C;&#x5F71;&#x54CD;&#x7F51;&#x9875;&#x7684;&#x6027;&#x80FD;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x5361;&#x987F;&#x3002;</p><p>&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x5361;&#x987F;&#x5462;&#xFF1F;&#x662F;&#x56E0;&#x4E3A;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x5143;&#x7D20;&#x5B9E;&#x9645;&#x4E0A;&#x5305;&#x542B;&#x5F88;&#x591A;&#x5C5E;&#x6027;&#x65B9;&#x6CD5;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;DOM&#x5C31;&#x5305;&#x542B;&#x4E0A;&#x767E;&#x6761;&#x6570;&#x636E;&#xFF0C;&#x52A0;&#x8F7D;&#x4E0A;&#x7ED1;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x7B49;&#x3002;&#x6027;&#x80FD;&#x5F00;&#x9500;&#x5F88;&#x5927;&#x3002;<br>&#x6211;&#x53EF;&#x4EE5;&#x6839;&#x636E;DOM&#x7ED3;&#x6784;&#xFF0C;&#x7136;&#x540E;&#x81EA;&#x5DF1;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x81EA;&#x5DF1;&#x521B;&#x5EFA;&#x7684;&#x8FD9;&#x4E2A;DOM&#x548C;&#x771F;&#x5B9E;&#x7684;DOM &#x662F;&#x4E00;&#x4E00;&#x6620;&#x5C04;&#x7684;&#x3002;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x64CD;&#x4F5C;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x64CD;&#x4F5C;&#x81EA;&#x5DF1;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x6570;&#x636E;&#x91CF;&#x5F88;&#x5C0F;&#xFF0C;&#x4E0D;&#x7BA1;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#x6216;&#x5176;&#x4ED6;&#x5904;&#x7406;&#x90FD;&#x4F1A;&#x5F88;&#x8FC5;&#x901F;&#x3002;&#x5904;&#x7406;&#x597D;&#x4E4B;&#x540E;&#xFF0C;&#x518D;&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x628A;&#x5B83;&#x53D8;&#x4E3A;&#x771F;&#x5B9E;&#x7684;DOM&#x3002;<br>&#x5373;&#x6211;&#x4EEC;&#x7528;&#x865A;&#x62DF;&#x7684;DOM&#x7ED3;&#x6784;&#x66FF;&#x6362;&#x9700;&#x8981;&#x5904;&#x7406;&#x7684;DOM&#x7ED3;&#x6784;&#xFF0C;&#x5BF9;&#x865A;&#x62DF;&#x7684;DOM &#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x4E4B;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#xFF0C;&#x5C31;&#x6210;&#x4E3A;&#x4E86;&#x771F;&#x5B9E;&#x7684;&#x6570;&#x636E;&#x3002;</p><h2 id="articleHeader4">&#x6709;&#x4EC0;&#x4E48;&#x7528;</h2><p>&#x8FD9;&#x6837;&#x7684;&#x597D;&#x5904;&#x662F;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;DOM&#x7ED3;&#x70B9;&#x8FDB;&#x884C;&#x6539;&#x53D8;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x67E5;&#x770B;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x521B;&#x5EFA;&#x7684;&#x865A;&#x62DF;DOM&#xFF0C;&#x770B;&#x770B;&#x5176;&#x4E2D;&#x54EA;&#x6761;&#x6570;&#x636E;&#x53D1;&#x751F;&#x4E86;&#x6539;&#x53D8;&#xFF0C;&#x7136;&#x540E;&#x4FEE;&#x6539;&#x865A;&#x62DF;DOM&#xFF0C;&#x5E76;&#x628A;&#x5B83;&#x6E32;&#x67D3;&#x6210;&#x771F;&#x5B9E;&#x7684;&#x6570;&#x636E;&#x5373;&#x53EF;&#x3002;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x672C;&#x6765;&#x5C31;&#x6709;500&#x6761;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x9700;&#x8981;&#x6DFB;&#x52A0;10&#x6761;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x53EA;&#x6DFB;&#x52A0;10&#x6761;&#x65B0;&#x7684;&#x865A;&#x62DF;DOM&#xFF0C;&#x7136;&#x540E;&#x518D;&#x628A;&#x8FD9;10&#x6761;&#x865A;&#x62DF;DOM&#x8F6C;&#x5316;&#x4E3A;&#x771F;&#x5B9E;&#x7684;DOM&#x5373;&#x53EF;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x4ECE;&#x65B0;&#x5427;510&#x8DF3;&#x5168;&#x90E8;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x4E00;&#x904D;&#x3002;&#x8FD9;&#x6837;&#x6027;&#x80FD;&#x4F1A;&#x63D0;&#x5347;&#x3002;</p><p>&#x6240;&#x8C13;&#x7684;&#x865A;&#x62DF;DOM&#x5B9E;&#x9645;&#x4E0A;<strong>&#x5C31;&#x662F;</strong>&#x6211;&#x4EEC;&#x6839;&#x636E;&#x771F;&#x5B9E;&#x7684;DOM&#x7ED3;&#x6784;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x548C;&#x771F;&#x5B9E;DOM&#x6620;&#x5C04;&#x7684;&#x4E00;&#x4E2A;<strong>&#x6570;&#x636E;&#x7ED3;&#x6784;</strong>&#xFF0C;&#x7136;&#x540E;&#x5BF9;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x6700;&#x540E;&#x628A;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x53CD;&#x6620;&#x5230;&#x771F;&#x5B9E;&#x7684;DOM&#x4E2D;&#x3002;</p><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x903B;&#x8F91;&#x4E0A;&#x628A;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6E32;&#x67D3;&#x6210;&#x771F;&#x5B9E;&#x7684;DOM&#xFF0C;&#x4ED6;&#x5728;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x4E0A;&#x548C;&#x771F;&#x5B9E;DOM&#x662F;&#x5DEE;&#x4E0D;&#x591A;&#x7684;</p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6765;&#x6620;&#x5C04;DOM(<strong>&#x7528;JS&#x5BF9;&#x8C61;&#x6A21;&#x62DF;DOM&#x6811;</strong>)&#xFF1A;<br>&#x6211;&#x4EEC;&#x5C06;&#x8282;&#x70B9;&#x7528;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x6765;&#x8868;&#x793A;&#xFF0C;tag&#x5C5E;&#x6027;&#x8868;&#x793A;&#x4ED6;&#x7684;&#x79CD;&#x7C7B;&#xFF0C;children&#x5C5E;&#x6027;&#x8868;&#x793A;&#x4ED6;&#x62E5;&#x6709;&#x7684;&#x513F;&#x5B50;&#x6570;&#x7EC4;&#x3002;&#x90A3;&#x4E48;&#xFF1A;<br><span class="img-wrap"><img data-src="https://image-static.segmentfault.com/487/449/487449709-5badda57b017f_articlex" src="https://static.alili.techhttps://image-static.segmentfault.com/487/449/487449709-5badda57b017f_articlex" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x5C31;&#x662F;&#x865A;&#x62DF;&#x7684;DOM&#xFF0C;&#x4F53;&#x79EF;&#x5F88;&#x8F7B;&#x91CF;&#xFF0C;&#x6CA1;&#x6709;&#x6240;&#x6709;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x63A5;&#x53E3;!&#x7528;&#x6765;&#x64CD;&#x4F5C;&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x9700;&#x8981;&#x8017;&#x8D39;&#x5F88;&#x9AD8;&#x7684;&#x6027;&#x80FD;&#x3002;<br>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset=&quot;utf-8&quot;&gt;
  &lt;title&gt;JS Bin&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;!--   &lt;div&gt;
    &lt;p&gt;&lt;span&gt;xiedaimala.com&lt;/span&gt;&lt;/p&gt;
    &lt;span&gt;jirengu.coms&lt;/span&gt;
  &lt;/div&gt; --&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-comment">&lt;!--   &lt;div&gt;
    &lt;p&gt;&lt;span&gt;xiedaimala.com&lt;/span&gt;&lt;/p&gt;
    &lt;span&gt;jirengu.coms&lt;/span&gt;
  &lt;/div&gt; --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let nodesData = {
  tag: &apos;div&apos;,
  children: [
    {
      tag: &apos;p&apos;,
      children: [
        {
          tag: &apos;span&apos;,
          children: [
            {
              tag: &apos;#text&apos;,
              text: &apos;xiedaimala.com&apos;
            }
          ]
        }
      ]
    },
    {
      tag: &apos;span&apos;,
        children: [
          {
            tag: &apos;#text&apos;,
            text: &apos;jirengu.com&apos;
          }
        ]
    }
  ]
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code><span class="hljs-keyword">let</span> nodesData = {
  <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;div&apos;</span>,
  children: [
    {
      <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;p&apos;</span>,
      children: [
        {
          <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;span&apos;</span>,
          children: [
            {
              <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;#text&apos;</span>,
              tex<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;xiedaimala.com&apos;</span>
            }
          ]
        }
      ]
    },
    {
      <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;span&apos;</span>,
        children: [
          {
            <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;#text&apos;</span>,
            tex<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;jirengu.com&apos;</span>
          }
        ]
    }
  ]
}
</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x5C06;&#x8FD9;&#x4E2A;&#x865A;&#x62DF;&#x7684;DOM&#x6E32;&#x67D3;&#x6210;&#x771F;&#x5B9E;&#x7684;DOM&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x4F8B;&#x5982;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x6E32;&#x67D3;DOM&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createElement (data){
    
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElement</span> <span class="hljs-params">(data)</span></span>{
    
}</code></pre><p>&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;&#x865A;&#x62DF;DOM&#x7684;&#x4F5C;&#x7528;&#xFF1A;<br>&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x4FEE;&#x6539;&#x4E86;DOM&#xFF0C;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x5C06;<code>div</code>&#x4E2D;&#x7684;<code>p</code>&#x6807;&#x7B7E;&#x4E2D;<code>span</code>&#x6807;&#x7B7E;&#x7684;&#x5185;&#x5BB9;&#x7531;<code>xiedaimala.com</code>&#x4FEE;&#x6539;&#x4E3A;<code>baidu.com</code>&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x4E2D;&#x7684;<code>span</code>&#x6807;&#x7B7E;<code>text</code>&#x90A3;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x539F;&#x6765;&#x5185;&#x5B58;&#x4E2D;&#x7684;<code>nodesData</code>&#x4E0E;&#x4FEE;&#x6539;&#x540E;&#x7684;<code>nodesData2</code>&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let nodesData2 = {
  tag: &apos;div&apos;,
  children: [
    {
      tag: &apos;p&apos;,
      children: [
        {
          tag: &apos;span&apos;,
          children: [
            {
              tag: &apos;#text&apos;,
              text: &apos;baidu.com&apos;//&#x8FD9;&#x91CC;&#x53D8;&#x4E86;
            }
          ]
        }
      ]
    },
    {
      tag: &apos;span&apos;,
        children: [
          {
            tag: &apos;#text&apos;,
            text: &apos;jirengu.com&apos;
          }
        ]
    }
  ]
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code><span class="hljs-keyword">let</span> nodesData2 = {
  <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;div&apos;</span>,
  children: [
    {
      <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;p&apos;</span>,
      children: [
        {
          <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;span&apos;</span>,
          children: [
            {
              <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;#text&apos;</span>,
              tex<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;baidu.com&apos;</span>//&#x8FD9;&#x91CC;&#x53D8;&#x4E86;
            }
          ]
        }
      ]
    },
    {
      <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;span&apos;</span>,
        children: [
          {
            <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;#text&apos;</span>,
            tex<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;jirengu.com&apos;</span>
          }
        ]
    }
  ]
}
</code></pre><p>&#x53D1;&#x73B0;<code>span</code>&#x6807;&#x7B7E;&#x7684;<code>text</code>&#x5185;&#x5BB9;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5728;&#x4FEE;&#x6539;&#x771F;&#x5B9E;DOM&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x9700;&#x8981;&#x628A;&#x6240;&#x6709;&#x7684;&#x771F;&#x5B9E;DOM&#x7684;&#x5F88;&#x591A;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x90FD;&#x68C0;&#x7D22;&#x4E00;&#x904D;&#xFF0C;&#x7136;&#x540E;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x4E00;&#x904D;&#xFF0C;&#x800C;&#x53EA;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x5728;&#x865A;&#x62DF;DOM&#x4E2D;&#x6BD4;&#x8F83;&#x51FA;&#x6765;&#x7684;&#x4FEE;&#x6539;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5373;&#x53EA;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x6E32;&#x67D3;<code>text</code>&#x90E8;&#x5206;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x4E3A;<br><a>&#x6DF1;&#x5EA6;&#x5256;&#x6790;&#xFF1A;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; Virtual DOM &#x7B97;&#x6CD5; #13</a>&#x6587;&#x7AE0;&#x4E2D;&#x7684;&#x4E00;&#x6BB5;&#x89E3;&#x91CA;</p><blockquote>&#x65E2;&#x7136;&#x539F;&#x6765; DOM &#x6811;&#x7684;&#x4FE1;&#x606F;&#x90FD;&#x53EF;&#x4EE5;&#x7528; JavaScript &#x5BF9;&#x8C61;&#x6765;&#x8868;&#x793A;&#xFF0C;&#x53CD;&#x8FC7;&#x6765;&#xFF0C;&#x4F60;&#x5C31;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x7528; JavaScript &#x5BF9;&#x8C61;&#x8868;&#x793A;&#x7684;&#x6811;&#x7ED3;&#x6784;&#x6765;&#x6784;&#x5EFA;&#x4E00;&#x68F5;&#x771F;&#x6B63;&#x7684;DOM&#x6811;&#x3002;<p>&#x4E4B;&#x524D;&#x7684;&#x7AE0;&#x8282;&#x6240;&#x8BF4;&#x7684;&#xFF0C;&#x72B6;&#x6001;&#x53D8;&#x66F4;-&gt;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x6574;&#x4E2A;&#x89C6;&#x56FE;&#x7684;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x7A0D;&#x5FAE;&#x4FEE;&#x6539;&#x4E00;&#x4E0B;&#xFF1A;&#x7528; JavaScript &#x5BF9;&#x8C61;&#x8868;&#x793A; DOM &#x4FE1;&#x606F;&#x548C;&#x7ED3;&#x6784;&#xFF0C;<strong>&#x5F53;&#x72B6;&#x6001;&#x53D8;&#x66F4;&#x7684;&#x65F6;&#x5019;</strong>&#xFF0C;<strong>&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x8FD9;&#x4E2A; JavaScript &#x7684;&#x5BF9;&#x8C61;&#x7ED3;&#x6784;</strong>&#x3002;&#x5F53;&#x7136;&#x8FD9;&#x6837;&#x505A;&#x5176;&#x5B9E;&#x6CA1;&#x4EC0;&#x4E48;&#x5375;&#x7528;&#xFF0C;&#x56E0;&#x4E3A;&#x771F;&#x6B63;&#x7684;&#x9875;&#x9762;&#x5176;&#x5B9E;&#x6CA1;&#x6709;&#x6539;&#x53D8;&#x3002;</p><p>&#x4F46;&#x662F;&#x53EF;&#x4EE5;<strong>&#x7528;&#x65B0;&#x6E32;&#x67D3;&#x7684;&#x5BF9;&#x8C61;&#x6811;&#x53BB;&#x548C;&#x65E7;&#x7684;&#x6811;&#x8FDB;&#x884C;&#x5BF9;&#x6BD4;</strong>&#xFF0C;&#x8BB0;&#x5F55;&#x8FD9;&#x4E24;&#x68F5;&#x6811;&#x5DEE;&#x5F02;&#x3002;<strong>&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#x7684;&#x4E0D;&#x540C;</strong>&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x9700;&#x8981;<strong>&#x5BF9;&#x9875;&#x9762;&#x771F;&#x6B63;&#x7684; DOM &#x64CD;&#x4F5C;</strong>&#xFF0C;&#x7136;&#x540E;&#x628A;&#x5B83;&#x4EEC;&#x5E94;&#x7528;&#x5728;&#x771F;&#x6B63;&#x7684; DOM &#x6811;&#x4E0A;&#xFF0C;&#x9875;&#x9762;&#x5C31;&#x53D8;&#x66F4;&#x4E86;&#x3002;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#xFF1A;&#x89C6;&#x56FE;&#x7684;&#x7ED3;&#x6784;&#x786E;&#x5B9E;&#x662F;&#x6574;&#x4E2A;&#x5168;&#x65B0;&#x6E32;&#x67D3;&#x4E86;&#xFF0C;&#x4F46;&#x662F;<strong>&#x6700;&#x540E;&#x64CD;&#x4F5C;DOM&#x7684;&#x65F6;&#x5019;&#x786E;&#x5B9E;&#x53EA;&#x53D8;&#x66F4;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x5730;&#x65B9;</strong>&#x3002;</p></blockquote><h2 id="articleHeader5">&#x5982;&#x4F55;&#x5B9E;&#x73B0;</h2><p>&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#xFF1A;</p><h3 id="articleHeader6">&#x865A;&#x62DF;DOM&#x6E32;&#x67D3;&#x4E3A;&#x771F;&#x5B9E;DOM</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/**
 * @author ruoyu
 * @description &#x865A;&#x62DF; DOM Demo
 * @todo &#x6682;&#x65F6;&#x4E0D;&#x8003;&#x8651;&#x590D;&#x6742;&#x60C5;&#x51B5;
 */

class VNode {
  constructor(tag, children, text) {
    this.tag = tag
    this.text = text
    this.children = children
  }

  render() {
    if(this.tag === &apos;#text&apos;) {
      return document.createTextNode(this.text)
    }
    let el = document.createElement(this.tag)
    this.children.forEach(vChild =&gt; {
      el.appendChild(vChild.render())
    })
    return el
  }
}

/*&#x4EE5;&#x4E0A;&#x4E3A;ES6&#x5199;&#x6CD5;,&#x6539;&#x4E3A;ES5&#x5199;&#x6CD5;&#x4E3A;:*/
/*******
function VNode() {
    this.tag = tag
    this.text = text
    this.children = children
}
VNode.prototype.render = function() {
    if(this.tag === &apos;#text&apos;) {
      return document.createTextNode(this.text)
    }
    let el = document.createElement(this.tag)
    this.children.forEach(vChild =&gt; {
      el.appendChild(vChild.render())//&#x9012;&#x5F52;&#x751F;&#x6210;&#x5B50;&#x8282;&#x70B9;
    })
    return el
}  
******
&#x8FD9;&#x51E0;&#x53E5;&#x4EE3;&#x7801;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5C06;js&#x5BF9;&#x8C61;&#x8868;&#x793A;&#x7684;&#x865A;&#x62DF;DOM&#x6E32;&#x67D3;&#x4E3A;&#x771F;&#x5B9E;&#x7684;DOM
*/

/*&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x4F20;&#x5165;&#x51E0;&#x4E2A;&#x53C2;&#x6570;,&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;*/
function v(tag, children, text) {
  if(typeof children === &apos;string&apos;) {
    text = children
    children = []
  }
  return new VNode(tag, children, text)
}


/*  &#x8FD9;&#x91CC;&#x662F;js&#x5BF9;&#x8C61;&#x865A;&#x62DF;dom&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;

let nodesData = {
  tag: &apos;div&apos;,
  children: [
    {
      tag: &apos;p&apos;,
      children: [
        {
          tag: &apos;span&apos;,
          children: [
            {
              tag: &apos;#text&apos;,
              text: &apos;xiedaimala.com&apos;
            }
          ]
        }
      ]
    },
    {
      tag: &apos;span&apos;,
        children: [
          {
            tag: &apos;#text&apos;,
            text: &apos;jirengu.com&apos;
          }
        ]
    }
  ]
}

 */

/*&#x4F7F;&#x7528;v&#x51FD;&#x6570;&#x5C06;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#x8F6C;&#x5316;&#x4E3A;&#x5BF9;&#x8C61;&#x5E76;&#x8FD4;&#x56DE;*/
let vNodes = v(&apos;div&apos;, [
      v(&apos;p&apos;, [
        v(&apos;span&apos;, [ v(&apos;#text&apos;, &apos;xiedaimala.com&apos;) ] )
        ]
      ),
      v(&apos;span&apos;, [
        v(&apos;#text&apos;,  &apos;jirengu.com&apos;)
        ])
    ]
  )
/*&#x6E32;&#x67D3;&#x4E3A;&#x771F;&#x5B9E;&#x7684;DOM*/
console.log(vNodes) /*&#x4E0B;&#x65B9;&#x6709;&#x6253;&#x5370;&#x7684;&#x7ED3;&#x679C;*/
console.log(vNodes.render())


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>
/**
 * @author ruoyu
 * @description &#x865A;&#x62DF; DOM Demo
 * @todo &#x6682;&#x65F6;&#x4E0D;&#x8003;&#x8651;&#x590D;&#x6742;&#x60C5;&#x51B5;
 */

class VNode {
  constructor(<span class="hljs-keyword">tag</span>, children, text) {
    this.<span class="hljs-keyword">tag</span> = <span class="hljs-keyword">tag</span>
    this.text = text
    this.children = children
  }

  render() {
    <span class="hljs-keyword">if</span>(this.<span class="hljs-keyword">tag</span> === <span class="hljs-string">&apos;#text&apos;</span>) {
      <span class="hljs-keyword">return</span> document.createTextNode(this.text)
    }
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">el</span> = document.createElement(this.<span class="hljs-keyword">tag</span>)
    this.children.forEach(vChild =&gt; {
      <span class="hljs-keyword">el</span>.appendChild(vChild.render())
    })
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">el</span>
  }
}

/*&#x4EE5;&#x4E0A;&#x4E3A;ES6&#x5199;&#x6CD5;,&#x6539;&#x4E3A;ES5&#x5199;&#x6CD5;&#x4E3A;:*/
/*******
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">VNode</span><span class="hljs-params">()</span> {</span>
    this.<span class="hljs-keyword">tag</span> = <span class="hljs-keyword">tag</span>
    this.text = text
    this.children = children
}
VNode.prototype.render = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
    <span class="hljs-keyword">if</span>(this.<span class="hljs-keyword">tag</span> === <span class="hljs-string">&apos;#text&apos;</span>) {
      <span class="hljs-keyword">return</span> document.createTextNode(this.text)
    }
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">el</span> = document.createElement(this.<span class="hljs-keyword">tag</span>)
    this.children.forEach(vChild =&gt; {
      <span class="hljs-keyword">el</span>.appendChild(vChild.render())//&#x9012;&#x5F52;&#x751F;&#x6210;&#x5B50;&#x8282;&#x70B9;
    })
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">el</span>
}  
******
&#x8FD9;&#x51E0;&#x53E5;&#x4EE3;&#x7801;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5C06;js&#x5BF9;&#x8C61;&#x8868;&#x793A;&#x7684;&#x865A;&#x62DF;DOM&#x6E32;&#x67D3;&#x4E3A;&#x771F;&#x5B9E;&#x7684;DOM
*/

/*&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x4F20;&#x5165;&#x51E0;&#x4E2A;&#x53C2;&#x6570;,&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;*/
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">v</span><span class="hljs-params">(tag, children, text)</span> {</span>
  <span class="hljs-keyword">if</span>(typeof children === <span class="hljs-string">&apos;string&apos;</span>) {
    text = children
    children = []
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> VNode(<span class="hljs-keyword">tag</span>, children, text)
}


/*  &#x8FD9;&#x91CC;&#x662F;js&#x5BF9;&#x8C61;&#x865A;&#x62DF;dom&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;

<span class="hljs-keyword">let</span> nodesData = {
  <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;div&apos;</span>,
  children: [
    {
      <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;p&apos;</span>,
      children: [
        {
          <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;span&apos;</span>,
          children: [
            {
              <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;#text&apos;</span>,
              tex<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;xiedaimala.com&apos;</span>
            }
          ]
        }
      ]
    },
    {
      <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;span&apos;</span>,
        children: [
          {
            <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">&apos;#text&apos;</span>,
            tex<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;jirengu.com&apos;</span>
          }
        ]
    }
  ]
}

 */

/*&#x4F7F;&#x7528;v&#x51FD;&#x6570;&#x5C06;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#x8F6C;&#x5316;&#x4E3A;&#x5BF9;&#x8C61;&#x5E76;&#x8FD4;&#x56DE;*/
<span class="hljs-keyword">let</span> vNodes = v(<span class="hljs-string">&apos;div&apos;</span>, [
      v(<span class="hljs-string">&apos;p&apos;</span>, [
        v(<span class="hljs-string">&apos;span&apos;</span>, [ v(<span class="hljs-string">&apos;#text&apos;</span>, <span class="hljs-string">&apos;xiedaimala.com&apos;</span>) ] )
        ]
      ),
      v(<span class="hljs-string">&apos;span&apos;</span>, [
        v(<span class="hljs-string">&apos;#text&apos;</span>,  <span class="hljs-string">&apos;jirengu.com&apos;</span>)
        ])
    ]
  )
/*&#x6E32;&#x67D3;&#x4E3A;&#x771F;&#x5B9E;&#x7684;DOM*/
console.<span class="hljs-built_in">log</span>(vNodes) /*&#x4E0B;&#x65B9;&#x6709;&#x6253;&#x5370;&#x7684;&#x7ED3;&#x679C;*/
console.<span class="hljs-built_in">log</span>(vNodes.render())


</code></pre><p>&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#x6253;&#x5370;&#x7684;&#x7ED3;&#x679C;</p><p><span class="img-wrap"><img data-src="https://image-static.segmentfault.com/102/943/1029439282-5bae17d454dc1_articlex" src="https://static.alili.techhttps://image-static.segmentfault.com/102/943/1029439282-5bae17d454dc1_articlex" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><hr><p><span class="img-wrap"><img data-src="https://image-static.segmentfault.com/385/007/3850071421-5bae18960bf3f_articlex" src="https://static.alili.techhttps://image-static.segmentfault.com/385/007/3850071421-5bae18960bf3f_articlex" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader7">DOM&#x6570;&#x636E;&#x66F4;&#x65B0;</h3><p>&#x4EE5;&#x4E0B;&#x4EC5;&#x4E3A;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#xFF0C;&#x662F;&#x4E3A;&#x4E86;&#x7406;&#x89E3;&#x539F;&#x7406;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x8981;&#x60F3;&#x505A;&#x5230;&#x5F88;&#x5B8C;&#x7F8E;&#x7684;&#x865A;&#x62DF;DOM&#xFF0C;&#x9700;&#x8981;&#x8003;&#x8651;&#x5F88;&#x591A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function patchElement(parent, newVNode, oldVNode, index = 0) {
  if(!oldVNode) {//&#x5982;&#x679C;&#x6CA1;&#x6709;,&#x76F4;&#x63A5;&#x521B;&#x5EFA;&#x65B0;&#x7684;DOM,&#x4F8B;&#x5982;patchElement(root, vNodes1)
    parent.appendChild(newVNode.render())
  } else if(!newVNode) {//&#x5220;&#x9664;DOM&#x7684;&#x64CD;&#x4F5C;,&#x4F8B;&#x5982;patchElement(root)
    parent.removeChild(parent.childNodes[index])
  } else if(newVNode.tag !== oldVNode.tag || newVNode.text !== oldVNode.text)//&#x66FF;&#x6362;(&#x4FEE;&#x6539;)DOM&#x64CD;&#x4F5C;,&#x4F8B;&#x5982;&#x4E24;&#x4E2A;VNode&#x6BD4;&#x8F83;&#x7B80;&#x5355;,&#x7136;&#x540E;&#x4E92;&#x76F8;&#x6BD4;&#x8F83;
 {
    parent.replaceChild(newVNode.render(), parent.childNodes[index])
  }  else {//&#x9012;&#x5F52;&#x66FF;&#x6362;&#x5B69;&#x5B50;DOM,&#x9012;&#x5F52;&#x6BD4;&#x8F83;
    for(let i = 0; i &lt; newVNode.children.length || i &lt; oldVNode.children.length; i++) {
      patchElement(parent.childNodes[index], newVNode.children[i], oldVNode.children[i], i)
    }
  }
}



let vNodes1 = v(&apos;div&apos;, [
      v(&apos;p&apos;, [
        v(&apos;span&apos;, [ v(&apos;#text&apos;, &apos;xiedaimala.com&apos;) ] )
        ]
      ),
      v(&apos;span&apos;, [
        v(&apos;#text&apos;,  &apos;jirengu.com&apos;)
        ])
    ]
  )

let vNodes2 = v(&apos;div&apos;, [
      v(&apos;p&apos;, [
        v(&apos;span&apos;, [ 
          v(&apos;#text&apos;, &apos;xiedaimala.com&apos;) 
          ] )
        ]
      ),
      v(&apos;span&apos;, [
        v(&apos;#text&apos;,  &apos;jirengu.coms&apos;),
        v(&apos;#text&apos;,  &apos;ruoyu&apos;)
        ])
    ]
  )
const root = document.querySelector(&apos;#root&apos;)

patchElement(root, vNodes1)//&#x521B;&#x5EFA;&#x65B0;&#x7684;DOM,
patchElement(root)//&#x5220;&#x9664;DOM&#x7684;&#x64CD;&#x4F5C;
patchElement(root, vNodes2,vNodes1)//&#x66FF;&#x6362;(&#x4FEE;&#x6539;)DOM&#x64CD;&#x4F5C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patchElement</span></span>(parent, <span class="hljs-keyword">new</span><span class="hljs-type">VNode</span>, oldVNode, index = <span class="hljs-number">0</span>) {
  <span class="hljs-keyword">if</span>(!oldVNode) {<span class="hljs-comment">//&#x5982;&#x679C;&#x6CA1;&#x6709;,&#x76F4;&#x63A5;&#x521B;&#x5EFA;&#x65B0;&#x7684;DOM,&#x4F8B;&#x5982;patchElement(root, vNodes1)</span>
    parent.appendChild(<span class="hljs-keyword">new</span><span class="hljs-type">VNode</span>.render())
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">new</span><span class="hljs-type">VNode</span>) {<span class="hljs-comment">//&#x5220;&#x9664;DOM&#x7684;&#x64CD;&#x4F5C;,&#x4F8B;&#x5982;patchElement(root)</span>
    parent.removeChild(parent.childNodes[index])
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span><span class="hljs-type">VNode</span>.tag !== oldVNode.tag || <span class="hljs-keyword">new</span><span class="hljs-type">VNode</span>.text !== oldVNode.text)<span class="hljs-comment">//&#x66FF;&#x6362;(&#x4FEE;&#x6539;)DOM&#x64CD;&#x4F5C;,&#x4F8B;&#x5982;&#x4E24;&#x4E2A;VNode&#x6BD4;&#x8F83;&#x7B80;&#x5355;,&#x7136;&#x540E;&#x4E92;&#x76F8;&#x6BD4;&#x8F83;</span>
 {
    parent.replaceChild(<span class="hljs-keyword">new</span><span class="hljs-type">VNode</span>.render(), parent.childNodes[index])
  }  <span class="hljs-keyword">else</span> {<span class="hljs-comment">//&#x9012;&#x5F52;&#x66FF;&#x6362;&#x5B69;&#x5B50;DOM,&#x9012;&#x5F52;&#x6BD4;&#x8F83;</span>
    <span class="hljs-keyword">for</span>(let i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">new</span><span class="hljs-type">VNode</span>.children.length || i &lt; oldVNode.children.length; i++) {
      patchElement(parent.childNodes[index], <span class="hljs-keyword">new</span><span class="hljs-type">VNode</span>.children[i], oldVNode.children[i], i)
    }
  }
}



let vNodes1 = v(<span class="hljs-string">&apos;div&apos;</span>, [
      v(<span class="hljs-string">&apos;p&apos;</span>, [
        v(<span class="hljs-string">&apos;span&apos;</span>, [ v(<span class="hljs-string">&apos;#text&apos;</span>, <span class="hljs-string">&apos;xiedaimala.com&apos;</span>) ] )
        ]
      ),
      v(<span class="hljs-string">&apos;span&apos;</span>, [
        v(<span class="hljs-string">&apos;#text&apos;</span>,  <span class="hljs-string">&apos;jirengu.com&apos;</span>)
        ])
    ]
  )

let vNodes2 = v(<span class="hljs-string">&apos;div&apos;</span>, [
      v(<span class="hljs-string">&apos;p&apos;</span>, [
        v(<span class="hljs-string">&apos;span&apos;</span>, [ 
          v(<span class="hljs-string">&apos;#text&apos;</span>, <span class="hljs-string">&apos;xiedaimala.com&apos;</span>) 
          ] )
        ]
      ),
      v(<span class="hljs-string">&apos;span&apos;</span>, [
        v(<span class="hljs-string">&apos;#text&apos;</span>,  <span class="hljs-string">&apos;jirengu.coms&apos;</span>),
        v(<span class="hljs-string">&apos;#text&apos;</span>,  <span class="hljs-string">&apos;ruoyu&apos;</span>)
        ])
    ]
  )
const root = document.querySelector(<span class="hljs-string">&apos;#root&apos;</span>)

patchElement(root, vNodes1)<span class="hljs-comment">//&#x521B;&#x5EFA;&#x65B0;&#x7684;DOM,</span>
patchElement(root)<span class="hljs-comment">//&#x5220;&#x9664;DOM&#x7684;&#x64CD;&#x4F5C;</span>
patchElement(root, vNodes2,vNodes1)<span class="hljs-comment">//&#x66FF;&#x6362;(&#x4FEE;&#x6539;)DOM&#x64CD;&#x4F5C;</span></code></pre><p>&#x4EE5;&#x4E0A;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x5B9E;&#x73B0;!&#x6709;&#x5F88;&#x591A;bug</p><h2 id="articleHeader8">&#x603B;&#x7ED3;</h2><p>&#x95EE;&#xFF1A;&#x8BF4;&#x8BF4;&#x865A;&#x62DF;DOM&#xFF1A;<br>&#x5F53;&#x6211;&#x4EEC;&#x4FEE;&#x6539;&#x771F;&#x6B63;&#x7684;DOM&#x6811;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x56E0;&#x4E3A;DOM&#x4E2D;&#x5143;&#x7D20;&#x8282;&#x70B9;&#x6709;&#x8BB8;&#x591A;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x5F53;DOM&#x4E2D;&#x8282;&#x70B9;&#x8FC7;&#x591A;&#x65F6;&#x5F80;&#x5F80;&#x9700;&#x8981;&#x6D88;&#x8017;&#x5F88;&#x5927;&#x7684;&#x6027;&#x80FD;&#x3002;<br>&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x662F;&#xFF1A;&#x4F7F;&#x7528;js&#x5BF9;&#x8C61;&#x6765;&#x8868;&#x793A;DOM&#x6811;&#x7684;&#x4FE1;&#x606F;&#x548C;&#x7ED3;&#x6784;&#xFF0C;&#x8FD9;&#x4E2A;js&#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x771F;&#x6B63;&#x7684;DOM&#x6811;&#x3002;&#x5F53;&#x72B6;&#x6001;&#x53D8;&#x66F4;&#x7684;&#x65F6;&#x5019;&#x7528;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x65B0;&#x6E32;&#x67D3;&#x7684;&#x7684;js&#x5BF9;&#x8C61;&#x548C;&#x65E7;&#x7684;&#x865A;&#x62DF;DOM js&#x5BF9;&#x8C61;&#x4F5C;&#x5BF9;&#x6BD4;&#xFF0C;&#x8BB0;&#x5F55;&#x7740;&#x4E24;&#x68F5;&#x6811;&#x7684;&#x5DEE;&#x5F02;&#x3002;&#x628A;&#x5DEE;&#x522B;&#x53CD;&#x6620;&#x5230;&#x771F;&#x5B9E;&#x7684;DOM &#x7ED3;&#x6784;&#x4E0A;&#x6700;&#x540E;&#x64CD;&#x4F5C;&#x771F;&#x6B63;&#x7684;DOM&#x7684;&#x65F6;&#x5019;&#x53EA;&#x64CD;&#x4F5C;&#x6709;&#x5DEE;&#x5F02;&#x7684;&#x90E8;&#x5206;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
虚拟DOM

## 原文链接
[https://segmentfault.com/a/1190000016556382](https://segmentfault.com/a/1190000016556382)


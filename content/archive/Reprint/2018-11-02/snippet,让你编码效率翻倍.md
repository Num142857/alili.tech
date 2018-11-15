---
title: 'snippet,让你编码效率翻倍'
reprint: true
categories: reprint
abbrlink: e7ed4f50
date: 2018-11-02 02:30:12
---

{{% raw %}}
<h2 id="articleHeader0">&#x4E3A;&#x4EC0;&#x4E48;&#x8C08;&#x5230;Snippet</h2><p>&#x4ECA;&#x5929;&#x4E0B;&#x5348;&#x5728;&#x7528;vscode&#x505A;&#x5C0F;&#x7A0B;&#x5E8F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53D1;&#x73B0;&#x5F88;&#x4E0D;&#x65B9;&#x4FBF;&#xFF0C;&#x56E0;&#x4E3A;&#x5546;&#x5E97;&#x91CC;&#x63D0;&#x4F9B;&#x7684;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x6781;&#x4E3A;&#x6709;&#x9650;&#xFF0C;&#x800C;&#x4E14;&#x5E73;&#x65F6;&#x51E0;&#x4E4E;&#x6BCF;&#x5929;&#x90FD;&#x9700;&#x8981;&#x7528;&#x5230;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x5728;&#x601D;&#x8003;&#x4ED6;&#x4EEC;&#x662F;&#x600E;&#x4E48;&#x505A;&#x5230;&#x7ED9;&#x522B;&#x4EBA;&#x63D0;&#x4F9B;&#x4EE3;&#x7801;&#x7684;&#xFF0C;&#x6211;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x5417;&#x3002;&#x7136;&#x540E;&#x67E5;&#x4E86;&#x4E0B;&#xFF0C;&#x679C;&#x7136;&#xFF0C;&#x8FD9;&#x5728;vscode&#x91CC;&#x81EA;&#x5E26;&#x7684;&#xFF08;&#x597D;&#x50CF;&#x85CF;&#x5F97;&#x6709;&#x70B9;&#x6DF1;&#xFF09;&#xFF0C;&#x662F;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x505A;&#x5B8C;&#x81EA;&#x5DF1;&#x7684;&#x4EFB;&#x52A1;&#x540E;&#x6363;&#x9F13;&#x4E86;&#x4E0B;&#xFF0C;&#x57FA;&#x672C;&#x4E86;&#x89E3;&#x4E86;snippet&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x7A81;&#x7136;&#x6709;&#x79CD;&#x6253;&#x5F00;&#x65B0;&#x4E16;&#x754C;&#x5927;&#x95E8;&#x7684;&#x611F;&#x89C9;&#x3002;&#x505A;&#x4E2A;&#x8BB0;&#x5F55;&#xFF0C;&#x4E0A;&#x83DC;&#x4E86;</p><hr><h2 id="articleHeader1">&#x5982;&#x4F55;&#x6253;&#x5F00;snippet&#x914D;&#x7F6E;</h2><p>&#x8FD9;&#x91CC;&#x4EE5;vscode&#x4E3A;&#x4F8B;&#xFF0C;&#x5176;&#x4ED6;&#x7F16;&#x8F91;&#x5668;&#x5927;&#x6982;&#x4E5F;&#x5DEE;&#x4E0D;&#x591A;&#x3002;&#x5728;vscode&#x4E2D;&#x5FEB;&#x6377;&#x952E;&#x300C;<strong>Ctrl + Shift + P</strong>&#x300D;&#x6253;&#x5F00;&#x547D;&#x4EE4;&#x7A97;&#x53E3;&#xFF0C;&#x7136;&#x540E;&#x8F93;&#x5165;<strong>snippet</strong>,&#x9009;&#x62E9; <strong>[&#x914D;&#x7F6E;&#x7528;&#x6237;&#x4EE3;&#x7801;&#x7247;&#x6BB5;]</strong>&#xFF0C;&#x70B9;&#x51FB;&#x540E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x6109;&#x5FEB;&#x7684;&#x8FDB;&#x884C;&#x7247;&#x6BB5;&#x7684;&#x7F16;&#x5199;&#x4E86;</p><p><span class="img-wrap"><img data-src="/img/bVbgT1P?w=731&amp;h=258" src="https://static.alili.tech/img/bVbgT1P?w=731&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbgT1R?w=597&amp;h=472" src="https://static.alili.tech/img/bVbgT1R?w=597&amp;h=472" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><hr><h2 id="articleHeader2">Snippet&#x600E;&#x4E48;&#x7528;</h2><h3 id="articleHeader3">&#x5148;&#x4E0A;&#x4E00;&#x4E2A;Demo</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;html template&quot;: {
    &quot;prefix&quot;: &quot;ht&quot;,
    &quot;body&quot;: [
      &quot;&lt;!DOCTYPE html&gt;&quot;,
      &quot;&lt;html lang=\&quot;en\&quot;&gt;&quot;,
      &quot;&lt;head&gt;&quot;,
      &quot;  &lt;meta charset=\&quot;UTF-8\&quot;&gt;&quot;,
      &quot;  &lt;title&gt;${1:$CURRENT_DATE}&lt;/title&gt;&quot;,
      &quot;&lt;/head&gt;&quot;,
      &quot;&lt;body&gt;&quot;,
            &quot; &lt;div class=\&quot;${2|container,wrapper|}\&quot;&gt;&quot;,
            &quot;   ${3}&quot;,
            &quot; &lt;/div&gt;&quot;,
      &quot;&lt;/body&gt;&quot;,
      &quot;&lt;/html&gt;&quot;,
    ],
    &quot;description&quot;: &quot;create a html frame&quot;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>&quot;html template&quot;: {
    &quot;prefix&quot;: &quot;ht&quot;,
    &quot;body&quot;: [
      &quot;<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>&quot;,
      &quot;<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">\</span>&quot;<span class="hljs-attr">en</span>\&quot;&gt;</span>&quot;,
      &quot;<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>&quot;,
      &quot;  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">\</span>&quot;<span class="hljs-attr">UTF-8</span>\&quot;&gt;</span>&quot;,
      &quot;  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>${1:$CURRENT_DATE}<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>&quot;,
      &quot;<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>&quot;,
      &quot;<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>&quot;,
            &quot; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">\</span>&quot;${<span class="hljs-attr">2</span>|<span class="hljs-attr">container</span>,<span class="hljs-attr">wrapper</span>|}\&quot;&gt;</span>&quot;,
            &quot;   ${3}&quot;,
            &quot; <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>&quot;,
      &quot;<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>&quot;,
      &quot;<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>&quot;,
    ],
    &quot;description&quot;: &quot;create a html frame&quot;
  }</code></pre><p>&#x6548;&#x679C;&#x662F;&#x8FD9;&#x6837;&#x6EF4;<br><span class="img-wrap"><img data-src="/img/bVbgTRV?w=288&amp;h=232" src="https://static.alili.tech/img/bVbgTRV?w=288&amp;h=232" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader4">&#x57FA;&#x7840;&#x7ED3;&#x6784;</h3><p><span class="img-wrap"><img data-src="/img/bVbgTn7?w=598&amp;h=139" src="https://static.alili.tech/img/bVbgTn7?w=598&amp;h=139" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li>&#x7247;&#x6BB5;&#x540D;&#x5B57;</li><li>prefix&#xFF08;&#x524D;&#x7F00;&#xFF0C;&#x8F93;&#x5165;&#x7684;&#x89E6;&#x53D1;&#x6761;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x4E2D;&#x5F53;&#x6211;&#x8F93;&#x5165;ht&#x540E;&#xFF0C;&#x5C31;&#x80FD;tab&#x51FA;&#x6765;&#x7247;&#x6BB5;&#xFF09;</li><li>body&#xFF08;&#x4E3B;&#x4F53;&#x90E8;&#x5206;&#xFF0C;&#x5728;&#x91CC;&#x9762;&#x6839;&#x636E;&#x8BED;&#x6CD5;&#x5B9A;&#x4E49;&#x81EA;&#x5DF1;&#x9700;&#x8981;&#x7684;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#xFF09;</li><li>description&#xFF08;&#x8BF4;&#x660E;&#xFF0C;&#x7247;&#x6BB5;&#x7684;&#x5177;&#x4F53;&#x63CF;&#x8FF0;&#xFF09;</li></ul><h3 id="articleHeader5">&#x57FA;&#x7840;&#x8BED;&#x6CD5;</h3><ul><li>&#x6BCF;&#x4E2A;&#x9017;&#x53F7;&#x4EE3;&#x8868;&#x4E00;&#x6574;&#x884C;&#x7684;&#x7ED3;&#x675F;&#xFF0C;&#x53CC;&#x5F15;&#x53F7;&#x9700;&#x8981;&#x7528;&#x8F6C;&#x4E49;&#x5B57;&#x7B26; \</li><li>$number&#x8868;&#x793A;&#x5149;&#x6807;&#x8DF3;&#x8F6C;&#x7684;&#x987A;&#x5E8F;&#xFF0C;&#x6BD4;&#x5982;$1&#x8868;&#x793A;&#x5149;&#x6807;&#x9996;&#x6B21;&#x9700;&#x8981;&#x8DF3;&#x8F6C;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x76F8;&#x540C;&#x5E8F;&#x53F7;&#x7684;&#x4F1A;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x53E6;&#x5916;$0&#x8868;&#x793A;&#x6700;&#x7EC8;&#x5149;&#x6807;&#x4F4D;&#x7F6E;</li><li>&#x53D8;&#x91CF;&#xFF0C;&#x5728;&#x672A;&#x8D4B;&#x503C;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x63D0;&#x4F9B;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x8FD9;&#x91CC;&#x63D0;&#x4F9B;&#x4E00;&#x4E9B;&#x53D8;&#x91CF;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    TM_SELECTED_TEXT&#xFF1A;&#x5F53;&#x524D;&#x9009;&#x5B9A;&#x7684;&#x6587;&#x672C;&#x6216;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#xFF1B; 
    TM_CURRENT_LINE&#xFF1A;&#x5F53;&#x524D;&#x884C;&#x7684;&#x5185;&#x5BB9;&#xFF1B;
    TM_CURRENT_WORD&#xFF1A;&#x5149;&#x6807;&#x6240;&#x5904;&#x5355;&#x8BCD;&#x6216;&#x7A7A;&#x5B57;&#x7B26;&#x4E32; 
    TM_LINE_INDEX&#xFF1A;&#x884C;&#x53F7;&#xFF08;&#x4ECE;&#x96F6;&#x5F00;&#x59CB;&#xFF09;&#xFF1B;
    TM_LINE_NUMBER&#xFF1A;&#x884C;&#x53F7;&#xFF08;&#x4ECE;&#x4E00;&#x5F00;&#x59CB;&#xFF09;&#xFF1B;
    TM_FILENAME&#xFF1A;&#x5F53;&#x524D;&#x6587;&#x6863;&#x7684;&#x6587;&#x4EF6;&#x540D;&#xFF1B;
    TM_FILENAME_BASE&#xFF1A;&#x5F53;&#x524D;&#x6587;&#x6863;&#x7684;&#x6587;&#x4EF6;&#x540D;&#xFF08;&#x4E0D;&#x542B;&#x540E;&#x7F00;&#x540D;&#xFF09;&#xFF1B;
    TM_DIRECTORY&#xFF1A;&#x5F53;&#x524D;&#x6587;&#x6863;&#x6240;&#x5728;&#x76EE;&#x5F55;&#xFF1B;
    TM_FILEPATH&#xFF1A;&#x5F53;&#x524D;&#x6587;&#x6863;&#x7684;&#x5B8C;&#x6574;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#xFF1B;
    CLIPBOARD&#xFF1A;&#x5F53;&#x524D;&#x526A;&#x8D34;&#x677F;&#x4E2D;&#x5185;&#x5BB9;&#x3002;
    &#x65F6;&#x95F4;&#x76F8;&#x5173;
    CURRENT_YEAR: &#x5F53;&#x524D;&#x5E74;&#x4EFD;&#xFF1B;
    CURRENT_YEAR_SHORT: &#x5F53;&#x524D;&#x5E74;&#x4EFD;&#x7684;&#x540E;&#x4E24;&#x4F4D;&#xFF1B;
    CURRENT_MONTH: &#x683C;&#x5F0F;&#x5316;&#x4E3A;&#x4E24;&#x4F4D;&#x6570;&#x5B57;&#x7684;&#x5F53;&#x524D;&#x6708;&#x4EFD;&#xFF0C;&#x5982; 02&#xFF1B;
    CURRENT_MONTH_NAME: &#x5F53;&#x524D;&#x6708;&#x4EFD;&#x7684;&#x5168;&#x79F0;&#xFF0C;&#x5982; July&#xFF1B;
    CURRENT_MONTH_NAME_SHORT: &#x5F53;&#x524D;&#x6708;&#x4EFD;&#x7684;&#x7B80;&#x79F0;&#xFF0C;&#x5982; Jul&#xFF1B;
    CURRENT_DATE: &#x5F53;&#x5929;&#x6708;&#x4EFD;&#x7B2C;&#x51E0;&#x5929;&#xFF1B;
    CURRENT_DAY_NAME: &#x5F53;&#x5929;&#x5468;&#x51E0;&#xFF0C;&#x5982; Monday&#xFF1B;
    CURRENT_DAY_NAME_SHORT: &#x5F53;&#x5929;&#x5468;&#x51E0;&#x7684;&#x7B80;&#x79F0;&#xFF0C;&#x5982; Mon&#xFF1B;
    CURRENT_HOUR: &#x5F53;&#x524D;&#x5C0F;&#x65F6;&#xFF08;24 &#x5C0F;&#x65F6;&#x5236;&#xFF09;&#xFF1B;
    CURRENT_MINUTE: &#x5F53;&#x524D;&#x5206;&#x949F;&#xFF1B;
    CURRENT_SECOND: &#x5F53;&#x524D;&#x79D2;&#x6570;&#x3002;
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>    TM_SELECTED_TEXT&#xFF1A;&#x5F53;&#x524D;&#x9009;&#x5B9A;&#x7684;&#x6587;&#x672C;&#x6216;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#xFF1B; 
    TM_CURRENT_LINE&#xFF1A;&#x5F53;&#x524D;&#x884C;&#x7684;&#x5185;&#x5BB9;&#xFF1B;
    TM_CURRENT_WORD&#xFF1A;&#x5149;&#x6807;&#x6240;&#x5904;&#x5355;&#x8BCD;&#x6216;&#x7A7A;&#x5B57;&#x7B26;&#x4E32; 
    TM_LINE_INDEX&#xFF1A;&#x884C;&#x53F7;&#xFF08;&#x4ECE;&#x96F6;&#x5F00;&#x59CB;&#xFF09;&#xFF1B;
    TM_LINE_NUMBER&#xFF1A;&#x884C;&#x53F7;&#xFF08;&#x4ECE;&#x4E00;&#x5F00;&#x59CB;&#xFF09;&#xFF1B;
    TM_FILENAME&#xFF1A;&#x5F53;&#x524D;&#x6587;&#x6863;&#x7684;&#x6587;&#x4EF6;&#x540D;&#xFF1B;
    TM_FILENAME_BASE&#xFF1A;&#x5F53;&#x524D;&#x6587;&#x6863;&#x7684;&#x6587;&#x4EF6;&#x540D;&#xFF08;&#x4E0D;&#x542B;&#x540E;&#x7F00;&#x540D;&#xFF09;&#xFF1B;
    TM_DIRECTORY&#xFF1A;&#x5F53;&#x524D;&#x6587;&#x6863;&#x6240;&#x5728;&#x76EE;&#x5F55;&#xFF1B;
    TM_FILEPATH&#xFF1A;&#x5F53;&#x524D;&#x6587;&#x6863;&#x7684;&#x5B8C;&#x6574;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#xFF1B;
    CLIPBOARD&#xFF1A;&#x5F53;&#x524D;&#x526A;&#x8D34;&#x677F;&#x4E2D;&#x5185;&#x5BB9;&#x3002;
    &#x65F6;&#x95F4;&#x76F8;&#x5173;
<span class="hljs-symbol">    CURRENT_YEAR:</span> &#x5F53;&#x524D;&#x5E74;&#x4EFD;&#xFF1B;
<span class="hljs-symbol">    CURRENT_YEAR_SHORT:</span> &#x5F53;&#x524D;&#x5E74;&#x4EFD;&#x7684;&#x540E;&#x4E24;&#x4F4D;&#xFF1B;
<span class="hljs-symbol">    CURRENT_MONTH:</span> &#x683C;&#x5F0F;&#x5316;&#x4E3A;&#x4E24;&#x4F4D;&#x6570;&#x5B57;&#x7684;&#x5F53;&#x524D;&#x6708;&#x4EFD;&#xFF0C;&#x5982; <span class="hljs-number">02</span>&#xFF1B;
<span class="hljs-symbol">    CURRENT_MONTH_NAME:</span> &#x5F53;&#x524D;&#x6708;&#x4EFD;&#x7684;&#x5168;&#x79F0;&#xFF0C;&#x5982; July&#xFF1B;
<span class="hljs-symbol">    CURRENT_MONTH_NAME_SHORT:</span> &#x5F53;&#x524D;&#x6708;&#x4EFD;&#x7684;&#x7B80;&#x79F0;&#xFF0C;&#x5982; Jul&#xFF1B;
<span class="hljs-symbol">    CURRENT_DATE:</span> &#x5F53;&#x5929;&#x6708;&#x4EFD;&#x7B2C;&#x51E0;&#x5929;&#xFF1B;
<span class="hljs-symbol">    CURRENT_DAY_NAME:</span> &#x5F53;&#x5929;&#x5468;&#x51E0;&#xFF0C;&#x5982; Monday&#xFF1B;
<span class="hljs-symbol">    CURRENT_DAY_NAME_SHORT:</span> &#x5F53;&#x5929;&#x5468;&#x51E0;&#x7684;&#x7B80;&#x79F0;&#xFF0C;&#x5982; Mon&#xFF1B;
<span class="hljs-symbol">    CURRENT_HOUR:</span> &#x5F53;&#x524D;&#x5C0F;&#x65F6;&#xFF08;<span class="hljs-number">24</span> &#x5C0F;&#x65F6;&#x5236;&#xFF09;&#xFF1B;
<span class="hljs-symbol">    CURRENT_MINUTE:</span> &#x5F53;&#x524D;&#x5206;&#x949F;&#xFF1B;
<span class="hljs-symbol">    CURRENT_SECOND:</span> &#x5F53;&#x524D;&#x79D2;&#x6570;&#x3002;
    </code></pre><ul><li>&#x53EF;&#x9009;&#x9879;&#xFF0C;&#x5F53;&#x5149;&#x6807;&#x5230;&#x8BE5;&#x5904;&#x7684;&#x65F6;&#x5019;&#x5F39;&#x51FA;&#x4E00;&#x4E9B;&#x53EF;&#x9009;&#x62E9;&#x9879;&#xFF0C;&#x4F7F;&#x7528; | &#xFF0C;| &#x540E;&#x9762;&#x662F;&#x81EA;&#x5DF1;&#x63D0;&#x4F9B;&#x7684;&#x53EF;&#x9009;&#x9879; &#x6211;&#x8FD9;&#x91CC;&#x662F;&#x63D0;&#x4F9B;&#x4E86;&#x4E24;&#x4E2A;&#x503C;&#xFF0C;&#x503C;&#x4E4B;&#x95F4;&#x4F7F;&#x7528;&#x9017;&#x53F7;&#x8FDB;&#x884C;&#x5206;&#x9694;</li></ul><p><span class="img-wrap"><img data-src="/img/bVbgTXq?w=634&amp;h=97" src="https://static.alili.tech/img/bVbgTXq?w=634&amp;h=97" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li>body&#x7684;&#x9AD8;&#x7EA7;&#x8BED;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;<a href="https://blog.csdn.net/maokelong95/article/details/54379046#34-body-%E9%AB%98%E7%BA%A7%E8%AF%AD%E6%B3%95" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#xFF0C;&#x5199;&#x7684;&#x5F88;&#x8BE6;&#x7EC6;</li></ul><hr><h2 id="articleHeader6">&#x6700;&#x540E;</h2><p>&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVbgT6x?w=594&amp;h=440" src="https://static.alili.tech/img/bVbgT6x?w=594&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6700;&#x540E;&#x9644;&#x4E0A;&#x628A;&#x81EA;&#x5DF1;&#x7684;snippet&#x653E;&#x5230;market&#x4E0A;&#x7684;&#x6559;&#x7A0B;&#xFF0C;&#x4F7F;&#x52B2;&#x6233;<a href="https://blog.csdn.net/crper/article/details/78637080" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
snippet,让你编码效率翻倍

## 原文链接
[https://segmentfault.com/a/1190000016382686](https://segmentfault.com/a/1190000016382686)


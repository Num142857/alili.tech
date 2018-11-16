---
title: React Autocomplete（自动完成输入）示例教程
hidden: true
categories: [reprint]
slug: 2b34ccbc
date: 2018-11-11 02:30:07
---

{{< raw >}}
<p>React Autocomplete&#x793A;&#x4F8B;&#x6559;&#x7A0B;&#x662F;&#x4ECA;&#x5929;&#x7684;&#x4E3B;&#x9898;&#x3002;&#x5728;&#x73B0;&#x4EE3;Web&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;React&#x6539;&#x5584;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x662F;&#x5F88;&#x5BB9;&#x6613;&#x3002;&#x81EA;&#x52A8;&#x5B8C;&#x6210;&#x7684;&#x6982;&#x5FF5;&#x5F88;&#x7B80;&#x5355;&#x3002;&#x5B83;&#x662F;&#x57FA;&#x4E8E;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7684;&#x5EFA;&#x8BAE;&#x5217;&#x8868;&#x3002;&#x7136;&#x540E;&#xFF0C;&#x7528;&#x6237;&#x53EF;&#x4EE5;&#x6309;Enter&#x952E;&#x4EE5;&#x5B8C;&#x6210;&#x77ED;&#x8BED;&#x3002;&#x5B83;&#x8282;&#x7701;&#x4E86;&#x7528;&#x6237;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x8FD9;&#x4F7F;&#x7528;&#x6237;&#x975E;&#x5E38;&#x6EE1;&#x610F;&#x3002;&#x81EA;&#x52A8;&#x586B;&#x5145;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x591A;&#x79CD;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#xFF0C;&#x5982;&#x4F55;&#x8FC7;&#x6EE4;&#x5E76;&#x5448;&#x73B0;&#x7ED9;&#x7528;&#x6237;&#xFF0C;&#x5728;&#x672C;&#x6587;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x4F7F;&#x7528;&#x4F20;&#x9012;&#x7ED9;&#x6211;&#x4EEC;&#x7EC4;&#x4EF6;&#x7684;&#x56FA;&#x5B9A;&#x63A8;&#x8350;&#x5217;&#x8868;&#x3002;&#x5728;&#x7528;&#x6237;&#x8F93;&#x5165;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x8FC7;&#x6EE4;&#x7ED3;&#x679C;&#xFF0C;&#x5E76;&#x4EC5;&#x5728;&#x5EFA;&#x8BAE;&#x4E2D;&#x7684;&#x4EFB;&#x4F55;&#x4F4D;&#x7F6E;&#x663E;&#x793A;&#x5305;&#x542B;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7684;&#x5B57;&#x6BB5;&#x3002;</p><p>&#x5982;&#x679C;&#x60A8;&#x60F3;&#x4E86;&#x89E3;&#x6709;&#x5173;React.js&#x7684;&#x66F4;&#x591A;&#x4FE1;&#x606F;&#xFF0C;&#x8BF7;&#x67E5;&#x770B;&#x6B64;React 16 - &#x5B8C;&#x6574;&#x6307;&#x5357;&#xFF08;&#x5305;&#x62EC;React Router 4&#x548C;Redux&#xFF09;&#x6307;&#x5357;&#x3002;&#x5B83;&#x6709;&#x4E00;&#x4E2A;&#x5173;&#x4E8E;React&#x548C;Redux&#x7684;&#x7B80;&#x77ED;&#x4ECB;&#x7ECD;&#x3002;React 16 - &#x5B8C;&#x6574;&#x6307;&#x5357;&#xFF08;&#x5305;&#x62EC;React Router 4&#x548C;Redux&#xFF09;</p><p>React Autocomplete&#x793A;&#x4F8B;&#x6559;&#x7A0B;<br>&#x6211;&#x4EEC;&#x5728;&#x672C;&#x6559;&#x7A0B;&#x4E2D;&#x4F7F;&#x7528;&#x540D;&#x4E3A; [react-autocomplete]&#x7684;&#x5E93;(<a href="https://github.com/reactjs/react-autocomplete)" rel="nofollow noreferrer" target="_blank">https://github.com/reactjs/re...</a>&#x3002;&#x4F46;&#x9996;&#x5148;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#x5B89;&#x88C5; React.js &#x547D;&#x4EE4;&#x3002;</p><h3 id="articleHeader0">1:&#x5B89;&#x88C5; React.js.</h3><p>&#x952E;&#x5165;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npx create-react-app my-app
cd my-app
npm start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dsconfig"><code><span class="hljs-string">npx </span><span class="hljs-built_in">create-react-app</span> <span class="hljs-string">my-app
</span><span class="hljs-string">cd </span><span class="hljs-string">my-app
</span><span class="hljs-string">npm </span><span class="hljs-string">start</span></code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x4F7F;&#x7528;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#x5B89;&#x88C5; react-autocomplete &#x5E93;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save react-autocomplete" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save react-autocomplete</span></code></pre><h3 id="articleHeader1">2: &#x521B;&#x5EFA;&#x9759;&#x6001;&#x6570;&#x636E;&#x3002;</h3><p>&#x5728; src &#x6587;&#x4EF6;&#x5939;&#x4E2D;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x540D;&#x4E3A; data.js &#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x6DFB;&#x52A0;&#x4EE5;&#x4E0B;&#x8FD4;&#x56DE;&#x9759;&#x6001;&#x6570;&#x636E;&#x7684;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// data.js

export function getStocks() {
  return [
    { abbr: &apos;ADANIPORTS&apos;, name: &apos;Adani Ports &amp; Special Economic Zone Ltd.&apos; },
    { abbr: &apos;ASIANPAINT&apos;, name: &apos;Asian Paints Ltd.&apos; },
    { abbr: &apos;AXISBANK&apos;, name: &apos;Axis Bank Ltd.&apos; },
    { abbr: &apos;BAJAJ-AUTO&apos;, name: &apos;Bajaj Auto Ltd.&apos; },
    { abbr: &apos;BAJFINANCE&apos;, name: &apos;Bajaj Finance&apos; },
    { abbr: &apos;BAJAJFINSV&apos;, name: &apos;Bajaj Finserv Ltd.&apos; },
    { abbr: &apos;BPCL&apos;, name: &apos;Bharat Petroleum Corporation Ltd.&apos; },
    { abbr: &apos;BHARTIARTL&apos;, name: &apos;Bharti Airtel Ltd.&apos; },
    { abbr: &apos;INFRATEL&apos;, name: &apos;Bharti Infratel&apos; },
    { abbr: &apos;CIPLA&apos;, name: &apos;Cipla Ltd.&apos; },
    { abbr: &apos;COALINDIA&apos;, name: &apos;Coal India Ltd&apos; },
    { abbr: &apos;DRREDDY&apos;, name: &apos;Dr. Reddys Laboratories Ltd.&apos; },
    { abbr: &apos;EICHERMOT&apos;, name: &apos;Eicher Motors Ltd.&apos; },
    { abbr: &apos;GAIL&apos;, name: &apos;GAIL (India) Ltd.&apos; },
    { abbr: &apos;GRASIM&apos;, name: &apos;Grasim Industries Ltd.&apos; },
    { abbr: &apos;HCLTECH&apos;, name: &apos;HCL Technologies Ltd.&apos; },
    { abbr: &apos;HDFCBANK&apos;, name: &apos;HDFC Bank Ltd.&apos; },
    { abbr: &apos;HEROMOTOCO&apos;, name: &apos;Hero MotoCorp Ltd.&apos; },
    { abbr: &apos;HINDALCO&apos;, name: &apos;Hindalco Industries Ltd.&apos; },
    { abbr: &apos;HINDPETRO&apos;, name: &apos;Hindustan Petroleum Corporation Ltd.&apos; },
    { abbr: &apos;HINDUNILVR&apos;, name: &apos;Hindustan Unilever Ltd.&apos; },
    { abbr: &apos;HDFC&apos;, name: &apos;Housing Development Finance Corporation Ltd.&apos; },
    { abbr: &apos;ITC&apos;, name: &apos;I T C Ltd.&apos; },
    { abbr: &apos;ICICIBANK&apos;, name: &apos;ICICI Bank Ltd.&apos; },
    { abbr: &apos;IBULHSGFIN&apos;, name: &apos;Indiabulls Housing Finance&apos; },
    { abbr: &apos;IOC&apos;, name: &apos;Indian Oil Corporation Ltd.&apos; },
    { abbr: &apos;INDUSINDBK&apos;, name: &apos;IndusInd Bank Ltd.&apos; },
    { abbr: &apos;INFY    &apos;, name: &apos;Infosys Ltd.&apos; },
    { abbr: &apos;KOTAKBANK&apos;, name: &apos;Kotak Mahindra Bank Ltd.&apos; },
    { abbr: &apos;LT&apos;, name: &apos;Larsen &amp; Toubro Ltd.&apos; },
    { abbr: &apos;LUPIN&apos;, name: &apos;Lupin Ltd.&apos; },
    { abbr: &apos;M&amp;M&apos;, name: &apos;Mahindra &amp; Mahindra Ltd.&apos; },
    { abbr: &apos;MARUTI&apos;, name: &apos;Maruti Suzuki India Ltd.&apos; },
    { abbr: &apos;NTPC&apos;, name: &apos;NTPC Ltd.&apos; },
    { abbr: &apos;ONGC&apos;, name: &apos;Oil &amp; Natural Gas Corporation Ltd.&apos; },
    { abbr: &apos;POWERGRID&apos;, name: &apos;Power Grid Corporation of India Ltd.&apos; },
    { abbr: &apos;RELIANCE&apos;, name: &apos;Reliance Industries Ltd.&apos; },
    { abbr: &apos;SBIN&apos;, name: &apos;State Bank of India&apos; },
    { abbr: &apos;SUNPHARMA&apos;, name: &apos;Sun Pharmaceutical Industries Ltd.&apos; },
    { abbr: &apos;TCS&apos;, name: &apos;Tata Consultancy Services Ltd.&apos; },
    { abbr: &apos;TATAMOTORS&apos;, name: &apos;Tata Motors Ltd.&apos; },
    { abbr: &apos;TATASTEEL&apos;, name: &apos;Tata Steel Ltd.&apos; },
    { abbr: &apos;TECHM&apos;, name: &apos;Tech Mahindra Ltd.&apos; },
    { abbr: &apos;TITAN&apos;, name: &apos;Titan Company Ltd.&apos; },
    { abbr: &apos;ULTRACEMCO&apos;, name: &apos;UltraTech Cement Ltd.&apos; },
    { abbr: &apos;UPL&apos;, name: &apos;UPL Ltd.&apos; },
    { abbr: &apos;VEDL&apos;, name: &apos;Vedanta Ltd&apos; },
    { abbr: &apos;WIPRO&apos;, name: &apos;Wipro Ltd.&apos; },
    { abbr: &apos;YESBANK&apos;, name: &apos;Yes Bank Ltd.&apos; },
    { abbr: &apos;ZEEL&apos;, name: &apos;Zee Entertainment Enterprises Ltd.&apos; }
  ];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-comment">// data.js</span>

export function getStocks() {
  <span class="hljs-keyword">return</span> [
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ADANIPORTS&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Adani Ports &amp; Special Economic Zone Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ASIANPAINT&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Asian Paints Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;AXISBANK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Axis Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;BAJAJ-AUTO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bajaj Auto Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;BAJFINANCE&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bajaj Finance&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;BAJAJFINSV&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bajaj Finserv Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;BPCL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bharat Petroleum Corporation Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;BHARTIARTL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bharti Airtel Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;INFRATEL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bharti Infratel&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;CIPLA&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Cipla Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;COALINDIA&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Coal India Ltd&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;DRREDDY&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Dr. Reddys Laboratories Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;EICHERMOT&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Eicher Motors Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;GAIL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;GAIL (India) Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;GRASIM&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Grasim Industries Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HCLTECH&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;HCL Technologies Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HDFCBANK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;HDFC Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HEROMOTOCO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Hero MotoCorp Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HINDALCO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Hindalco Industries Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HINDPETRO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Hindustan Petroleum Corporation Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HINDUNILVR&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Hindustan Unilever Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HDFC&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Housing Development Finance Corporation Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ITC&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;I T C Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ICICIBANK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;ICICI Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;IBULHSGFIN&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Indiabulls Housing Finance&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;IOC&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Indian Oil Corporation Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;INDUSINDBK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;IndusInd Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;INFY    &apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Infosys Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;KOTAKBANK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Kotak Mahindra Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;LT&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Larsen &amp; Toubro Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;LUPIN&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Lupin Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;M&amp;M&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Mahindra &amp; Mahindra Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;MARUTI&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Maruti Suzuki India Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;NTPC&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;NTPC Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ONGC&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Oil &amp; Natural Gas Corporation Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;POWERGRID&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Power Grid Corporation of India Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;RELIANCE&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Reliance Industries Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;SBIN&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;State Bank of India&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;SUNPHARMA&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Sun Pharmaceutical Industries Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;TCS&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Tata Consultancy Services Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;TATAMOTORS&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Tata Motors Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;TATASTEEL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Tata Steel Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;TECHM&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Tech Mahindra Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;TITAN&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Titan Company Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ULTRACEMCO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;UltraTech Cement Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;UPL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;UPL Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;VEDL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Vedanta Ltd&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;WIPRO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Wipro Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;YESBANK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Yes Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ZEEL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Zee Entertainment Enterprises Ltd.&apos;</span> }
  ];
}</code></pre><p>&#x6B64;&#x529F;&#x80FD;&#x5C06;&#x8FD4;&#x56DE;&#x524D;50&#x540D;&#x80A1;&#x7968;&#x540D;&#x79F0;&#x53CA;&#x5176;&#x5370;&#x5EA6;&#x80A1;&#x7968;&#x5E02;&#x573A;&#x7684;&#x7F29;&#x5199;&#x3002;</p><p>&#x53E6;&#x5916;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x8FD9;&#x91CC;&#x518D;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x5C31;&#x662F; matchStocks&#x3002;</p><p>&#x6B64;&#x529F;&#x80FD;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x8FC7;&#x6EE4;&#x6389;&#x7528;&#x6237;&#x5728;&#x8F93;&#x5165;&#x533A;&#x57DF;&#x4E2D;&#x8F93;&#x5165;&#x7684;&#x80A1;&#x7968;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x5F53;&#x7528;&#x6237;&#x5F00;&#x59CB;&#x5728;&#x6587;&#x672C;&#x6846;&#x4E2D;&#x952E;&#x5165;&#x65F6;&#xFF0C;&#x5B83;&#x5C06;&#x4E0E;&#x80A1;&#x7968;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x5982;&#x679C;&#x627E;&#x5230;&#x5339;&#x914D;&#x5219;&#x8FD4;&#x56DE;&#x5E76;&#x663E;&#x793A;&#x7ED9;&#x7528;&#x6237;&#x3002;</p><p>&#x6240;&#x4EE5;&#x7F16;&#x5199;&#x7B2C;&#x4E8C;&#x4E2A;&#x51FD;&#x6570;&#x5E76;&#x4ECE; data.js &#x6587;&#x4EF6;&#x4E2D;&#x5BFC;&#x51FA;&#x5B83;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// data.js

export function matchStocks(state, value) {
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>// data.js

export function <span class="hljs-built_in">match</span>Stocks(<span class="hljs-keyword">state</span>, value) {
  return (
    <span class="hljs-keyword">state</span>.name.<span class="hljs-keyword">to</span>LowerCase().indexOf(value.<span class="hljs-keyword">to</span>LowerCase()) !== -<span class="hljs-number">1</span> ||
    <span class="hljs-keyword">state</span>.abbr.<span class="hljs-keyword">to</span>LowerCase().indexOf(value.<span class="hljs-keyword">to</span>LowerCase()) !== -<span class="hljs-number">1</span>
  );
}</code></pre><p>&#x6240;&#x4EE5;&#xFF0C;&#x73B0;&#x5728;&#x57FA;&#x672C;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x5728; App.js &#x6587;&#x4EF6;&#x4E2D;&#x5BFC;&#x5165;&#x8FD9;&#x4E9B;&#x51FD;&#x6570;&#x5E76;&#x5C06;&#x5176;&#x4F20;&#x9012;&#x7ED9; Autocomplete &#x7EC4;&#x4EF6;&#x3002;</p><h3 id="articleHeader2">3: Autocomplete API</h3><p>&#x5B83;&#x5177;&#x6709;&#x4EE5;&#x4E0B;&#x5C5E;&#x6027;&#x3002;</p><ul><li>value: &#x8FD9;&#x662F;&#x6587;&#x672C;&#x6846;&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x5B83;&#x5C06;&#x4E3A;&#x7A7A;&#x6216;&#x201C;&#x3002;</li><li>inputProps&#xFF1A;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;Props&#x4F20;&#x9012;&#x7ED9; props.renderInput &#x3002;;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x9664;&#x975E;&#x60A8;&#x4E3A; props.renderInput &#x6307;&#x5B9A;&#x4E86;&#x81EA;&#x5B9A;&#x4E49;&#x503C;&#xFF0C;&#x5426;&#x5219;&#x8FD9;&#x4E9B;&#x9053;&#x5177;&#x5C06;&#x5E94;&#x7528;&#x4E8E;&#x7531;&#x81EA;&#x52A8;&#x5B8C;&#x6210;&#x5448;&#x73B0;&#x7684;&lt;input /&gt;&#x5143;&#x7D20;&#x3002;</li><li>wrapperStyle&#xFF1A;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x5177;&#x6709;&#x4EE5;&#x4E0B;&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
display: &apos;inline-block&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>{
<span class="hljs-attribute">display</span>: <span class="hljs-string">&apos;inline-block&apos;</span>
}</code></pre><ul><li>items&#xFF1A;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x6570;&#x7EC4;&#xFF0C;&#x5728; data.js &#x6587;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49;&#x3002;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x5B83;&#x662F;&#x80A1;&#x7968;&#x5E02;&#x573A;&#x6570;&#x636E;&#x3002;</li><li>getItemValue&#xFF1A;&#x7528;&#x4E8E;&#x8BFB;&#x53D6;&#x9879;&#x4E2D;&#x6BCF;&#x4E2A;&#x6761;&#x76EE;&#x7684;&#x663E;&#x793A;&#x503C;&#x3002;</li><li>shouldItemRender&#xFF1A;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x529F;&#x80FD;&#x3002;&#x4E3A;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x6761;&#x76EE;&#x8C03;&#x7528;&#xFF0C;&#x5176;&#x8FD4;&#x56DE;&#x503C;&#x7528;&#x4E8E;&#x786E;&#x5B9A;&#x662F;&#x5426;&#x5E94;&#x5728;&#x4E0B;&#x62C9;&#x83DC;&#x5355;&#x4E2D;&#x663E;&#x793A;&#x3002;&#x901A;&#x8FC7;de&#xFF0C;fault&#x603B;&#x662F;&#x5448;&#x73B0;&#x6240;&#x6709;&#x9879;&#x76EE;&#x3002;</li><li>onChange&#xFF1A;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x6BCF;&#x6B21;&#x7528;&#x6237;&#x66F4;&#x6539;&#x8F93;&#x5165;&#x503C;&#x65F6;&#x90FD;&#x4F1A;&#x8C03;&#x7528;&#x5B83;&#x3002;</li><li>onSelect&#xFF1A;&#x6B64;&#x529F;&#x80FD;&#x5728;&#x7528;&#x6237;&#x4ECE;&#x4E0B;&#x62C9;&#x83DC;&#x5355;&#x4E2D;&#x9009;&#x62E9;&#x9879;&#x76EE;&#x65F6;&#x8C03;&#x7528;&#x3002;</li><li>renderMenu&#xFF1A;&#x8FD9;&#x662F;&#x51FD;&#x6570;&#x5E76;&#x88AB;&#x8C03;&#x7528;&#x4EE5;&#x751F;&#x6210;drop-dn&#x83DC;&#x5355;&#x7684;&#x6E32;&#x67D3;&#x6811;&#x3002;&#x786E;&#x4FDD;&#x8FD4;&#x56DE;&#x7684;&#x6811;&#x5305;&#x542B;&#x9879;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x6761;&#x76EE;&#xFF0C;&#x5426;&#x5219;&#x7A81;&#x51FA;&#x663E;&#x793A;&#x7684;&#x987A;&#x5E8F;&#x548C;&#x952E;&#x76D8;&#x5BFC;&#x822A;&#x903B;&#x8F91;&#x5C06;&#x4E2D;&#x65AD;&#x3002;&#x6837;&#x5F0F;&#x5C06;&#x5305;&#x542B;{top&#xFF0C;left&#xFF0C;minWidth}&#xFF0C;&#x5B83;&#x4EEC;&#x662F;&#x5DE6;&#x4E0A;&#x89D2;&#x7684;&#x5750;&#x6807;&#x548C;&#x4E0B;&#x62C9;&#x83DC;&#x5355;&#x7684;&#x5BBD;&#x5EA6;&#x3002;</li><li>renderItem&#xFF1A;&#x8FD9;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E3A;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x6761;&#x76EE;&#x8C03;&#x7528;&#xFF0C;&#x5B83;&#x8FD8;&#x4F20;&#x9012; shouldItemRender &#x4EE5;&#x751F;&#x6210;&#x4E0B;&#x62C9;&#x83DC;&#x5355;&#x4E2D;&#x6BCF;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x6E32;&#x67D3;&#x6811;&#x3002;&#x6837;&#x5F0F;&#x662F;&#x4E00;&#x7EC4;&#x53EF;&#x9009;&#x6837;&#x5F0F;&#xFF0C;&#x53EF;&#x7528;&#x4E8E;&#x6539;&#x5584;&#x4E0B;&#x62C9;&#x83DC;&#x5355;&#x4E2D;&#x9879;&#x76EE;&#x7684;&#x5916;&#x89C2;&#x3002;</li></ul><h3 id="articleHeader3">4&#xFF1A;&#x5C06;&#x81EA;&#x52A8;&#x586B;&#x5145;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0;&#x5230;App.js&#x6587;&#x4EF6;&#x4E2D;&#x3002;</h3><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x7684;&#x6700;&#x7EC8; App.js &#x6587;&#x4EF6;&#x770B;&#x8D77;&#x6765;&#x50CF;&#x8FD9;&#x6837;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import Autocomplete from  &apos;react-autocomplete&apos;;
import { getStocks, matchStocks } from &apos;./data&apos;;
import &apos;./App.css&apos;;
class App extends Component {

  state = { value: &apos;&apos; };
render() {
    return (

         item.name }
          shouldItemRender={ matchStocks }
          onChange={(event, value) =&gt; this.setState({ value }) }
          onSelect={ value =&gt; this.setState({ value }) }
          renderMenu={ children =&gt; (

              { children }

          )}
          renderItem={ (item, isHighlighted) =&gt; (

              { item.name }

          )}
        /&gt;

      );
}
  }

export default App;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> Autocomplete <span class="hljs-keyword">from</span>  <span class="hljs-string">&apos;react-autocomplete&apos;</span>;
<span class="hljs-keyword">import</span> { getStocks, matchStocks } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./data&apos;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./App.css&apos;</span>;
<span class="hljs-keyword">class</span> App <span class="hljs-keyword">extends</span> Component {

  state = { value: <span class="hljs-string">&apos;&apos;</span> };
render() {
    <span class="hljs-keyword">return</span> (

         item.name }
          shouldItemRender={ matchStocks }
          onChange={<span class="hljs-function">(<span class="hljs-params">event, value</span>) =&gt;</span> <span class="hljs-keyword">this</span>.setState({ value }) }
          onSelect={ <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> <span class="hljs-keyword">this</span>.setState({ value }) }
          renderMenu={ <span class="hljs-function"><span class="hljs-params">children</span> =&gt;</span> (

              { children }

          )}
          renderItem={ <span class="hljs-function">(<span class="hljs-params">item, isHighlighted</span>) =&gt;</span> (

              { item.name }

          )}
        /&gt;

      );
}
  }

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;</code></pre><p>&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;&#x524D;&#x9762;&#x8BA8;&#x8BBA;&#x8FC7;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x3002;&#x5176;&#x4E2D;&#x4E00;&#x4E9B;&#x4ECD;&#x7136;&#x6CA1;&#x6709;&#xFF0C;&#x4F46;&#x4F60;&#x53EF;&#x4EE5;&#x5728;Github&#x4E0A;&#x67E5;&#x770B;&#x3002;</p><p>&#x6211;&#x4EEC;&#x7684; data.js &#x6587;&#x4EF6;&#x770B;&#x8D77;&#x6765;&#x50CF;&#x8FD9;&#x6837;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// data.js

export function getStocks() {
  return [
    { abbr: &apos;ADANIPORTS&apos;, name: &apos;Adani Ports &amp; Special Economic Zone Ltd.&apos; },
    { abbr: &apos;ASIANPAINT&apos;, name: &apos;Asian Paints Ltd.&apos; },
    { abbr: &apos;AXISBANK&apos;, name: &apos;Axis Bank Ltd.&apos; },
    { abbr: &apos;BAJAJ-AUTO&apos;, name: &apos;Bajaj Auto Ltd.&apos; },
    { abbr: &apos;BAJFINANCE&apos;, name: &apos;Bajaj Finance&apos; },
    { abbr: &apos;BAJAJFINSV&apos;, name: &apos;Bajaj Finserv Ltd.&apos; },
    { abbr: &apos;BPCL&apos;, name: &apos;Bharat Petroleum Corporation Ltd.&apos; },
    { abbr: &apos;BHARTIARTL&apos;, name: &apos;Bharti Airtel Ltd.&apos; },
    { abbr: &apos;INFRATEL&apos;, name: &apos;Bharti Infratel&apos; },
    { abbr: &apos;CIPLA&apos;, name: &apos;Cipla Ltd.&apos; },
    { abbr: &apos;COALINDIA&apos;, name: &apos;Coal India Ltd&apos; },
    { abbr: &apos;DRREDDY&apos;, name: &apos;Dr. Reddys Laboratories Ltd.&apos; },
    { abbr: &apos;EICHERMOT&apos;, name: &apos;Eicher Motors Ltd.&apos; },
    { abbr: &apos;GAIL    &apos;, name: &apos;GAIL (India) Ltd.&apos; },
    { abbr: &apos;GRASIM&apos;, name: &apos;Grasim Industries Ltd.&apos; },
    { abbr: &apos;HCLTECH&apos;, name: &apos;HCL Technologies Ltd.&apos; },
    { abbr: &apos;HDFCBANK&apos;, name: &apos;HDFC Bank Ltd.&apos; },
    { abbr: &apos;HEROMOTOCO&apos;, name: &apos;Hero MotoCorp Ltd.&apos; },
    { abbr: &apos;HINDALCO&apos;, name: &apos;Hindalco Industries Ltd.&apos; },
    { abbr: &apos;HINDPETRO&apos;, name: &apos;Hindustan Petroleum Corporation Ltd.&apos; },
    { abbr: &apos;HINDUNILVR&apos;, name: &apos;Hindustan Unilever Ltd.&apos; },
    { abbr: &apos;HDFC&apos;, name: &apos;Housing Development Finance Corporation Ltd.&apos; },
    { abbr: &apos;ITC&apos;, name: &apos;I T C Ltd.&apos; },
    { abbr: &apos;ICICIBANK&apos;, name: &apos;ICICI Bank Ltd.&apos; },
    { abbr: &apos;IBULHSGFIN&apos;, name: &apos;Indiabulls Housing Finance&apos; },
    { abbr: &apos;IOC&apos;, name: &apos;Indian Oil Corporation Ltd.&apos; },
    { abbr: &apos;INDUSINDBK&apos;, name: &apos;IndusInd Bank Ltd.&apos; },
    { abbr: &apos;INFY    &apos;, name: &apos;Infosys Ltd.&apos; },
    { abbr: &apos;KOTAKBANK&apos;, name: &apos;Kotak Mahindra Bank Ltd.&apos; },
    { abbr: &apos;LT&apos;, name: &apos;Larsen &amp; Toubro Ltd.&apos; },
    { abbr: &apos;LUPIN&apos;, name: &apos;Lupin Ltd.&apos; },
    { abbr: &apos;M&amp;M&apos;, name: &apos;Mahindra &amp; Mahindra Ltd.&apos; },
    { abbr: &apos;MARUTI&apos;, name: &apos;Maruti Suzuki India Ltd.&apos; },
    { abbr: &apos;NTPC&apos;, name: &apos;NTPC Ltd.&apos; },
    { abbr: &apos;ONGC&apos;, name: &apos;Oil &amp; Natural Gas Corporation Ltd.&apos; },
    { abbr: &apos;POWERGRID&apos;, name: &apos;Power Grid Corporation of India Ltd.&apos; },
    { abbr: &apos;RELIANCE&apos;, name: &apos;Reliance Industries Ltd.&apos; },
    { abbr: &apos;SBIN&apos;, name: &apos;State Bank of India&apos; },
    { abbr: &apos;SUNPHARMA&apos;, name: &apos;Sun Pharmaceutical Industries Ltd.&apos; },
    { abbr: &apos;TCS&apos;, name: &apos;Tata Consultancy Services Ltd.&apos; },
    { abbr: &apos;TATAMOTORS&apos;, name: &apos;Tata Motors Ltd.&apos; },
    { abbr: &apos;TATASTEEL&apos;, name: &apos;Tata Steel Ltd.&apos; },
    { abbr: &apos;TECHM&apos;, name: &apos;Tech Mahindra Ltd.&apos; },
    { abbr: &apos;TITAN&apos;, name: &apos;Titan Company Ltd.&apos; },
    { abbr: &apos;ULTRACEMCO&apos;, name: &apos;UltraTech Cement Ltd.&apos; },
    { abbr: &apos;UPL&apos;, name: &apos;UPL Ltd.&apos; },
    { abbr: &apos;VEDL&apos;, name: &apos;Vedanta Ltd&apos; },
    { abbr: &apos;WIPRO&apos;, name: &apos;Wipro Ltd.&apos; },
    { abbr: &apos;YESBANK&apos;, name: &apos;Yes Bank Ltd.&apos; },
    { abbr: &apos;ZEEL&apos;, name: &apos;Zee Entertainment Enterprises Ltd.&apos; }
  ];
}

export function matchStocks(state, value) {
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-comment">// data.js</span>

export function getStocks() {
  <span class="hljs-keyword">return</span> [
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ADANIPORTS&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Adani Ports &amp; Special Economic Zone Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ASIANPAINT&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Asian Paints Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;AXISBANK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Axis Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;BAJAJ-AUTO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bajaj Auto Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;BAJFINANCE&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bajaj Finance&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;BAJAJFINSV&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bajaj Finserv Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;BPCL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bharat Petroleum Corporation Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;BHARTIARTL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bharti Airtel Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;INFRATEL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Bharti Infratel&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;CIPLA&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Cipla Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;COALINDIA&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Coal India Ltd&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;DRREDDY&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Dr. Reddys Laboratories Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;EICHERMOT&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Eicher Motors Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;GAIL    &apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;GAIL (India) Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;GRASIM&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Grasim Industries Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HCLTECH&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;HCL Technologies Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HDFCBANK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;HDFC Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HEROMOTOCO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Hero MotoCorp Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HINDALCO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Hindalco Industries Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HINDPETRO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Hindustan Petroleum Corporation Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HINDUNILVR&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Hindustan Unilever Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;HDFC&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Housing Development Finance Corporation Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ITC&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;I T C Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ICICIBANK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;ICICI Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;IBULHSGFIN&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Indiabulls Housing Finance&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;IOC&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Indian Oil Corporation Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;INDUSINDBK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;IndusInd Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;INFY    &apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Infosys Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;KOTAKBANK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Kotak Mahindra Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;LT&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Larsen &amp; Toubro Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;LUPIN&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Lupin Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;M&amp;M&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Mahindra &amp; Mahindra Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;MARUTI&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Maruti Suzuki India Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;NTPC&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;NTPC Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ONGC&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Oil &amp; Natural Gas Corporation Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;POWERGRID&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Power Grid Corporation of India Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;RELIANCE&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Reliance Industries Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;SBIN&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;State Bank of India&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;SUNPHARMA&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Sun Pharmaceutical Industries Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;TCS&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Tata Consultancy Services Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;TATAMOTORS&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Tata Motors Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;TATASTEEL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Tata Steel Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;TECHM&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Tech Mahindra Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;TITAN&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Titan Company Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ULTRACEMCO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;UltraTech Cement Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;UPL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;UPL Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;VEDL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Vedanta Ltd&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;WIPRO&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Wipro Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;YESBANK&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Yes Bank Ltd.&apos;</span> },
    { <span class="hljs-string">abbr:</span> <span class="hljs-string">&apos;ZEEL&apos;</span>, <span class="hljs-string">name:</span> <span class="hljs-string">&apos;Zee Entertainment Enterprises Ltd.&apos;</span> }
  ];
}

export function matchStocks(state, value) {
  <span class="hljs-keyword">return</span> (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== <span class="hljs-number">-1</span> ||
    state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== <span class="hljs-number">-1</span>
  );
}</code></pre><p>&#x6700;&#x540E;&#xFF0C; App.css &#x6587;&#x4EF6;&#x770B;&#x8D77;&#x6765;&#x50CF;&#x8FD9;&#x6837;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  color: #333;
font-family: &quot;Helvetica Neue&quot;, Arial, sans-serif;
font-weight: 200;
}

.example {
  padding: 0 25px;
}

label {
  display: block;
margin: 5px 0;
}

code {
  padding: .2em .5em;
font-size: 85%;
background-color: rgba(0,0,0,0.04);
border-radius: 3px;
}

.menu {
  position: absolute;
box-sizing: border-box;
width: 100%;
border: 1px solid #cccccc;
}

.item {
  padding: 2px 6px;
cursor: default;
}

.item-highlighted {
  color: white;
background-color: #4095bf;
}

.item-header {
  background-color: #eeeeee;
color: #454545;
font-weight: bold;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
<span class="hljs-attribute">font-family</span>: <span class="hljs-string">&quot;Helvetica Neue&quot;</span>, Arial, sans-serif;
<span class="hljs-attribute">font-weight</span>: <span class="hljs-number">200</span>;
}

<span class="hljs-selector-class">.example</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">25px</span>;
}

<span class="hljs-selector-tag">label</span> {
  <span class="hljs-attribute">display</span>: block;
<span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">code</span> {
  <span class="hljs-attribute">padding</span>: .<span class="hljs-number">2em</span> .<span class="hljs-number">5em</span>;
<span class="hljs-attribute">font-size</span>: <span class="hljs-number">85%</span>;
<span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0.04);
<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>;
}

<span class="hljs-selector-class">.menu</span> {
  <span class="hljs-attribute">position</span>: absolute;
<span class="hljs-attribute">box-sizing</span>: border-box;
<span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
<span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#cccccc</span>;
}

<span class="hljs-selector-class">.item</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">2px</span> <span class="hljs-number">6px</span>;
<span class="hljs-attribute">cursor</span>: default;
}

<span class="hljs-selector-class">.item-highlighted</span> {
  <span class="hljs-attribute">color</span>: white;
<span class="hljs-attribute">background-color</span>: <span class="hljs-number">#4095bf</span>;
}

<span class="hljs-selector-class">.item-header</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#eeeeee</span>;
<span class="hljs-attribute">color</span>: <span class="hljs-number">#454545</span>;
<span class="hljs-attribute">font-weight</span>: bold;
}</code></pre><p>&#x4FDD;&#x5B58;&#x6240;&#x6709;&#x6587;&#x4EF6;&#x5E76;&#x8F6C;&#x5230; http&#xFF1A;// localhost&#xFF1A;3000 /</p><p>&#x4ECE;&#x6570;&#x636E;&#x6570;&#x7EC4;&#x4E2D;&#x952E;&#x5165;&#x80A1;&#x7968;&#xFF0C;&#x60A8;&#x5C06;&#x83B7;&#x5F97;&#x5EFA;&#x8BAE;&#x8865;&#x5168;&#x5217;&#x8868;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbgBEQ?w=163&amp;h=140" src="https://static.alili.tech/img/bVbgBEQ?w=163&amp;h=140" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6240;&#x4EE5;&#xFF0C;&#x6700;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86; React Autocomplete&#x793A;&#x4F8B;&#x6559;&#x7A0B;&#x3002;&#x611F;&#x8C22;&#x60A8;&#x7684;&#x53C2;&#x4E0E;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Autocomplete（自动完成输入）示例教程

## 原文链接
[https://segmentfault.com/a/1190000016312088](https://segmentfault.com/a/1190000016312088)


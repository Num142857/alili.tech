---
title: 'Vue+Mock.js模拟登录和表格的增删改查' 
date: 2018-11-20 2:30:10
hidden: true
slug: wweawuo65
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><h6>&#x5173;&#x4E8E;mockjs&#xFF0C;&#x5B98;&#x7F51;&#x63CF;&#x8FF0;&#x7684;&#x662F;</h6><p>1.&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;</p><p>2.&#x4E0D;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x65E2;&#x6709;&#x4EE3;&#x7801;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x62E6;&#x622A; Ajax &#x8BF7;&#x6C42;&#xFF0C;&#x8FD4;&#x56DE;&#x6A21;&#x62DF;&#x7684;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x3002;</p><p>3.&#x6570;&#x636E;&#x7C7B;&#x578B;&#x4E30;&#x5BCC;</p><p>4.&#x901A;&#x8FC7;&#x968F;&#x673A;&#x6570;&#x636E;&#xFF0C;&#x6A21;&#x62DF;&#x5404;&#x79CD;&#x573A;&#x666F;&#x3002;</p><p>5 &#x9879;&#x76EE;&#x4E0D;&#x80CC;&#x9505;&#xFF08;&#x7B49;&#x540E;&#x7AEF;&#x7ED9;&#x63A5;&#x53E3;&#x7684;&#x8BDD;&#x53EF;&#x80FD;&#x4F1A;&#x80CC;&#x9505;&#xFF09;</p><p>&#x7B49;&#x7B49;&#x4F18;&#x70B9;&#xFF0C;&#x6700;&#x540E;&#x4E00;&#x6761;&#x6211;&#x52A0;&#x7684;&#x3002;</p><h5>&#x7B2C;&#x4E00;&#x6B65;&#x5148;&#x5B89;&#x88C5;mock.js</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install mockjs --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs q"><code style="word-break:break-word;white-space:initial">npm install mockjs --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre><h5>&#x7B2C;&#x4E8C;&#x6B65;&#x4F7F;&#x7528; mock.js</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Mock from &apos;mockjs&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> Mock <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;mockjs&apos;</span></code></pre><p>&#x54EA;&#x91CC;&#x7528;&#x5C31;&#x5728;&#x54EA;&#x91CC;&#x5F15;&#x5165;&#x3002;&#x6211;&#x662F;&#x5728;&#x9879;&#x76EE;<code>src/mock/index.js</code>&#x91CC;&#x9762;&#x4F7F;&#x7528;<code>mock.js</code></p><p><a href="https://github.com/nuysoft/Mock/wiki/Syntax-Specification" rel="nofollow noreferrer" target="_blank">&#x8BE6;&#x7EC6;&#x8BF7;&#x770B;&#x5B98;&#x65B9;&#x6587;&#x6863;</a></p><h5>&#x5173;&#x952E;&#x70B9;1&#xFF1A;Mock.mock()</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mock.mock( rurl?, rtype?, template|function( options ) )" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code style="word-break:break-word;white-space:initial"><span class="hljs-type">Mock</span>.mock( rurl?, r<span class="hljs-keyword">type</span>?, template|function( options ) )</code></pre><p>&#x8FD9;&#x91CC;&#x7684;&#x53C2;&#x6570;&#x90FD;&#x662F;&#x53EF;&#x9009;&#xFF1A;</p><ul><li>rurl(&#x53EF;&#x9009;)&#x3002;</li></ul><p>&#x8868;&#x793A;&#x9700;&#x8981;&#x62E6;&#x622A;&#x7684; URL&#xFF0C;&#x53EF;&#x4EE5;&#x662F; URL &#x5B57;&#x7B26;&#x4E32;&#x6216; URL &#x6B63;&#x5219;&#x3002;&#x4F8B;&#x5982; //domain/list.json/&#x3001;&apos;/domian/list.json&apos;&#x3002;</p><ul><li>rtype(&#x53EF;&#x9009;)&#x3002;</li></ul><p>&#x8868;&#x793A;&#x9700;&#x8981;&#x62E6;&#x622A;&#x7684; Ajax &#x8BF7;&#x6C42;&#x7C7B;&#x578B;&#x3002;&#x4F8B;&#x5982; GET&#x3001;POST&#x3001;PUT&#x3001;DELETE &#x7B49;&#x3002;</p><ul><li>template(&#x53EF;&#x9009;)&#x3002;</li></ul><p>&#x8868;&#x793A;&#x6570;&#x636E;&#x6A21;&#x677F;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;&#x5BF9;&#x8C61;&#x6216;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x4F8B;&#x5982; { &apos;data|1-10&apos;:[{}] }&#x3001;&apos;@EMAIL&apos;&#x3002;</p><ul><li>function(options)(&#x53EF;&#x9009;)&#x3002;</li></ul><p>&#x8868;&#x793A;&#x7528;&#x4E8E;&#x751F;&#x6210;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x7684;&#x51FD;&#x6570;&#x3002;</p><ul><li>options&#xFF1A;&#x6307;&#x5411;&#x672C;&#x6B21;&#x8BF7;&#x6C42;&#x7684; Ajax &#x9009;&#x9879;&#x96C6;&#x3002;</li></ul><h5>&#x5173;&#x952E;&#x70B9;2&#xFF1A;&#x6A21;&#x677F;&#x751F;&#x6210;&#x8BED;&#x6CD5;&#xFF1A;</h5><ul><li><p>&#x6570;&#x636E;&#x6A21;&#x677F;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x7531; 3 &#x90E8;&#x5206;&#x6784;&#x6210;&#xFF1A;&#x5C5E;&#x6027;&#x540D;&#x3001;&#x751F;&#x6210;&#x89C4;&#x5219;&#x3001;&#x5C5E;&#x6027;&#x503C;&#xFF1A;</p><ul><li>// &#x5C5E;&#x6027;&#x540D; name</li><li>// &#x751F;&#x6210;&#x89C4;&#x5219; rule</li><li>// &#x5C5E;&#x6027;&#x503C; value</li><li>&apos;name|rule&apos;: value</li></ul></li><li>&#x5C5E;&#x6027;&#x540D; &#x548C; &#x751F;&#x6210;&#x89C4;&#x5219; &#x4E4B;&#x95F4;&#x7528;&#x7AD6;&#x7EBF; | &#x5206;&#x9694;&#x3002;</li><li>&#x751F;&#x6210;&#x89C4;&#x5219; &#x662F;&#x53EF;&#x9009;&#x7684;&#x3002;</li><li><p>&#x751F;&#x6210;&#x89C4;&#x5219; &#x6709; 7 &#x79CD;&#x683C;&#x5F0F;&#xFF1A;</p><ul><li>&apos;name|min-max&apos;: value</li><li>&apos;name|count&apos;: value</li><li>&apos;name|min-max.dmin-dmax&apos;: value</li><li>&apos;name|min-max.dcount&apos;: value</li><li>&apos;name|count.dmin-dmax&apos;: value</li><li>&apos;name|count.dcount&apos;: value</li><li>&apos;name|+step&apos;: value`</li></ul></li><li>&#x751F;&#x6210;&#x89C4;&#x5219; &#x7684; &#x542B;&#x4E49; &#x9700;&#x8981;&#x4F9D;&#x8D56; &#x5C5E;&#x6027;&#x503C;&#x7684;&#x7C7B;&#x578B; &#x624D;&#x80FD;&#x786E;&#x5B9A;&#x3002;</li><li>&#x5C5E;&#x6027;&#x503C; &#x4E2D;&#x53EF;&#x4EE5;&#x542B;&#x6709; @&#x5360;&#x4F4D;&#x7B26;&#x3002;</li><li>&#x5C5E;&#x6027;&#x503C; &#x8FD8;&#x6307;&#x5B9A;&#x4E86;&#x6700;&#x7EC8;&#x503C;&#x7684;&#x521D;&#x59CB;&#x503C;&#x548C;&#x7C7B;&#x578B;&#x3002;</li></ul><p>&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;<br>&#x6817;&#x5B50;1&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//string&#x8868;&#x793A;&#x5C5E;&#x6027;&#x540D;
//3&#x8868;&#x793A;&#x540E;&#x9762;&#x5C5E;&#x6027;&#x503C;&#x91CD;&#x590D;&#x6B21;&#x6570;
 Mock.mock({
  &quot;string|3&quot;: &quot;&#x2605;&quot;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-comment">//string&#x8868;&#x793A;&#x5C5E;&#x6027;&#x540D;</span>
<span class="hljs-comment">//3&#x8868;&#x793A;&#x540E;&#x9762;&#x5C5E;&#x6027;&#x503C;&#x91CD;&#x590D;&#x6B21;&#x6570;</span>
 Mock.mock({
  <span class="hljs-string">&quot;string|3&quot;</span>: <span class="hljs-string">&quot;&#x2605;&quot;</span>
})</code></pre><p>&#x7ED3;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x661F;&#x661F;&#x6570;&#x91CF;&#x4E3A;3
{
  &quot;string&quot;: &quot;&#x2605;&#x2605;&#x2605;&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-comment">//&#x661F;&#x661F;&#x6570;&#x91CF;&#x4E3A;3</span>
{
  <span class="hljs-string">&quot;string&quot;</span>: <span class="hljs-string">&quot;&#x2605;&#x2605;&#x2605;&quot;</span>
}</code></pre><p>&#x6817;&#x5B50;2&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// num&#x4E3A;&#x5C5E;&#x6027;&#x540D;
// &#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5927;&#x4E8E;&#x7B49;&#x4E8E;1&#xFF0C;&#x5C0F;&#x4E8E;&#x7B49;&#x4E8E;100 &#x7684;&#x6574;&#x6570;&#xFF0C;&#x5C5E;&#x6027;&#x503C;100&#x53EA;&#x662F;&#x7528;&#x6765;&#x786E;&#x5B9A;&#x7C7B;&#x578B;
Mock.mock({
  &quot;num|1-100&quot;: 100
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-comment">// num&#x4E3A;&#x5C5E;&#x6027;&#x540D;</span>
<span class="hljs-comment">// &#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5927;&#x4E8E;&#x7B49;&#x4E8E;1&#xFF0C;&#x5C0F;&#x4E8E;&#x7B49;&#x4E8E;100 &#x7684;&#x6574;&#x6570;&#xFF0C;&#x5C5E;&#x6027;&#x503C;100&#x53EA;&#x662F;&#x7528;&#x6765;&#x786E;&#x5B9A;&#x7C7B;&#x578B;</span>
Mock.mock({
  <span class="hljs-string">&quot;num|1-100&quot;</span>: <span class="hljs-number">100</span>
})</code></pre><p>&#x7ED3;&#x679C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;number&quot;: 8
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;number&quot;</span>: <span class="hljs-number">8</span>
}
</code></pre><p>&#x5176;&#x4ED6;&#x8BBE;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//  &#x8BBE;&#x7F6E;&#x5168;&#x5C40;&#x5EF6;&#x65F6; &#x6CA1;&#x6709;&#x5EF6;&#x65F6;&#x7684;&#x8BDD;&#x6709;&#x65F6;&#x5019;&#x4F1A;&#x68C0;&#x6D4B;&#x4E0D;&#x5230;&#x6570;&#x636E;&#x53D8;&#x5316; &#x5EFA;&#x8BAE;&#x4FDD;&#x7559;

Mock.setup({
  timeout: &apos;300-600&apos;
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-comment">//  &#x8BBE;&#x7F6E;&#x5168;&#x5C40;&#x5EF6;&#x65F6; &#x6CA1;&#x6709;&#x5EF6;&#x65F6;&#x7684;&#x8BDD;&#x6709;&#x65F6;&#x5019;&#x4F1A;&#x68C0;&#x6D4B;&#x4E0D;&#x5230;&#x6570;&#x636E;&#x53D8;&#x5316; &#x5EFA;&#x8BAE;&#x4FDD;&#x7559;</span>

Mock.<span class="hljs-built_in">setup</span>({
  timeout: <span class="hljs-string">&apos;300-600&apos;</span>
})
</code></pre><h5>&#x6A21;&#x62DF;&#x767B;&#x5F55;</h5><p>// &#x6A21;&#x62DF;&#x767B;&#x5F55;<code>user/login</code>&#x63A5;&#x53E3;&#xFF0C;&#x5BF9;&#x5E94;&#x7684;&#x51FD;&#x6570;&#x662F;<code>loginByUsername</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mock.mock(/\/user\/login/, &apos;post&apos;, loginByUsername)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code style="word-break:break-word;white-space:initial">Mock.mock(<span class="hljs-regexp">/\/</span>user\<span class="hljs-regexp">/login/</span>, <span class="hljs-string">&apos;post&apos;</span>, loginByUsername)</code></pre><p>&#x5F53;&#x8C03;&#x7528;&#x767B;&#x5F55;&#x63A5;&#x53E3;<code>user/loign</code>&#x65F6;&#x5019;&#x4F1A;&#x81EA;&#x52A8;&#x5BF9;&#x5E94;&#x5230;<code>loginByUsername</code>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;<br>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x4F1A;&#x8FD4;&#x56DE;&#x662F;&#x5426;&#x767B;&#x5F55;&#x6210;&#x529F;&#x6570;&#x636E;&#x3002;&#x8FD4;&#x56DE;&#x6210;&#x529F;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5C31;&#x662F;&#x767B;&#x5F55;&#x6210;&#x529F;&#x4E86;&#xFF0C;&#x5426;&#x5219;&#x76F8;&#x53CD;&#x3002;</p><p>mock&#x6A21;&#x62DF;&#x767B;&#x5F55;ok</p><p>&#x63A5;&#x4E0B;&#x6765;&#x4ECB;&#x7ECD;&#x6A21;&#x62DF;&#x8868;&#x683C;&#x589E;&#x5220;&#x6539;&#x67E5;&#x3002;<br>&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x5DEE;&#x4E0D;&#x591A;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7528;&#x6237;&#x76F8;&#x5173;
Mock.mock(/\/user\/listpage/, &apos;get&apos;, getUserList) //&#x6A21;&#x62DF;&#x5206;&#x9875;&#x67E5;&#x8BE2;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x63A5;&#x53E3;
Mock.mock(/\/user\/remove/, &apos;get&apos;, deleteUser)   //&#x6A21;&#x62DF;&#x5220;&#x9664;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x63A5;&#x53E3;
Mock.mock(/\/user\/add/, &apos;get&apos;, createUser)     //&#x6A21;&#x62DF;&#x6DFB;&#x52A0;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x63A5;&#x53E3;
Mock.mock(/\/user\/edit/, &apos;get&apos;, updateUser)   //&#x6A21;&#x62DF;&#x7F16;&#x8F91;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x63A5;&#x53E3;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-comment">// &#x7528;&#x6237;&#x76F8;&#x5173;</span>
Mock.mock(<span class="hljs-regexp">/\/</span>user\<span class="hljs-regexp">/listpage/</span>, <span class="hljs-string">&apos;get&apos;</span>, getUserList) <span class="hljs-comment">//&#x6A21;&#x62DF;&#x5206;&#x9875;&#x67E5;&#x8BE2;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x63A5;&#x53E3;</span>
Mock.mock(<span class="hljs-regexp">/\/</span>user\<span class="hljs-regexp">/remove/</span>, <span class="hljs-string">&apos;get&apos;</span>, deleteUser)   <span class="hljs-comment">//&#x6A21;&#x62DF;&#x5220;&#x9664;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x63A5;&#x53E3;</span>
Mock.mock(<span class="hljs-regexp">/\/</span>user\<span class="hljs-regexp">/add/</span>, <span class="hljs-string">&apos;get&apos;</span>, createUser)     <span class="hljs-comment">//&#x6A21;&#x62DF;&#x6DFB;&#x52A0;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x63A5;&#x53E3;</span>
Mock.mock(<span class="hljs-regexp">/\/</span>user\<span class="hljs-regexp">/edit/</span>, <span class="hljs-string">&apos;get&apos;</span>, updateUser)   <span class="hljs-comment">//&#x6A21;&#x62DF;&#x7F16;&#x8F91;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x63A5;&#x53E3;</span></code></pre><p>&#x5C31;&#x662F;&#x8FD4;&#x56DE;&#x6761;&#x4EF6;&#x67E5;&#x8BE2;&#x540E;&#x7684;&#x96C6;&#x5408;&#x5047;&#x6570;&#x636E;&#x800C;&#x5DF2;&#xFF0C;&#x5047;&#x6570;&#x636E;&#x662F;mock.js&#x6A21;&#x62DF;&#x7684;&#x3002;</p><p>&#x5148;&#x5FAA;&#x73AF;&#x6DFB;&#x52A0;60&#x4E2A;&#x5047;&#x7528;&#x6237;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let List = []
const count = 60

for (let i = 0; i &lt; count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock(&apos;@county(true)&apos;),
    &apos;age|18-60&apos;: 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>let <span class="hljs-built_in">List</span> = []
const <span class="hljs-built_in">count</span> = <span class="hljs-number">60</span>

<span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">count</span>; i++) {
  <span class="hljs-built_in">List</span>.push(Mock.mock({
    id: Mock.<span class="hljs-built_in">Random</span>.guid(),
    <span class="hljs-built_in">name</span>: Mock.<span class="hljs-built_in">Random</span>.cname(),
    addr: Mock.mock(<span class="hljs-string">&apos;@county(true)&apos;</span>),
    <span class="hljs-string">&apos;age|18-60&apos;</span>: <span class="hljs-number">1</span>,
    birth: Mock.<span class="hljs-built_in">Random</span>.<span class="hljs-built_in">date</span>(),
    sex: Mock.<span class="hljs-built_in">Random</span>.integer(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>)
  }))
}</code></pre><p>&#x6211;&#x4EEC;&#x518D;&#x6765;&#x770B;<code>getUserList</code>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x662F;&#x8FD4;&#x56DE;&#x5206;&#x9875;&#x6761;&#x4EF6;&#x67E5;&#x8BE2;&#x7684;&#x5047;&#x6570;&#x636E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  getUserList: config =&gt; {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = List.filter(user =&gt; {
      if (name &amp;&amp; user.name.indexOf(name) === -1) return false
      return true
    })

    const pageList = mockList.filter((item, index) =&gt; index &lt; limit * page &amp;&amp; index &gt;= limit * (page - 1))

    return {
      code: 0,
      data: {
        total: mockList.length,
        users: pageList
      }
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  getUserList: <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> { name, page = <span class="hljs-number">1</span>, limit = <span class="hljs-number">20</span> } = param2Obj(config.url)

    <span class="hljs-keyword">const</span> mockList = List.filter(<span class="hljs-function"><span class="hljs-params">user</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (name &amp;&amp; user.name.indexOf(name) === <span class="hljs-number">-1</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    })

    <span class="hljs-keyword">const</span> pageList = mockList.filter(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> index &lt; limit * page &amp;&amp; index &gt;= limit * (page - <span class="hljs-number">1</span>))

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">code</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">total</span>: mockList.length,
        <span class="hljs-attr">users</span>: pageList
      }
    }
  }</code></pre><p>&#x5173;&#x4E8E;&#x589E;&#x52A0;&#xFF0C;&#x5220;&#x9664;&#x548C;&#x4FEE;&#x6539;&#x90FD;&#x53EA;&#x9700;&#x8981;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6570;&#x636E;<code>message=&quot;&#x64CD;&#x4F5C;&#x6210;&#x529F;&quot;</code>&#x5373;&#x53EF;&#x3002;</p><h5>&#x7B2C;&#x4E09;&#x6B65;&#x5728;main.js&#x91CC;&#x9762;&#x5F15;&#x5165;&#x521A;&#x521A;&#x6211;&#x4EEC;&#x5199;&#x597D;&#x7684;src/mock/index.js</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &apos;./mock&apos; // simulation data &#x8DEF;&#x5F84;index.js&#x53EF;&#x7701;&#x7565;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./mock&apos;</span> <span class="hljs-comment">// simulation data &#x8DEF;&#x5F84;index.js&#x53EF;&#x7701;&#x7565;</span></code></pre><h4>&#x81F3;&#x6B64;&#x6574;&#x5408;&#x5B8C;&#x6BD5; <a href="https://github.com/mgbq/nxAdmin-template" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;&#x5730;&#x5740;</a></h4><h4>Vue&#x5B66;&#x4E60;&#x5927;&#x4F6C;&#x7FA4;493671066&#xFF0C;&#x7F8E;&#x5973;&#x591A;&#x591A;&#x3002;&#x8001;&#x53F8;&#x673A;&#x5FEB;&#x4E0A;&#x8F66;&#xFF0C;&#x6765;&#x4E0D;&#x53CA;&#x89E3;&#x91CA;&#x4E86;&#x3002;</h4><h4>&#x6E9C;&#x4E86;&#x6E9C;&#x4E86;</h4><h4>&#x4F5C;&#x8005;&#x76F8;&#x5173;Vue&#x6587;&#x7AE0;</h4><p><a href="https://github.com/mgbq/vue-permission" rel="nofollow noreferrer" target="_blank">&#x57FA;&#x4E8E;Vue2.0&#x5B9E;&#x73B0;&#x540E;&#x53F0;&#x7CFB;&#x7EDF;&#x6743;&#x9650;&#x63A7;&#x5236;</a></p><p><a href="https://github.com/mgbq/front-end-Doc" rel="nofollow noreferrer" target="_blank">&#x524D;&#x7AEF;&#x6587;&#x6863;&#x6C47;&#x603B;</a></p><p><a href="https://github.com/mgbq/Vue-admin" rel="nofollow noreferrer" target="_blank">VUE2.0&#x589E;&#x5220;&#x6539;&#x67E5;&#x9644;&#x7F16;&#x8F91;&#x6DFB;&#x52A0;model(&#x5F39;&#x6846;)&#x7EC4;&#x4EF6;&#x5171;&#x7528;</a></p><h2 id="articleHeader1">&#x6253;&#x8D4F; &#x8877;&#x5FC3;&#x7684;&#x8868;&#x793A;&#x611F;&#x8C22;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000013472321?w=425&amp;h=425" src="https://static.alili.tech/img/remote/1460000013472321?w=425&amp;h=425" alt="&#x6253;&#x8D4F;" title="&#x6253;&#x8D4F;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue+Mock.js模拟登录和表格的增删改查

## 原文链接
[https://segmentfault.com/a/1190000015787867](https://segmentfault.com/a/1190000015787867)


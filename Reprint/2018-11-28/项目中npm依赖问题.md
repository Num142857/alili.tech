---
title: '项目中npm依赖问题' 
date: 2018-11-28 2:30:11
hidden: true
slug: 01nq5aqd7xxy
categories: [reprint]
---

{{< raw >}}
<p>&#x6700;&#x8FD1;&#x5F00;&#x53D1;&#x9047;&#x5230;&#x4E00;&#x4E2A;npm&#x4F9D;&#x8D56;&#x5BFC;&#x81F4;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x62A5;&#x9519;&#x5982;&#x4E0B;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000015252502?w=1076&amp;h=206" src="https://static.alili.tech/img/remote/1460000015252502?w=1076&amp;h=206" alt="slot-error" title="slot-error" style="cursor:pointer;display:inline"></span><br>&#x7ECF;&#x8FC7;&#x9519;&#x8BEF;&#x5B9A;&#x4F4D;&#xFF0C;&#x53D1;&#x73B0;&#x539F;&#x56E0;&#x662F;&#x9879;&#x76EE;&#x4E2D;&#x7528;&#x4E86;vue&#x4E0D;&#x540C;&#x7248;&#x672C;&#x8BED;&#x6CD5;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x5982;&#x4E0B;&#x6240;&#x793A; &#xFF0C;&#x91CD;&#x70B9;&#x5173;&#x6CE8;&#x7684;&#x662F;&#x88AB;**&#x5305;&#x56F4;&#x7684;&#x5199;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;el-table-column
          label=&quot;&#x6210;&#x4EA4;&#x5355;&#x6570;&quot;
          align=&quot;center&quot;
          min-width=&quot;100&quot;&gt;
        **  &lt;template scope=&quot;scope&quot;&gt;**
            &lt;a :href=&quot;scope.row.quoteInfo.trdCntUrl&quot; v-if=&quot;scope.row.quoteInfo.trd_cnt &gt; 0&quot; target=&quot;_blank&quot;&gt;"{{"scope.row.quoteInfo.trd_cnt"}}"&lt;/a&gt;
            &lt;span v-else&gt;"{{"scope.row.quoteInfo.trd_cnt"}}"&lt;/span&gt;
          &lt;/template&gt;
        &lt;/el-table-column&gt;

        &lt;el-table-column
          label=&quot;&#x4E3B;&#x8425;&#x4EA7;&#x54C1;&quot;
          class-name=&quot;item nb&quot;
          align=&quot;center&quot;
          min-width=&quot;100&quot;&gt;
       **   &lt;template slot-scope=&quot;scope&quot;&gt;**
            &lt;el-table
              :data=&quot;scope.row.preferenceList&quot;
              size=&quot;100%&quot;
              :show-header=false&gt;
              &lt;el-table-column
                class-name=&quot;qqqqqq&quot;
                prop=&quot;mainIndustry&quot;
                show-overflow-tooltip&gt;
              &lt;/el-table-column&gt;
            &lt;/el-table&gt;
          &lt;/template&gt;
        &lt;/el-table-column&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
          <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;&#x6210;&#x4EA4;&#x5355;&#x6570;&quot;</span>
          <span class="hljs-attr">align</span>=<span class="hljs-string">&quot;center&quot;</span>
          <span class="hljs-attr">min-width</span>=<span class="hljs-string">&quot;100&quot;</span>&gt;</span>
        **  <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">&quot;scope&quot;</span>&gt;</span>**
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">&quot;scope.row.quoteInfo.trdCntUrl&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;scope.row.quoteInfo.trd_cnt &gt; 0&quot;</span> <span class="hljs-attr">target</span>=<span class="hljs-string">&quot;_blank&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"scope.row.quoteInfo.trd_cnt"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-else</span>&gt;</span></span><span class="hljs-template-variable">"{{"scope.row.quoteInfo.trd_cnt"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
          <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;&#x4E3B;&#x8425;&#x4EA7;&#x54C1;&quot;</span>
          <span class="hljs-attr">class-name</span>=<span class="hljs-string">&quot;item nb&quot;</span>
          <span class="hljs-attr">align</span>=<span class="hljs-string">&quot;center&quot;</span>
          <span class="hljs-attr">min-width</span>=<span class="hljs-string">&quot;100&quot;</span>&gt;</span>
       **   <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">&quot;scope&quot;</span>&gt;</span>**
            <span class="hljs-tag">&lt;<span class="hljs-name">el-table</span>
              <span class="hljs-attr">:data</span>=<span class="hljs-string">&quot;scope.row.preferenceList&quot;</span>
              <span class="hljs-attr">size</span>=<span class="hljs-string">&quot;100%&quot;</span>
              <span class="hljs-attr">:show-header</span>=<span class="hljs-string">false</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
                <span class="hljs-attr">class-name</span>=<span class="hljs-string">&quot;qqqqqq&quot;</span>
                <span class="hljs-attr">prop</span>=<span class="hljs-string">&quot;mainIndustry&quot;</span>
                <span class="hljs-attr">show-overflow-tooltip</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span></span></code></pre><p>&#x4E4B;&#x524D;&#x7684;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x7528;&#x4E86;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#x6307;&#x5B9A;&#x63D2;&#x69FD;&#xFF08;slot&#xFF09;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x67E5;&#x770B;&#x4E86;&#x4E0B;&#x5B98;&#x65B9;&#x7684;&#x66F4;&#x65B0;&#x8BB0;&#x5F55;</p><p>In <a href="https://gist.github.com/yyx990803/9bdff05e5468a60ced06c29c39114c6b#simplified-scoped-slots-usage" rel="nofollow noreferrer" target="_blank">2.5</a><button class="btn btn-xs btn-default ml10 preview" data-url="yyx990803/9bdff05e5468a60ced06c29c39114c6b" data-typeid="1">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>, the scope attribute has been deprecated (it still works, but you will get a soft warning). Instead, we now use slot-scope to denote a scoped slot, and it can be used on a normal element/component in addition to &lt;template&gt;</p><p>&#x610F;&#x601D;&#x5C31;&#x662F;&#x8BF4;&#x5728;2.5&#x4EE5;&#x540E;,&#x628A;scope&#x6362;&#x6210;&#x4E86;slop-scope,&#x800C;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x4E2D;&#xFEFF;package.json&#x4E2D;&#x7684;vue&#x7248;&#x672C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#xFEFF;&quot;vue&quot;: &quot;^2.3.3&quot;," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code style="word-break:break-word;white-space:initial">&#xFEFF;<span class="hljs-string">&quot;vue&quot;</span>: <span class="hljs-string">&quot;^2.3.3&quot;</span>,</code></pre><p>&#xFEFF;package.lock&#x4E2D;&#x7684;&#x7248;&#x672C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;vue&quot;: {
  &quot;version&quot;: &quot;2.5.9&quot;,
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;vue&quot;</span>: {
  <span class="hljs-string">&quot;version&quot;</span>: <span class="hljs-string">&quot;2.5.9&quot;</span>,
}</code></pre><p>package.lock&#x6587;&#x4EF6;&#x662F;&#x540E;&#x671F;&#x6DFB;&#x52A0;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;npm5.0+&#x540E;&#x624D;&#x652F;&#x6301;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x3002;&#x901A;&#x8FC7;package.lock&#x53EF;&#x4EE5;&#x8BB0;&#x5F55;&#x548C;&#x9501;&#x5B9A;&#x4F9D;&#x8D56;&#x6811;&#x7684;&#x4FE1;&#x606F;&#x3002;&#x521D;&#x6B21;install&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x751F;&#x6210;package.lock&#x6587;&#x4EF6;&#x3002; &#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x5728;V5.4.2&#x7248;&#x672C;&#x540E;&#x5982;&#x679C;&#x6539;&#x4E86;package.json&#xFF0C;&#x4E14;package.json&#x548C;lock&#x6587;&#x4EF6;&#x4E0D;&#x540C;&#xFF0C;&#x90A3;&#x4E48;&#x6267;&#x884C;npm install&#x65F6;npm&#x4F1A;&#x6839;&#x636E;package&#x4E2D;&#x7684;&#x7248;&#x672C;&#x53F7;&#x4EE5;&#x53CA;&#x8BED;&#x4E49;&#x542B;&#x4E49;&#x53BB;&#x4E0B;&#x8F7D;&#x6700;&#x65B0;&#x7684;&#x5305;&#xFF0C;&#x5E76;&#x66F4;&#x65B0;package.lock&#x6587;&#x4EF6;&#x3002;<br>&#x9501;&#x5B9A;&#x540E;&#x5E26;&#x6765;&#x7684;&#x7684;&#x95EE;&#x9898;&#x662F;&#x6BCF;&#x6B21;&#x4F9D;&#x8D56;&#x5305;&#x6709;bugfix&#xFF08;&#x4FEE;&#x8BA2;&#x7248;&#x672C;&#x53F7;&#xFF09;&#x6216;&#x8005;&#x8FDB;&#x884C;&#x517C;&#x5BB9;&#x6027;&#x529F;&#x80FD;&#x6DFB;&#x52A0;&#xFF08;&#x6B21;&#x7248;&#x672C;&#x53F7;&#xFF09;&#x7248;&#x672C;&#x66F4;&#x65B0;&#x540E;&#xFF0C;install&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x3002;</p><p>&#x5728;&#x67E5;&#x660E;&#x8D77;&#x56E0;&#x540E;&#xFF0C;&#x89E3;&#x51B3;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x5B89;&#x88C5;&#x4F7F;&#x7528;&#x65B0;&#x7684;vue&#x7248;&#x672C;&#xFF0C;&#x628A;&#x539F;&#x5148;&#x7684;&#x4F9D;&#x8D56;&#x5305;&#x5220;&#x6389;&#xFF0C;&#x6B64;&#x65F6;&#x6709;&#x9047;&#x5230;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x7684;cnpm&#x662F;4.X.X&#xFF0C;&#x6BCF;&#x6B21;&#x5B89;&#x88C5;&#x7684;&#x65F6;&#x5019;&#x662F;2.3.3&#xFF0C;&#x800C;&#x6362;&#x7528;npm&#xFF08;5.6&#xFF09;&#x5B89;&#x88C5;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#xFF08;&#x7ED3;&#x679C;&#x4F1A;&#x662F;package.lock&#x6307;&#x5B9A;&#x7684;&#x7248;&#x672C;&#xFF09;&#x6216;&#x8005;&#x53BB;&#x6389;&#xFEFF;package.lock&#x91CD;&#x65B0;install&#xFF08;&#x7ED3;&#x679C;&#x4F1A;&#x662F;&#x6700;&#x65B0;&#x7684;vue&#x5305;&#x7248;&#x672C;&#xFF0C;&#x8FD8;&#x6709;&#x914D;&#x5957;&#x7684;&#x5176;&#x5B83;&#x4F9D;&#x8D56;&#x66F4;&#x65B0;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x279C;  small git:(20180531162035883_1003364(hrd5)) &#x2717; cnpm -v
4.3.2
  small git:(20180531162035883_1003364(hrd5)) &#x2717; which cnpm
/usr/local/bin/cnpm
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>&#x279C;  small <span class="hljs-string">git:</span>(<span class="hljs-number">20180531162035883</span>_1003364(hrd5)) &#x2717; cnpm -v
<span class="hljs-number">4.3</span><span class="hljs-number">.2</span>
  small <span class="hljs-string">git:</span>(<span class="hljs-number">20180531162035883</span>_1003364(hrd5)) &#x2717; which cnpm
<span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/bin/</span>cnpm
</code></pre><p>&#x5982;&#x4E0A;&#x6240;&#x793A;&#xFF0C;cnpm&#x7684;&#x91CD;&#x65B0;&#x5B89;&#x88C5;&#x4E86;&#x4E0D;&#x6210;&#x529F;&#x7684;&#x539F;&#x56E0;&#x662F;&#x6211;&#x4F7F;&#x7528;&#x4E86;nvm&#x6765;&#x7BA1;&#x7406;&#xFF0C;&#x6BCF;&#x6B21;&#x662F;&#x5B89;&#x88C5;&#x5BF9;&#x5E94;&#x5230;nvm&#x5B89;&#x88C5;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x5BF9;&#x5E94;&#x5F53;&#x524D;node&#x73AF;&#x5883;&#x7684;node-modules&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x628A;&#x8001;&#x7684;&#x5168;&#x5C40;cnpm&#x5220;&#x4E86;&#xFF0C;&#x91CD;&#x65B0;&#x88C5;&#x4E86;&#x4E0B;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" small git:(20180531162035883_1003364(hrd5)) &#x2717; cnpm -v
cnpm@6.0.0
  small git:(20180531162035883_1003364(hrd5)) &#x2717; which cnpm
/Users/jsdt/.nvm/versions/node/v8.9.4/bin/cnpm
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code> small <span class="hljs-string">git:</span>(<span class="hljs-number">20180531162035883</span>_1003364(hrd5)) &#x2717; cnpm -v
cnpm@<span class="hljs-number">6.0</span><span class="hljs-number">.0</span>
  small <span class="hljs-string">git:</span>(<span class="hljs-number">20180531162035883</span>_1003364(hrd5)) &#x2717; which cnpm
<span class="hljs-regexp">/Users/</span>jsdt<span class="hljs-regexp">/.nvm/</span>versions<span class="hljs-regexp">/node/</span>v8<span class="hljs-number">.9</span><span class="hljs-number">.4</span><span class="hljs-regexp">/bin/</span>cnpm
</code></pre><p>&#x53C2;&#x8003;&#x94FE;&#x63A5;<br><a href="https://gist.github.com/yyx990803/9bdff05e5468a60ced06c29c39114c6b#simplified-scoped-slots-usage" rel="nofollow noreferrer" target="_blank">https://gist.github.com/yyx99...</a><button class="btn btn-xs btn-default ml10 preview" data-url="yyx990803/9bdff05e5468a60ced06c29c39114c6b" data-typeid="1">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button><br><a href="https://cloud.tencent.com/developer/article/1020507" rel="nofollow noreferrer" target="_blank">https://cloud.tencent.com/dev...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
项目中npm依赖问题

## 原文链接
[https://segmentfault.com/a/1190000015252499](https://segmentfault.com/a/1190000015252499)


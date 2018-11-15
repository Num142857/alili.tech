---
title: vue 时钟组件
hidden: true
categories: reprint
slug: 5dfe4e93
date: 2018-11-05 02:30:10
---

{{< raw >}}
<p>&#x63A8;&#x8350;&#x4E00;&#x4E2A;&#x65F6;&#x949F;&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x65F6;&#x95F4;&#x3002;&#x6B22;&#x8FCE;star&#x1F44F;&#x1F44F;</p><p><a href="https://github.com/bestvist/vue-clock2" rel="nofollow noreferrer" target="_blank">GitHub&#x5730;&#x5740;</a></p><h2 id="articleHeader0">&#x5B89;&#x88C5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-clock2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> vue-clock2</code></pre><h2 id="articleHeader1">&#x4F8B;&#x5B50;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;clock :time=&quot;time&quot;&gt;&lt;/clock&gt;
&lt;/template&gt;

&lt;script&gt;
  import Clock from &apos;vue-clock2&apos;;
  export default {
    components: { Clock },
    data () {
      return {
          time: &apos;10:40&apos;
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">clock</span> <span class="hljs-attr">:time</span>=<span class="hljs-string">&quot;time&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">clock</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Clock <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-clock2&apos;</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: { Clock },
    data () {
      <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">time</span>: <span class="hljs-string">&apos;10:40&apos;</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016656888" src="https://static.alili.tech/img/remote/1460000016656888" alt="" title="" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 时钟组件

## 原文链接
[https://segmentfault.com/a/1190000016656885](https://segmentfault.com/a/1190000016656885)


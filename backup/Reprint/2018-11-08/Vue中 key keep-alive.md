---
title: Vue中 key keep-alive
hidden: true
categories: [reprint]
slug: 9da4289c
date: 2018-11-08 02:30:09
---

{{< raw >}}
<h2 id="articleHeader0">keep-alive key</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;&lt;/title&gt;
    &lt;script type=&quot;text/javascript&quot; src=&quot;./vue.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id=&quot;app&quot;&gt;
        &lt;keep-alive&gt;
            &lt;child-component key=&quot;1&quot; v-if=&quot;seen&quot; name=&quot;1&quot;&gt;&lt;/child-component&gt;
            &lt;child-component key=&quot;2&quot; v-if=&quot;!seen&quot; name=&quot;2&quot;&gt;&lt;/child-component&gt;
        &lt;/keep-alive&gt;
        &lt;button @click=&quot;toggle&quot;&gt;toggle&lt;/button&gt;
    &lt;/div&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
        Vue.component(&apos;child-component&apos;, {
            template: `&lt;input type=&quot;text&quot; placeholder=&quot;enter&quot;&gt;`,
            data() {
                return {}
            },
            props: [&quot;name&quot;],
            mounted() {
                console.log(`${this.name} mounted`)
            }
        })
        const vm = new Vue({
            el: &quot;#app&quot;,
            data: {
                seen: true
            },
            methods: {
                toggle() {
                    this.seen = !this.seen;
                }
            }
        })
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./vue.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span> <span class="hljs-attr">key</span>=<span class="hljs-string">&quot;1&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;seen&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span> <span class="hljs-attr">key</span>=<span class="hljs-string">&quot;2&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;!seen&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;toggle&quot;</span>&gt;</span>toggle<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
        Vue.component(<span class="hljs-string">&apos;child-component&apos;</span>, {
            <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;input type=&quot;text&quot; placeholder=&quot;enter&quot;&gt;`</span>,
            data() {
                <span class="hljs-keyword">return</span> {}
            },
            <span class="hljs-attr">props</span>: [<span class="hljs-string">&quot;name&quot;</span>],
            mounted() {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> mounted`</span>)
            }
        })
        <span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">&quot;#app&quot;</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">seen</span>: <span class="hljs-literal">true</span>
            },
            <span class="hljs-attr">methods</span>: {
                toggle() {
                    <span class="hljs-keyword">this</span>.seen = !<span class="hljs-keyword">this</span>.seen;
                }
            }
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>key&#x662F;&#x6807;&#x8BC6;&#x5143;&#x7D20;&#x4E0D;&#x518D;&#x88AB;&#x590D;&#x7528;&#xFF0C;&#x6CE8;&#x610F;key&#x662F;Vue&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x4FDD;&#x7559;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4E0D;&#x80FD;&#x4F5C;&#x4E3A;prop&#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x770B;&#x5230;Vue&#x7684;&#x62A5;&#x9519;</p><p>&#x4F46;&#x662F;keep-alive&#x6807;&#x8BC6;&#x4E0D;&#x91CD;&#x590D;&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x53EA;&#x4F1A;&#x89E6;&#x53D1;&#x4E00;&#x6B21;<code>created mounted</code>&#x4E8B;&#x4EF6;&#xFF0C;</p><p>&#x5229;&#x7528;&#x4E24;&#x8005;&#x53EF;&#x4EE5;&#x5BF9;&#x7EC4;&#x4EF6;&#x7684;&#x590D;&#x7528;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#x7CBE;&#x7EC6;&#x7684;&#x7BA1;&#x7406;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue中 key keep-alive

## 原文链接
[https://segmentfault.com/a/1190000016432362](https://segmentfault.com/a/1190000016432362)


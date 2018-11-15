---
title: Vue2 后台管理系统解决方案
hidden: true
categories: reprint
slug: 8a357947
date: 2018-10-24 02:30:09
---

{{< raw >}}

                    
<p>&#x57FA;&#x4E8E;Vue.js 2.x&#x7CFB;&#x5217; + Element UI &#x7684;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;</p>
<blockquote>
<p>github&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/lin-xin/vue-manage-system" rel="nofollow noreferrer" target="_blank">https://github.com/lin-xin/vue-manage-system</a></p>
<p>demo&#x5730;&#x5740;&#xFF1A;<a href="http://blog.gdfengshuo.com/example/work/" rel="nofollow noreferrer" target="_blank">http://blog.gdfengshuo.com/example/work/</a></p>
</blockquote>
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2>
<p>&#x4E4B;&#x524D;&#x5728;&#x516C;&#x53F8;&#x7528;&#x4E86;Vue + Element&#x7EC4;&#x4EF6;&#x5E93;&#x505A;&#x4E86;&#x4E2A;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&#xFF0C;&#x57FA;&#x672C;&#x5F88;&#x591A;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5F15;&#x7528;&#x7EC4;&#x4EF6;&#x5E93;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x6709;&#x4E00;&#x4E9B;&#x9700;&#x6C42;&#x65E0;&#x6CD5;&#x6EE1;&#x8DB3;&#x3002;&#x50CF;&#x56FE;&#x7247;&#x88C1;&#x526A;&#x4E0A;&#x4F20;&#x3001;&#x5BCC;&#x6587;&#x672C;&#x7F16;&#x8F91;&#x5668;&#x3001;&#x56FE;&#x8868;&#x7B49;&#x8FD9;&#x4E9B;&#x5728;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&#x4E2D;&#x5F88;&#x5E38;&#x89C1;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x5F15;&#x7528;&#x5176;&#x4ED6;&#x7684;&#x7EC4;&#x4EF6;&#x624D;&#x80FD;&#x5B8C;&#x6210;&#x3002;&#x4ECE;&#x5BFB;&#x627E;&#x7EC4;&#x4EF6;&#xFF0C;&#x5230;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x9047;&#x5230;&#x4E86;&#x5F88;&#x591A;&#x95EE;&#x9898;&#xFF0C;&#x4E5F;&#x79EF;&#x7D2F;&#x4E86;&#x5B9D;&#x8D35;&#x7684;&#x7ECF;&#x9A8C;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x5C31;&#x628A;&#x5F00;&#x53D1;&#x8FD9;&#x4E2A;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&#x7684;&#x7ECF;&#x9A8C;&#xFF0C;&#x603B;&#x7ED3;&#x6210;&#x8FD9;&#x4E2A;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;</p>
<p>&#x8BE5;&#x65B9;&#x6848;&#x4F5C;&#x4E3A;&#x4E00;&#x5957;&#x591A;&#x529F;&#x80FD;&#x7684;&#x540E;&#x53F0;&#x6846;&#x67B6;&#x6A21;&#x677F;&#xFF0C;&#x9002;&#x7528;&#x4E8E;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x7684;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&#xFF08;Web Management System&#xFF09;&#x5F00;&#x53D1;&#x3002;&#x57FA;&#x4E8E;vue.js,&#x4F7F;&#x7528;vue-cli&#x811A;&#x624B;&#x67B6;&#x5FEB;&#x901F;&#x751F;&#x6210;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#xFF0C;&#x5F15;&#x7528;Element UI&#x7EC4;&#x4EF6;&#x5E93;&#xFF0C;&#x65B9;&#x4FBF;&#x5F00;&#x53D1;&#x5FEB;&#x901F;&#x7B80;&#x6D01;&#x597D;&#x770B;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x5206;&#x79BB;&#x989C;&#x8272;&#x6837;&#x5F0F;&#xFF0C;&#x652F;&#x6301;&#x624B;&#x52A8;&#x5207;&#x6362;&#x4E3B;&#x9898;&#x8272;&#xFF0C;&#x800C;&#x4E14;&#x5F88;&#x65B9;&#x4FBF;&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x4E3B;&#x9898;&#x8272;&#x3002;</p>
<h2 id="articleHeader1">&#x529F;&#x80FD;</h2>
<ul>
<li>[x] Element UI</li>
<li>[x] &#x767B;&#x5F55;/&#x6CE8;&#x9500;</li>
<li>[x] &#x8868;&#x683C;</li>
<li>[x] &#x8868;&#x5355;</li>
<li>[x] &#x56FE;&#x8868;</li>
<li>[x] &#x5BCC;&#x6587;&#x672C;&#x7F16;&#x8F91;&#x5668;</li>
<li>[x] markdown&#x7F16;&#x8F91;&#x5668;</li>
<li>[x] &#x56FE;&#x7247;&#x62D6;&#x62FD;/&#x88C1;&#x526A;&#x4E0A;&#x4F20;</li>
<li>[x] &#x652F;&#x6301;&#x5207;&#x6362;&#x4E3B;&#x9898;&#x8272;</li>
</ul>
<h2 id="articleHeader2">&#x6A21;&#x677F;&#x5B89;&#x88C5;&#x6B65;&#x9AA4;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/lin-xin/manage-system.git        // &#x628A;&#x6A21;&#x677F;&#x4E0B;&#x8F7D;&#x5230;&#x672C;&#x5730;
cd manage-system                                            // &#x8FDB;&#x5165;&#x6A21;&#x677F;&#x76EE;&#x5F55;
npm install                                                    // &#x5B89;&#x88C5;&#x9879;&#x76EE;&#x4F9D;&#x8D56;&#xFF0C;&#x7B49;&#x5F85;&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x4E4B;&#x540E;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>git clone <span class="hljs-keyword">https</span>://github.com/lin-xin/manage-<span class="hljs-keyword">system</span>.git       <span class="hljs-comment"> // &#x628A;&#x6A21;&#x677F;&#x4E0B;&#x8F7D;&#x5230;&#x672C;&#x5730;</span>
cd manage-<span class="hljs-keyword">system</span>                                           <span class="hljs-comment"> // &#x8FDB;&#x5165;&#x6A21;&#x677F;&#x76EE;&#x5F55;</span>
npm install                                                   <span class="hljs-comment"> // &#x5B89;&#x88C5;&#x9879;&#x76EE;&#x4F9D;&#x8D56;&#xFF0C;&#x7B49;&#x5F85;&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x4E4B;&#x540E;</span>
</code></pre>
<h2 id="articleHeader3">&#x672C;&#x5730;&#x5F00;&#x53D1;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5F00;&#x542F;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x8BBF;&#x95EE; http://localhost:8080
npm run dev
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>// &#x5F00;&#x542F;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x8BBF;&#x95EE; http://localhost:<span class="hljs-number">8080</span>
npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span></code></pre>
<h2 id="articleHeader4">&#x6784;&#x5EFA;&#x751F;&#x4EA7;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6267;&#x884C;&#x6784;&#x5EFA;&#x547D;&#x4EE4;&#xFF0C;&#x751F;&#x6210;&#x7684;dist&#x6587;&#x4EF6;&#x5939;&#x653E;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0B;&#x5373;&#x53EF;&#x8BBF;&#x95EE;
npm run build
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>// &#x6267;&#x884C;&#x6784;&#x5EFA;&#x547D;&#x4EE4;&#xFF0C;&#x751F;&#x6210;&#x7684;dist&#x6587;&#x4EF6;&#x5939;&#x653E;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0B;&#x5373;&#x53EF;&#x8BBF;&#x95EE;
npm <span class="hljs-keyword">run</span><span class="bash"> build
</span></code></pre>
<h2 id="articleHeader5">&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;&#x8BF4;&#x660E;&#x4E0E;&#x6F14;&#x793A;</h2>
<h3 id="articleHeader6">element-ui</h3>
<p>&#x4E00;&#x5957;&#x57FA;&#x4E8E;vue.js2.0&#x7684;&#x684C;&#x9762;&#x7EC4;&#x4EF6;&#x5E93;&#x3002;&#x8BBF;&#x95EE;&#x5730;&#x5740;&#xFF1A;<a href="http://element.eleme.io/#/zh-CN/component/layout" rel="nofollow noreferrer" target="_blank">element</a></p>
<h3 id="articleHeader7">vue-datasource</h3>
<p>&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x52A8;&#x6001;&#x521B;&#x5EFA;&#x8868;&#x683C;&#x7684;vue.js&#x670D;&#x52A1;&#x7AEF;&#x7EC4;&#x4EF6;&#x3002;&#x8BBF;&#x95EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/coderdiaz/vue-datasource" rel="nofollow noreferrer" target="_blank">vue-datasource</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div&gt;
        &lt;datasource language=&quot;en&quot; :table-data=&quot;information.data&quot;
            :columns=&quot;columns&quot;
            :pagination=&quot;information.pagination&quot;
            :actions=&quot;actions&quot;
            v-on:change=&quot;changePage&quot;
            v-on:searching=&quot;onSearch&quot;&gt;&lt;/datasource&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    import Datasource from &apos;vue-datasource&apos;;                    // &#x5BFC;&#x5165;quillEditor&#x7EC4;&#x4EF6;
    export default {
        data: function(){
            return {
                information: {
                    pagination: {...},                        // &#x9875;&#x7801;&#x914D;&#x7F6E;
                    data: [...]
                },
                columns: [...],                                // &#x5217;&#x540D;&#x914D;&#x7F6E;
                actions: [...]                                // &#x529F;&#x80FD;&#x914D;&#x7F6E;
            }
        },
        components: {
            Datasource                                        // &#x58F0;&#x660E;&#x7EC4;&#x4EF6;Datasource
        },
        methods: {
            changePage(values) {...},
            onSearch(searchQuery) {...}
        }
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">datasource</span> <span class="hljs-attr">language</span>=<span class="hljs-string">&quot;en&quot;</span> <span class="hljs-attr">:table-data</span>=<span class="hljs-string">&quot;information.data&quot;</span>
            <span class="hljs-attr">:columns</span>=<span class="hljs-string">&quot;columns&quot;</span>
            <span class="hljs-attr">:pagination</span>=<span class="hljs-string">&quot;information.pagination&quot;</span>
            <span class="hljs-attr">:actions</span>=<span class="hljs-string">&quot;actions&quot;</span>
            <span class="hljs-attr">v-on:change</span>=<span class="hljs-string">&quot;changePage&quot;</span>
            <span class="hljs-attr">v-on:searching</span>=<span class="hljs-string">&quot;onSearch&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">datasource</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
    import Datasource from &apos;vue-datasource&apos;;                    /</span><span class="hljs-regexp">/ &#x5BFC;&#x5165;quillEditor&#x7EC4;&#x4EF6;
    export default {
        data: function(){
            return {
                information: {
                    pagination: {...},                        /</span><span class="hljs-regexp">/ &#x9875;&#x7801;&#x914D;&#x7F6E;
                    data: [...]
                },
                columns: [...],                                /</span><span class="hljs-regexp">/ &#x5217;&#x540D;&#x914D;&#x7F6E;
                actions: [...]                                /</span><span class="hljs-regexp">/ &#x529F;&#x80FD;&#x914D;&#x7F6E;
            }
        },
        components: {
            Datasource                                        /</span><span class="hljs-regexp">/ &#x58F0;&#x660E;&#x7EC4;&#x4EF6;Datasource
        },
        methods: {
            changePage(values) {...},
            onSearch(searchQuery) {...}
        }
    }
&lt;/</span>script&gt;</code></pre>
<h3 id="articleHeader8">Vue-Quill-Editor</h3>
<p>&#x57FA;&#x4E8E;Quill&#x3001;&#x9002;&#x7528;&#x4E8E;Vue2&#x7684;&#x5BCC;&#x6587;&#x672C;&#x7F16;&#x8F91;&#x5668;&#x3002;&#x8BBF;&#x95EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/surmon-china/vue-quill-editor" rel="nofollow noreferrer" target="_blank">vue-quill-editor</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div&gt;
        &lt;quill-editor ref=&quot;myTextEditor&quot; v-model=&quot;content&quot; :config=&quot;editorOption&quot;&gt;&lt;/quill-editor&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    import { quillEditor } from &apos;vue-quill-editor&apos;;            // &#x5BFC;&#x5165;quillEditor&#x7EC4;&#x4EF6;
    export default {
        data: function(){
            return {
                content: &apos;&apos;,                                // &#x7F16;&#x8F91;&#x5668;&#x7684;&#x5185;&#x5BB9;
                editorOption: {                                // &#x7F16;&#x8F91;&#x5668;&#x7684;&#x914D;&#x7F6E;
                    // something config
                }
            }
        },
        components: {
            quillEditor                                        // &#x58F0;&#x660E;&#x7EC4;&#x4EF6;quillEditor
        }
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">quill-editor</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;myTextEditor&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;content&quot;</span> <span class="hljs-attr">:config</span>=<span class="hljs-string">&quot;editorOption&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">quill-editor</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;script&gt;
    <span class="hljs-keyword">import</span> { quillEditor } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-quill-editor&apos;</span>;            <span class="hljs-comment">// &#x5BFC;&#x5165;quillEditor&#x7EC4;&#x4EF6;</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">content</span>: <span class="hljs-string">&apos;&apos;</span>,                                <span class="hljs-comment">// &#x7F16;&#x8F91;&#x5668;&#x7684;&#x5185;&#x5BB9;</span>
                editorOption: {                                <span class="hljs-comment">// &#x7F16;&#x8F91;&#x5668;&#x7684;&#x914D;&#x7F6E;</span>
                    <span class="hljs-comment">// something config</span>
                }
            }
        },
        <span class="hljs-attr">components</span>: {
            quillEditor                                        <span class="hljs-comment">// &#x58F0;&#x660E;&#x7EC4;&#x4EF6;quillEditor</span>
        }
    }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<h3 id="articleHeader9">Vue-SimpleMDE</h3>
<p>Vue.js&#x7684;Markdown Editor&#x7EC4;&#x4EF6;&#x3002;&#x8BBF;&#x95EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/F-loat/vue-simplemde" rel="nofollow noreferrer" target="_blank">Vue-SimpleMDE</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div&gt;
        &lt;markdown-editor v-model=&quot;content&quot; :configs=&quot;configs&quot; ref=&quot;markdownEditor&quot;&gt;&lt;/markdown-editor&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    import { markdownEditor } from &apos;vue-simplemde&apos;;            // &#x5BFC;&#x5165;markdownEditor&#x7EC4;&#x4EF6;
    export default {
        data: function(){
            return {
                content:&apos;&apos;,                                    // markdown&#x7F16;&#x8F91;&#x5668;&#x5185;&#x5BB9;
                configs: {                                    // markdown&#x7F16;&#x8F91;&#x5668;&#x914D;&#x7F6E;&#x53C2;&#x6570;
                    status: false,                            // &#x7981;&#x7528;&#x5E95;&#x90E8;&#x72B6;&#x6001;&#x680F;
                    initialValue: &apos;Hello BBK&apos;,                // &#x8BBE;&#x7F6E;&#x521D;&#x59CB;&#x503C;
                    renderingConfig: {
                        codeSyntaxHighlighting: true,        // &#x5F00;&#x542F;&#x4EE3;&#x7801;&#x9AD8;&#x4EAE;
                        highlightingTheme: &apos;atom-one-light&apos; // &#x81EA;&#x5B9A;&#x4E49;&#x4EE3;&#x7801;&#x9AD8;&#x4EAE;&#x4E3B;&#x9898;
                    }
                }
            }
        },
        components: {
            markdownEditor                                    // &#x58F0;&#x660E;&#x7EC4;&#x4EF6;markdownEditor
        }
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">markdown-editor</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;content&quot;</span> <span class="hljs-attr">:configs</span>=<span class="hljs-string">&quot;configs&quot;</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;markdownEditor&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">markdown-editor</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;script&gt;
    <span class="hljs-keyword">import</span> { markdownEditor } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-simplemde&apos;</span>;            <span class="hljs-comment">// &#x5BFC;&#x5165;markdownEditor&#x7EC4;&#x4EF6;</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">content</span>:<span class="hljs-string">&apos;&apos;</span>,                                    <span class="hljs-comment">// markdown&#x7F16;&#x8F91;&#x5668;&#x5185;&#x5BB9;</span>
                configs: {                                    <span class="hljs-comment">// markdown&#x7F16;&#x8F91;&#x5668;&#x914D;&#x7F6E;&#x53C2;&#x6570;</span>
                    status: <span class="hljs-literal">false</span>,                            <span class="hljs-comment">// &#x7981;&#x7528;&#x5E95;&#x90E8;&#x72B6;&#x6001;&#x680F;</span>
                    initialValue: <span class="hljs-string">&apos;Hello BBK&apos;</span>,                <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x521D;&#x59CB;&#x503C;</span>
                    renderingConfig: {
                        <span class="hljs-attr">codeSyntaxHighlighting</span>: <span class="hljs-literal">true</span>,        <span class="hljs-comment">// &#x5F00;&#x542F;&#x4EE3;&#x7801;&#x9AD8;&#x4EAE;</span>
                        highlightingTheme: <span class="hljs-string">&apos;atom-one-light&apos;</span> <span class="hljs-comment">// &#x81EA;&#x5B9A;&#x4E49;&#x4EE3;&#x7801;&#x9AD8;&#x4EAE;&#x4E3B;&#x9898;</span>
                    }
                }
            }
        },
        <span class="hljs-attr">components</span>: {
            markdownEditor                                    <span class="hljs-comment">// &#x58F0;&#x660E;&#x7EC4;&#x4EF6;markdownEditor</span>
        }
    }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<h3 id="articleHeader10">Vue-Core-Image-Upload</h3>
<p>&#x4E00;&#x6B3E;&#x8F7B;&#x91CF;&#x7EA7;&#x7684;vue&#x4E0A;&#x4F20;&#x63D2;&#x4EF6;&#xFF0C;&#x652F;&#x6301;&#x88C1;&#x526A;&#x3002;&#x8BBF;&#x95EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/Vanthink-UED/vue-core-image-upload" rel="nofollow noreferrer" target="_blank">Vue-Core-Image-Upload</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;template&gt;
    &lt;div&gt;
        &lt;img :src=&quot;src&quot;&gt;                                    // &#x7528;&#x4E8E;&#x663E;&#x793A;&#x4E0A;&#x4F20;&#x7684;&#x56FE;&#x7247;
        &lt;vue-core-image-upload :class=&quot;[&apos;pure-button&apos;,&apos;pure-button-primary&apos;,&apos;js-btn-crop&apos;]&quot;
           :crop=&quot;true&quot;                                        // &#x662F;&#x5426;&#x88C1;&#x526A;
           text=&quot;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&quot;
           url=&quot;&quot;                                            // &#x4E0A;&#x4F20;&#x8DEF;&#x5F84;
           extensions=&quot;png,gif,jpeg,jpg&quot;                    // &#x9650;&#x5236;&#x6587;&#x4EF6;&#x7C7B;&#x578B;
           @:imageuploaded=&quot;imageuploaded&quot;&gt;                    // &#x76D1;&#x542C;&#x56FE;&#x7247;&#x4E0A;&#x4F20;&#x5B8C;&#x6210;&#x4E8B;&#x4EF6;
        &lt;/vue-core-image-upload&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    import VueCoreImageUpload  from &apos;vue-core-image-upload&apos;;    // &#x5BFC;&#x5165;VueCoreImageUpload&#x7EC4;&#x4EF6;
    export default {
        data: function(){
            return {
                src:&apos;../img/1.jpg&apos;                            // &#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x56FE;&#x7247;&#x5730;&#x5740;
            }
        },
        components: {
            VueCoreImageUpload                                // &#x58F0;&#x660E;&#x7EC4;&#x4EF6;VueCoreImageUpload
        },
        methods:{
            imageuploaded(res) {                            // &#x5B9A;&#x4E49;&#x4E0A;&#x4F20;&#x5B8C;&#x6210;&#x6267;&#x884C;&#x7684;&#x65B9;&#x6CD5;
                console.log(res)
            }
        }
    }
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">
&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;src&quot;</span>&gt;</span>                                    // &#x7528;&#x4E8E;&#x663E;&#x793A;&#x4E0A;&#x4F20;&#x7684;&#x56FE;&#x7247;
        <span class="hljs-tag">&lt;<span class="hljs-name">vue-core-image-upload</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;[&apos;pure-button&apos;,&apos;pure-button-primary&apos;,&apos;js-btn-crop&apos;]&quot;</span>
           <span class="hljs-attr">:crop</span>=<span class="hljs-string">&quot;true&quot;</span>                                        // &#x662F;&#x5426;&#x88C1;&#x526A;
           <span class="hljs-attr">text</span>=<span class="hljs-string">&quot;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&quot;</span>
           <span class="hljs-attr">url</span>=<span class="hljs-string">&quot;&quot;</span>                                            // &#x4E0A;&#x4F20;&#x8DEF;&#x5F84;
           <span class="hljs-attr">extensions</span>=<span class="hljs-string">&quot;png,gif,jpeg,jpg&quot;</span>                    // &#x9650;&#x5236;&#x6587;&#x4EF6;&#x7C7B;&#x578B;
           @<span class="hljs-attr">:imageuploaded</span>=<span class="hljs-string">&quot;imageuploaded&quot;</span>&gt;</span>                    // &#x76D1;&#x542C;&#x56FE;&#x7247;&#x4E0A;&#x4F20;&#x5B8C;&#x6210;&#x4E8B;&#x4EF6;
        <span class="hljs-tag">&lt;/<span class="hljs-name">vue-core-image-upload</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> VueCoreImageUpload  <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-core-image-upload&apos;</span>;    <span class="hljs-comment">// &#x5BFC;&#x5165;VueCoreImageUpload&#x7EC4;&#x4EF6;</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">src</span>:<span class="hljs-string">&apos;../img/1.jpg&apos;</span>                            <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x56FE;&#x7247;&#x5730;&#x5740;</span>
            }
        },
        <span class="hljs-attr">components</span>: {
            VueCoreImageUpload                                <span class="hljs-comment">// &#x58F0;&#x660E;&#x7EC4;&#x4EF6;VueCoreImageUpload</span>
        },
        <span class="hljs-attr">methods</span>:{
            imageuploaded(res) {                            <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E0A;&#x4F20;&#x5B8C;&#x6210;&#x6267;&#x884C;&#x7684;&#x65B9;&#x6CD5;</span>
                <span class="hljs-built_in">console</span>.log(res)
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<h3 id="articleHeader11">vue-schart</h3>
<p>vue.js&#x5C01;&#x88C5;sChart.js&#x7684;&#x56FE;&#x8868;&#x7EC4;&#x4EF6;&#x3002;&#x8BBF;&#x95EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/linxin/vue-schart" rel="nofollow noreferrer" target="_blank">vue-schart</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div&gt;
        &lt;schart :canvasId=&quot;canvasId&quot;
                :type=&quot;type&quot;
                :width=&quot;width&quot;
                :height=&quot;height&quot;
                :data=&quot;data&quot;
                :options=&quot;options&quot;
        &gt;&lt;/schart&gt;
    &lt;/div&gt;
&lt;/template&gt;
    
&lt;script&gt;
    import Schart from &apos;vue-schart&apos;;        // &#x5BFC;&#x5165;Schart&#x7EC4;&#x4EF6;
    export default {
        data: function(){
            return {
                canvasId: &apos;myCanvas&apos;,       // canvas&#x7684;id
                type: &apos;bar&apos;,                // &#x56FE;&#x8868;&#x7C7B;&#x578B;
                width: 500,
                height: 400,
                data: [
                    {name: &apos;2014&apos;, value: 1342},
                    {name: &apos;2015&apos;, value: 2123},
                    {name: &apos;2016&apos;, value: 1654},
                    {name: &apos;2017&apos;, value: 1795},
                ],
                options: {                  // &#x56FE;&#x8868;&#x53EF;&#x9009;&#x53C2;&#x6570;
                    title: &apos;Total sales of stores in recent years&apos;
                }
            }
        },
        components: {
            Schart
        }
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">schart</span> <span class="hljs-attr">:canvasId</span>=<span class="hljs-string">&quot;canvasId&quot;</span>
                <span class="hljs-attr">:type</span>=<span class="hljs-string">&quot;type&quot;</span>
                <span class="hljs-attr">:width</span>=<span class="hljs-string">&quot;width&quot;</span>
                <span class="hljs-attr">:height</span>=<span class="hljs-string">&quot;height&quot;</span>
                <span class="hljs-attr">:data</span>=<span class="hljs-string">&quot;data&quot;</span>
                <span class="hljs-attr">:options</span>=<span class="hljs-string">&quot;options&quot;</span>
        &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">schart</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;
    
&lt;script&gt;
    import Schart from &apos;vue-schart&apos;;        /</span><span class="hljs-regexp">/ &#x5BFC;&#x5165;Schart&#x7EC4;&#x4EF6;
    export default {
        data: function(){
            return {
                canvasId: &apos;myCanvas&apos;,       /</span><span class="hljs-regexp">/ canvas&#x7684;id
                type: &apos;bar&apos;,                /</span><span class="hljs-regexp">/ &#x56FE;&#x8868;&#x7C7B;&#x578B;
                width: 500,
                height: 400,
                data: [
                    {name: &apos;2014&apos;, value: 1342},
                    {name: &apos;2015&apos;, value: 2123},
                    {name: &apos;2016&apos;, value: 1654},
                    {name: &apos;2017&apos;, value: 1795},
                ],
                options: {                  /</span><span class="hljs-regexp">/ &#x56FE;&#x8868;&#x53EF;&#x9009;&#x53C2;&#x6570;
                    title: &apos;Total sales of stores in recent years&apos;
                }
            }
        },
        components: {
            Schart
        }
    }
&lt;/</span>script&gt;</code></pre>
<h2 id="articleHeader12">&#x5176;&#x4ED6;&#x6CE8;&#x610F;&#x4E8B;&#x9879;</h2>
<h3 id="articleHeader13">&#x4E00;&#x3001;&#x5982;&#x679C;&#x6211;&#x4E0D;&#x60F3;&#x7528;&#x5230;&#x4E0A;&#x9762;&#x7684;&#x67D0;&#x4E9B;&#x7EC4;&#x4EF6;&#x5462;&#xFF0C;&#x90A3;&#x6211;&#x600E;&#x4E48;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x5220;&#x9664;&#x6389;&#x4E0D;&#x5F71;&#x54CD;&#x5230;&#x5176;&#x4ED6;&#x529F;&#x80FD;&#x5462;&#xFF1F;</h3>
<p>&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF0C;&#x6211;&#x4E0D;&#x60F3;&#x7528; vue-datasource &#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x90A3;&#x6211;&#x9700;&#x8981;&#x5206;&#x56DB;&#x6B65;&#x8D70;&#x3002;</p>
<p>&#x7B2C;&#x4E00;&#x6B65;&#xFF1A;&#x5220;&#x9664;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x5728;&#x76EE;&#x5F55; src/router/index.js &#x4E2D;&#xFF0C;&#x627E;&#x5230;&#x5F15;&#x5165;&#x6539;&#x7EC4;&#x4EF6;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x5220;&#x9664;&#x4E0B;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    path: &apos;/vuetable&apos;,
    component: resolve =&gt; require([&apos;../components/page/VueTable.vue&apos;], resolve)     // vue-datasource&#x7EC4;&#x4EF6;
}," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">{
    <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/vuetable&apos;</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">&apos;../components/page/VueTable.vue&apos;</span>], resolve)     <span class="hljs-comment">// vue-datasource&#x7EC4;&#x4EF6;</span>
},</code></pre>
<p>&#x7B2C;&#x4E8C;&#x6B65;&#xFF1A;&#x5220;&#x9664;&#x5F15;&#x5165;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x5728;&#x76EE;&#x5F55; src/components/page/ &#x5220;&#x9664; VueTable.vue &#x6587;&#x4EF6;&#x3002;</p>
<p>&#x7B2C;&#x4E09;&#x6B65;&#xFF1A;&#x5220;&#x9664;&#x8BE5;&#x9875;&#x9762;&#x7684;&#x5165;&#x53E3;&#x3002;&#x5728;&#x76EE;&#x5F55; src/components/common/Sidebar.vue &#x4E2D;&#xFF0C;&#x627E;&#x5230;&#x8BE5;&#x5165;&#x53E3;&#xFF0C;&#x5220;&#x9664;&#x4E0B;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;el-menu-item index=&quot;vuetable&quot;&gt;Vue&#x8868;&#x683C;&#x7EC4;&#x4EF6;&lt;/el-menu-item&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">&quot;vuetable&quot;</span>&gt;</span>Vue&#x8868;&#x683C;&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span></code></pre>
<p>&#x7B2C;&#x56DB;&#x6B65;&#xFF1A;&#x5378;&#x8F7D;&#x8BE5;&#x7EC4;&#x4EF6;&#x3002;&#x6267;&#x884C;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
npm un vue-datasource -S
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
<span class="hljs-built_in">npm</span> un vue-datasource -S
</code></pre>
<p>&#x5B8C;&#x6210;&#x3002;</p>
<h3 id="articleHeader14">&#x4E8C;&#x3001;&#x5982;&#x4F55;&#x5207;&#x6362;&#x4E3B;&#x9898;&#x8272;&#x5462;&#xFF1F;</h3>
<p>&#x7B2C;&#x4E00;&#x6B65;&#xFF1A;&#x6253;&#x5F00; src/main.js &#x6587;&#x4EF6;&#xFF0C;&#x627E;&#x5230;&#x5F15;&#x5165; element &#x6837;&#x5F0F;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6362;&#x6210;&#x6D45;&#x7EFF;&#x8272;&#x4E3B;&#x9898;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &apos;element-ui/lib/theme-default/index.css&apos;;    // &#x9ED8;&#x8BA4;&#x4E3B;&#x9898;
// import &apos;../static/css/theme-green/index.css&apos;;       // &#x6D45;&#x7EFF;&#x8272;&#x4E3B;&#x9898;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&apos;element-ui/lib/theme-default/index.css&apos;</span>;    <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x4E3B;&#x9898;</span>
<span class="hljs-comment">// import &apos;../static/css/theme-green/index.css&apos;;       // &#x6D45;&#x7EFF;&#x8272;&#x4E3B;&#x9898;</span></code></pre>
<p>&#x7B2C;&#x4E8C;&#x6B65;&#xFF1A;&#x6253;&#x5F00; src/App.vue &#x6587;&#x4EF6;&#xFF0C;&#x627E;&#x5230; style &#x6807;&#x7B7E;&#x5F15;&#x5165;&#x6837;&#x5F0F;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x5207;&#x6362;&#x6210;&#x6D45;&#x7EFF;&#x8272;&#x4E3B;&#x9898;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import &quot;../static/css/main.css&quot;;
@import &quot;../static/css/color-dark.css&quot;;     /*&#x6DF1;&#x8272;&#x4E3B;&#x9898;*/
/*@import &quot;../static/css/theme-green/color-green.css&quot;;   !*&#x6D45;&#x7EFF;&#x8272;&#x4E3B;&#x9898;*!*/" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">@<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;../static/css/main.css&quot;</span>;
@<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;../static/css/color-dark.css&quot;</span>;     <span class="hljs-comment">/*&#x6DF1;&#x8272;&#x4E3B;&#x9898;*/</span>
<span class="hljs-comment">/*@import &quot;../static/css/theme-green/color-green.css&quot;;   !*&#x6D45;&#x7EFF;&#x8272;&#x4E3B;&#x9898;*!*/</span></code></pre>
<p>&#x7B2C;&#x4E09;&#x6B65;&#xFF1A;&#x6253;&#x5F00; src/components/common/Sidebar.vue &#x6587;&#x4EF6;&#xFF0C;&#x627E;&#x5230; el-menu &#x6807;&#x7B7E;&#xFF0C;&#x628A; theme=&quot;dark&quot; &#x53BB;&#x6389;&#x5373;&#x53EF;&#x3002;</p>
<h2 id="articleHeader15">&#x9879;&#x76EE;&#x622A;&#x56FE;</h2>
<h3 id="articleHeader16">&#x9ED8;&#x8BA4;&#x76AE;&#x80A4;</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008582709?w=1168&amp;h=708" src="https://static.alili.tech/img/remote/1460000008582709?w=1168&amp;h=708" alt="Image text" title="Image text" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader17">&#x6D45;&#x7EFF;&#x8272;&#x76AE;&#x80A4;</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008582710?w=1154&amp;h=677" src="https://static.alili.tech/img/remote/1460000008582709?w=1168&amp;h=708" alt="Image text" title="Image text" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader18">&#x66F4;&#x591A;&#x6587;&#x7AE0;&#xFF1A;<a href="https://github.com/lin-xin/blog" rel="nofollow noreferrer" target="_blank">lin-xin/blog</a>
</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2 后台管理系统解决方案

## 原文链接
[https://segmentfault.com/a/1190000008582706](https://segmentfault.com/a/1190000008582706)


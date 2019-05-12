---
title: electron 自动更新以及手动更新
hidden: true
categories: [reprint]
slug: d20b79c4
date: 2018-11-04 02:30:10
---

{{< raw >}}
<p>&#x4ECE;&#x642D;&#x5EFA;&#x5F00;&#x59CB; &#x4F7F;&#x7528;&#x7684;&#x662F;electron-vue &#x6BD5;&#x7ADF;&#x65B9;&#x4FBF;&#x4E00;&#x70B9; &#x5982;&#x679C;&#x53EA;&#x60F3;&#x5B89;&#x88C5;electron &#x8BF7;&#x53C2;&#x89C1;&#x6211;&#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x6587;&#x7AE0; <a href="https://segmentfault.com/a/1190000016028730">https://segmentfault.com/a/11...</a><br><span class="img-wrap"><img data-src="/img/bVbh772?w=988&amp;h=592" src="https://static.alili.tech/img/bVbh772?w=988&amp;h=592" alt="git.gif" title="git.gif" style="cursor:pointer"></span></p><h2 id="articleHeader0">&#x9996;&#x5148;&#x5B89;&#x88C5;Electron:</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init simulatedgreg/electron-vue project1

cd project1
npm install //&#x7B2C;&#x4E00;&#x6B21;&#x5B89;&#x88C5;&#x7684;&#x4F19;&#x4F34;&#x9700;&#x8981;&#x7FFB;&#x5899; &#x5982;&#x4F55;&#x7FFB;&#x5899;&#x8BF7;&#x53C2;&#x52A0;&#x53E6;&#x4E00;&#x4E2A;&#x6587;&#x7AE0;(&#x597D;&#x50CF;&#x88AB;&#x548C;&#x8C10;&#x4E86; &#x90A3;&#x5C31;+&#x6211;&#x4EEC;&#x7684;&#x4EA4;&#x6D41;&#x7FA4;&#x5427;!)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scilab"><code>vue init simulatedgreg/electron-vue project1

<span class="hljs-built_in">cd</span> project1
npm install <span class="hljs-comment">//&#x7B2C;&#x4E00;&#x6B21;&#x5B89;&#x88C5;&#x7684;&#x4F19;&#x4F34;&#x9700;&#x8981;&#x7FFB;&#x5899; &#x5982;&#x4F55;&#x7FFB;&#x5899;&#x8BF7;&#x53C2;&#x52A0;&#x53E6;&#x4E00;&#x4E2A;&#x6587;&#x7AE0;(&#x597D;&#x50CF;&#x88AB;&#x548C;&#x8C10;&#x4E86; &#x90A3;&#x5C31;+&#x6211;&#x4EEC;&#x7684;&#x4EA4;&#x6D41;&#x7FA4;&#x5427;!)</span></code></pre><p>&#x5B89;&#x88C5;&#x7684;&#x65F6;&#x5019;&#x5B89;&#x88C5;&#x4E86; <code>vue</code> <code>electron</code> <code>vue-router</code> &#x4E0D;&#x5B89;&#x88C5; <code>vuex</code></p><p>&#x6253;&#x5305;&#x9009;&#x62E9;&#x7684;&#x662F;: <code>electron-builder</code> &#x4E0B;&#x6B21;&#x6709;&#x65F6;&#x95F4;&#x518D;&#x626F;<code>electron-packager</code></p><p><span class="img-wrap"><img data-src="/img/bVbh75q?w=782&amp;h=376" src="https://static.alili.tech/img/bVbh75q?w=782&amp;h=376" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x5B89;&#x88C5;&#x5B8C;&#x6BD5;&#x4E4B;&#x540E;&#x542F;&#x52A8;&#x8FD0;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre><h2 id="articleHeader1">&#x6784;&#x5EFA;&#x9875;&#x9762;</h2><h3 id="articleHeader2">&#x66F4;&#x65B0;&#x8FDB;&#x5EA6;&#x9875;&#x9762;</h3><p>&#x5C06;&#x4ED6;&#x5199;&#x6210;&#x7EC4;&#x4EF6; update.vue</p><p><span class="img-wrap"><img data-src="/img/bVbh76t?w=599&amp;h=326" src="https://static.alili.tech/img/bVbh76t?w=599&amp;h=326" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;transition name=&quot;fade&quot;&gt;
        &lt;div v-if=&quot;show&quot;&gt;
            &lt;div class=&quot;modal&quot;&gt;&lt;/div&gt;
            &lt;div class=&quot;update&quot;&gt;
                &lt;div class=&quot;header&quot;&gt;&lt;h2&gt;&#x5E94;&#x7528;&#x66F4;&#x65B0;&lt;/h2&gt;&lt;i class=&quot;close&quot; @click=&quot;close&quot;&gt;&lt;/i&gt;&lt;/div&gt;
                &lt;div class=&quot;body&quot;&gt;
                    &lt;p&gt;&#x66F4;&#x65B0;&#x8FDB;&#x5EA6;&lt;/p&gt;
                    &lt;p class=&quot;percentage&quot;&gt;10%&lt;/p&gt;
                    &lt;div class=&quot;progress&quot;&gt;
                        &lt;div class=&quot;length&quot;&gt;&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/transition&gt;
&lt;/template&gt;

&lt;script&gt;
    export default {
        name: &quot;update&quot;,
        methods: {
            close() {
                this.$emit(&apos;update:show&apos;, false)
            }
        },
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    }
&lt;/script&gt;


&lt;style&gt;
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .4;
        background: #000;
    }

    .update {
        width: 400px;
        height: 180px;
        background-color: #FFFFFF;
        border-radius: 10px;
        border: 1px solid #CCC;
        position: absolute;
        top: 40%;
        margin-top: -90px;
        left: 50%;
        margin-left: -200px;
        box-shadow: #FFFFFF 0 0 10px;
    }

    .update .header i.close {
        display: inline-block;
        position: absolute;
        top: 11px;
        right: 12px;
        width: 20px;
        height: 20px;
        background-image: url(&quot;../assets/img/close.png&quot;);
        background-size: 100%;
        cursor: pointer;
    }

    .update .header {
        border-bottom: 1px solid #ccc;
        height: 40px;
        line-height: 40px;
    }

    .update .header h2 {
        text-align: center;
        font-size: 20px;
    }

    .update .body {
        padding-top: 20px;
        text-align: center;
    }

    .update .body .percentage {
        margin-top: 20px;
    }

    .update .body .progress {
        width: 350px;
        height: 30px;
        border: 1px solid #CCCCCC;
        border-radius: 8px;
        margin: 10px auto;
    }

    .update .body .progress .length {
        background-color: #E4393c;
        border-radius: 8px;
        width: 10px;
        height: 30px;
    }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;fade&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;show&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;modal&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;update&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x5E94;&#x7528;&#x66F4;&#x65B0;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;close&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;close&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;body&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x66F4;&#x65B0;&#x8FDB;&#x5EA6;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;percentage&quot;</span>&gt;</span>10%<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;progress&quot;</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;length&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;update&quot;</span>,
        <span class="hljs-attr">methods</span>: {
            close() {
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;update:show&apos;</span>, <span class="hljs-literal">false</span>)
            }
        },
        <span class="hljs-attr">props</span>: {
            <span class="hljs-attr">show</span>: {
                <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
                <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.fade-enter-active</span>, <span class="hljs-selector-class">.fade-leave-active</span> {
        <span class="hljs-attribute">transition</span>: opacity .<span class="hljs-number">5s</span>;
    }
    <span class="hljs-selector-class">.fade-enter</span>, <span class="hljs-selector-class">.fade-leave-to</span> <span class="hljs-comment">/* .fade-leave-active below version 2.1.8 */</span> {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.modal</span> {
        <span class="hljs-attribute">position</span>: fixed;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">4</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
    }

    <span class="hljs-selector-class">.update</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">180px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FFFFFF</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#CCC</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">40%</span>;
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">90px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">200px</span>;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">#FFFFFF</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
    }

    <span class="hljs-selector-class">.update</span> <span class="hljs-selector-class">.header</span> <span class="hljs-selector-tag">i</span><span class="hljs-selector-class">.close</span> {
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">11px</span>;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">&quot;../assets/img/close.png&quot;</span>);
        <span class="hljs-attribute">background-size</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }

    <span class="hljs-selector-class">.update</span> <span class="hljs-selector-class">.header</span> {
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
    }

    <span class="hljs-selector-class">.update</span> <span class="hljs-selector-class">.header</span> <span class="hljs-selector-tag">h2</span> {
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
    }

    <span class="hljs-selector-class">.update</span> <span class="hljs-selector-class">.body</span> {
        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }

    <span class="hljs-selector-class">.update</span> <span class="hljs-selector-class">.body</span> <span class="hljs-selector-class">.percentage</span> {
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;
    }

    <span class="hljs-selector-class">.update</span> <span class="hljs-selector-class">.body</span> <span class="hljs-selector-class">.progress</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">350px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#CCCCCC</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">8px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> auto;
    }

    <span class="hljs-selector-class">.update</span> <span class="hljs-selector-class">.body</span> <span class="hljs-selector-class">.progress</span> <span class="hljs-selector-class">.length</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#E4393c</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">8px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><h2 id="articleHeader3">&#x5B89;&#x88C5;&#x6A21;&#x5757;</h2><p>&#x5B89;&#x88C5; <code>electron-updater</code> &#x5305;&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install electron-updater --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> electron-updater <span class="hljs-comment">--save</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbh76y?w=972&amp;h=508" src="https://static.alili.tech/img/bVbh76y?w=972&amp;h=508" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x4FEE;&#x6539;package.json<br>&#x52A0;&#x5165;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;publish&quot;: [
      {
        &quot;provider&quot;: &quot;generic&quot;,
        &quot;url&quot;: &quot;http://lee.com/app/update&quot;
      }
    ]," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>    <span class="hljs-string">&quot;publish&quot;</span>: [
      {
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;generic&quot;</span>,
        <span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;http://lee.com/app/update&quot;</span>
      }
    ],</code></pre><p><span class="img-wrap"><img data-src="/img/bVbh76z?w=652&amp;h=388" src="https://static.alili.tech/img/bVbh76z?w=652&amp;h=388" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader4">&#x914D;&#x7F6E;&#x66F4;&#x65B0;&#x670D;&#x52A1;&#x5668;</h2><p>&#x6211;&#x4EEC;&#x7684;&#x66F4;&#x65B0;&#x670D;&#x52A1;&#x5668;&#x662F;&#x672C;&#x5730;&#x865A;&#x62DF;&#x4E3B;&#x673A; &#x4EE5;apache&#x4E3A;&#x4F8B;</p><h3 id="articleHeader5">&#x914D;&#x7F6E;apache&#x670D;&#x52A1;&#x5668;</h3><p>&#x6211;&#x672C;&#x5730;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x96C6;&#x6210;&#x73AF;&#x5883; &#x5F88;&#x7B80;&#x5355;&#x7684;&#x64CD;&#x4F5C; &#x8981;&#x662F;&#x5927;&#x5BB6;&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x5B89;&#x88C5;&#x7684; &#x5F80;<code>httpd-vhosts.conf</code>&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x914D;&#x7F6E;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</p><p>&#x6211;&#x4EEC;&#x7684;&#x57DF;&#x540D;&#x662F;<code>lee.com</code></p><h3 id="articleHeader6">&#x4FEE;&#x6539;hosts&#x6587;&#x4EF6;</h3><p>&#x4FEE;&#x6539; hosts&#x6587;&#x4EF6; &#x5F80;&#x91CC;&#x9762;&#x6DFB;&#x52A0;<br>&#x6587;&#x4EF6;&#x5730;&#x5740;&#x5728; C:WindowsSystem32driversetc&#x76EE;&#x5F55;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="127.0.0.1 lee.com" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code style="word-break:break-word;white-space:initial">127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span> <span class="hljs-selector-tag">lee</span><span class="hljs-selector-class">.com</span></code></pre><h2 id="articleHeader7">&#x6838;&#x5FC3;&#x6587;&#x4EF6;</h2><p>&#x4E3B;&#x8FDB;&#x7A0B;&#x4E2D; &#x4E3B;&#x8981;&#x662F;handleUpdate&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {app, BrowserWindow, ipcMain} from &apos;electron&apos;
// &#x6CE8;&#x610F;&#x8FD9;&#x4E2A;autoUpdater&#x4E0D;&#x662F;electron&#x4E2D;&#x7684;autoUpdater
import {autoUpdater} from &quot;electron-updater&quot;

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== &apos;development&apos;) {
    global.__static = require(&apos;path&apos;).join(__dirname, &apos;/static&apos;).replace(/\\/g, &apos;\\\\&apos;)
}

let mainWindow
const winURL = process.env.NODE_ENV === &apos;development&apos;
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000
    })

    mainWindow.loadURL(winURL)

    mainWindow.on(&apos;closed&apos;, () =&gt; {
        mainWindow = null
    });


//&#x5904;&#x7406;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;
    function handleUpdate() {
        const returnData = {
            error: {status: -1, msg: &apos;&#x68C0;&#x6D4B;&#x66F4;&#x65B0;&#x67E5;&#x8BE2;&#x5F02;&#x5E38;&apos;},
            checking: {status: 0, msg: &apos;&#x6B63;&#x5728;&#x68C0;&#x67E5;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x66F4;&#x65B0;&apos;},
            updateAva: {status: 1, msg: &apos;&#x68C0;&#x6D4B;&#x5230;&#x65B0;&#x7248;&#x672C;&#xFF0C;&#x6B63;&#x5728;&#x4E0B;&#x8F7D;,&#x8BF7;&#x7A0D;&#x540E;&apos;},
            updateNotAva: {status: -1, msg: &apos;&#x60A8;&#x73B0;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x7248;&#x672C;&#x4E3A;&#x6700;&#x65B0;&#x7248;&#x672C;,&#x65E0;&#x9700;&#x66F4;&#x65B0;!&apos;},
        };

        //&#x548C;&#x4E4B;&#x524D;package.json&#x914D;&#x7F6E;&#x7684;&#x4E00;&#x6837;
        autoUpdater.setFeedURL(&apos;http://xxx.com/app/update&apos;);

        //&#x66F4;&#x65B0;&#x9519;&#x8BEF;
        autoUpdater.on(&apos;error&apos;, function (error) {
            sendUpdateMessage(returnData.error)
        });

        //&#x68C0;&#x67E5;&#x4E2D;
        autoUpdater.on(&apos;checking-for-update&apos;, function () {
            sendUpdateMessage(returnData.checking)
        });

        //&#x53D1;&#x73B0;&#x65B0;&#x7248;&#x672C;
        autoUpdater.on(&apos;update-available&apos;, function (info) {
            sendUpdateMessage(returnData.updateAva)
        });

        //&#x5F53;&#x524D;&#x7248;&#x672C;&#x4E3A;&#x6700;&#x65B0;&#x7248;&#x672C;
        autoUpdater.on(&apos;update-not-available&apos;, function (info) {
            setTimeout(function () {
                sendUpdateMessage(returnData.updateNotAva)
            }, 1000);
        });

        // &#x66F4;&#x65B0;&#x4E0B;&#x8F7D;&#x8FDB;&#x5EA6;&#x4E8B;&#x4EF6;
        autoUpdater.on(&apos;download-progress&apos;, function (progressObj) {
            mainWindow.webContents.send(&apos;downloadProgress&apos;, progressObj)
        });


        autoUpdater.on(&apos;update-downloaded&apos;, function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
            ipcMain.on(&apos;isUpdateNow&apos;, (e, arg) =&gt; {
                //some code here to handle event
                autoUpdater.quitAndInstall();
            });
            // win.webContents.send(&apos;isUpdateNow&apos;)
        });

        //&#x6267;&#x884C;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x68C0;&#x67E5;
        autoUpdater.checkForUpdates();
    }

    handleUpdate();

// &#x901A;&#x8FC7;main&#x8FDB;&#x7A0B;&#x53D1;&#x9001;&#x4E8B;&#x4EF6;&#x7ED9;renderer&#x8FDB;&#x7A0B;&#xFF0C;&#x63D0;&#x793A;&#x66F4;&#x65B0;&#x4FE1;&#x606F;
    function sendUpdateMessage(text) {
        mainWindow.webContents.send(&apos;message&apos;, text)
    }

    ipcMain.on(&quot;checkForUpdate&quot;, (event, data) =&gt; {
        console.log(&apos;&#x6267;&#x884C;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x68C0;&#x67E5;!!!&apos;);
        // event.sender.send(&apos;reply&apos;, &apos;hi lee my name is yuan, age is 17&apos;);
        autoUpdater.checkForUpdates();
    });
}

app.on(&apos;ready&apos;, createWindow)

app.on(&apos;window-all-closed&apos;, () =&gt; {
    if (process.platform !== &apos;darwin&apos;) {
        app.quit()
    }
});

app.on(&apos;activate&apos;, () =&gt; {
    if (mainWindow === null) {
        createWindow()
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {app, BrowserWindow, ipcMain} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;electron&apos;</span>
<span class="hljs-comment">// &#x6CE8;&#x610F;&#x8FD9;&#x4E2A;autoUpdater&#x4E0D;&#x662F;electron&#x4E2D;&#x7684;autoUpdater</span>
<span class="hljs-keyword">import</span> {autoUpdater} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;electron-updater&quot;</span>

<span class="hljs-comment">/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */</span>
<span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;development&apos;</span>) {
    global.__static = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>).join(__dirname, <span class="hljs-string">&apos;/static&apos;</span>).replace(<span class="hljs-regexp">/\\/g</span>, <span class="hljs-string">&apos;\\\\&apos;</span>)
}

<span class="hljs-keyword">let</span> mainWindow
<span class="hljs-keyword">const</span> winURL = process.env.NODE_ENV === <span class="hljs-string">&apos;development&apos;</span>
    ? <span class="hljs-string">`http://localhost:9080`</span>
    : <span class="hljs-string">`file://<span class="hljs-subst">${__dirname}</span>/index.html`</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createWindow</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">/**
     * Initial window options
     */</span>
    mainWindow = <span class="hljs-keyword">new</span> BrowserWindow({
        <span class="hljs-attr">height</span>: <span class="hljs-number">563</span>,
        <span class="hljs-attr">useContentSize</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">width</span>: <span class="hljs-number">1000</span>
    })

    mainWindow.loadURL(winURL)

    mainWindow.on(<span class="hljs-string">&apos;closed&apos;</span>, () =&gt; {
        mainWindow = <span class="hljs-literal">null</span>
    });


<span class="hljs-comment">//&#x5904;&#x7406;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleUpdate</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> returnData = {
            <span class="hljs-attr">error</span>: {<span class="hljs-attr">status</span>: <span class="hljs-number">-1</span>, <span class="hljs-attr">msg</span>: <span class="hljs-string">&apos;&#x68C0;&#x6D4B;&#x66F4;&#x65B0;&#x67E5;&#x8BE2;&#x5F02;&#x5E38;&apos;</span>},
            <span class="hljs-attr">checking</span>: {<span class="hljs-attr">status</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">msg</span>: <span class="hljs-string">&apos;&#x6B63;&#x5728;&#x68C0;&#x67E5;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x66F4;&#x65B0;&apos;</span>},
            <span class="hljs-attr">updateAva</span>: {<span class="hljs-attr">status</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">msg</span>: <span class="hljs-string">&apos;&#x68C0;&#x6D4B;&#x5230;&#x65B0;&#x7248;&#x672C;&#xFF0C;&#x6B63;&#x5728;&#x4E0B;&#x8F7D;,&#x8BF7;&#x7A0D;&#x540E;&apos;</span>},
            <span class="hljs-attr">updateNotAva</span>: {<span class="hljs-attr">status</span>: <span class="hljs-number">-1</span>, <span class="hljs-attr">msg</span>: <span class="hljs-string">&apos;&#x60A8;&#x73B0;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x7248;&#x672C;&#x4E3A;&#x6700;&#x65B0;&#x7248;&#x672C;,&#x65E0;&#x9700;&#x66F4;&#x65B0;!&apos;</span>},
        };

        <span class="hljs-comment">//&#x548C;&#x4E4B;&#x524D;package.json&#x914D;&#x7F6E;&#x7684;&#x4E00;&#x6837;</span>
        autoUpdater.setFeedURL(<span class="hljs-string">&apos;http://xxx.com/app/update&apos;</span>);

        <span class="hljs-comment">//&#x66F4;&#x65B0;&#x9519;&#x8BEF;</span>
        autoUpdater.on(<span class="hljs-string">&apos;error&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
            sendUpdateMessage(returnData.error)
        });

        <span class="hljs-comment">//&#x68C0;&#x67E5;&#x4E2D;</span>
        autoUpdater.on(<span class="hljs-string">&apos;checking-for-update&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            sendUpdateMessage(returnData.checking)
        });

        <span class="hljs-comment">//&#x53D1;&#x73B0;&#x65B0;&#x7248;&#x672C;</span>
        autoUpdater.on(<span class="hljs-string">&apos;update-available&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">info</span>) </span>{
            sendUpdateMessage(returnData.updateAva)
        });

        <span class="hljs-comment">//&#x5F53;&#x524D;&#x7248;&#x672C;&#x4E3A;&#x6700;&#x65B0;&#x7248;&#x672C;</span>
        autoUpdater.on(<span class="hljs-string">&apos;update-not-available&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">info</span>) </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                sendUpdateMessage(returnData.updateNotAva)
            }, <span class="hljs-number">1000</span>);
        });

        <span class="hljs-comment">// &#x66F4;&#x65B0;&#x4E0B;&#x8F7D;&#x8FDB;&#x5EA6;&#x4E8B;&#x4EF6;</span>
        autoUpdater.on(<span class="hljs-string">&apos;download-progress&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">progressObj</span>) </span>{
            mainWindow.webContents.send(<span class="hljs-string">&apos;downloadProgress&apos;</span>, progressObj)
        });


        autoUpdater.on(<span class="hljs-string">&apos;update-downloaded&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate</span>) </span>{
            ipcMain.on(<span class="hljs-string">&apos;isUpdateNow&apos;</span>, (e, arg) =&gt; {
                <span class="hljs-comment">//some code here to handle event</span>
                autoUpdater.quitAndInstall();
            });
            <span class="hljs-comment">// win.webContents.send(&apos;isUpdateNow&apos;)</span>
        });

        <span class="hljs-comment">//&#x6267;&#x884C;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x68C0;&#x67E5;</span>
        autoUpdater.checkForUpdates();
    }

    handleUpdate();

<span class="hljs-comment">// &#x901A;&#x8FC7;main&#x8FDB;&#x7A0B;&#x53D1;&#x9001;&#x4E8B;&#x4EF6;&#x7ED9;renderer&#x8FDB;&#x7A0B;&#xFF0C;&#x63D0;&#x793A;&#x66F4;&#x65B0;&#x4FE1;&#x606F;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendUpdateMessage</span>(<span class="hljs-params">text</span>) </span>{
        mainWindow.webContents.send(<span class="hljs-string">&apos;message&apos;</span>, text)
    }

    ipcMain.on(<span class="hljs-string">&quot;checkForUpdate&quot;</span>, (event, data) =&gt; {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6267;&#x884C;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x68C0;&#x67E5;!!!&apos;</span>);
        <span class="hljs-comment">// event.sender.send(&apos;reply&apos;, &apos;hi lee my name is yuan, age is 17&apos;);</span>
        autoUpdater.checkForUpdates();
    });
}

app.on(<span class="hljs-string">&apos;ready&apos;</span>, createWindow)

app.on(<span class="hljs-string">&apos;window-all-closed&apos;</span>, () =&gt; {
    <span class="hljs-keyword">if</span> (process.platform !== <span class="hljs-string">&apos;darwin&apos;</span>) {
        app.quit()
    }
});

app.on(<span class="hljs-string">&apos;activate&apos;</span>, () =&gt; {
    <span class="hljs-keyword">if</span> (mainWindow === <span class="hljs-literal">null</span>) {
        createWindow()
    }
});</code></pre><h2 id="articleHeader8">&#x66F4;&#x65B0;&#x53C2;&#x6570;&#x8BB2;&#x89E3;</h2><p>&#x5728;&#x6709;&#x66F4;&#x65B0;&#x5305;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x5728;&#x4E3B;&#x8FDB;&#x7A0B;&#x4E2D;&#x89E6;&#x53D1;&#x4E0B;&#x9762;&#x7684;&#x65B9;&#x6CD5;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  autoUpdater.on(&apos;download-progress&apos;, function (progressObj) {
        // mainWindow.webContents.send(&apos;downloadProgress&apos;, progressObj)
        const winId = BrowserWindow.getFocusedWindow().id;
        let win = BrowserWindow.fromId(winId);
        win.webContents.send(&apos;downloadProgress&apos;, progressObj)
    });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  autoUpdater.on(<span class="hljs-string">&apos;download-progress&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">progressObj</span>) </span>{
        <span class="hljs-comment">// mainWindow.webContents.send(&apos;downloadProgress&apos;, progressObj)</span>
        <span class="hljs-keyword">const</span> winId = BrowserWindow.getFocusedWindow().id;
        <span class="hljs-keyword">let</span> win = BrowserWindow.fromId(winId);
        win.webContents.send(<span class="hljs-string">&apos;downloadProgress&apos;</span>, progressObj)
    });</code></pre><p>progressObj :</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" { &quot;bytesPerSecond&quot;: 47132710, &quot;delta&quot;: 39780007, &quot;percent&quot;: 100, &quot;total&quot;: 39780007, &quot;transferred&quot;: 39780007 } " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code style="word-break:break-word;white-space:initial"> { <span class="hljs-attr">&quot;bytesPerSecond&quot;</span>: <span class="hljs-number">47132710</span>, <span class="hljs-attr">&quot;delta&quot;</span>: <span class="hljs-number">39780007</span>, <span class="hljs-attr">&quot;percent&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-attr">&quot;total&quot;</span>: <span class="hljs-number">39780007</span>, <span class="hljs-attr">&quot;transferred&quot;</span>: <span class="hljs-number">39780007</span> } </code></pre><p>bytesPerSecond: bps/s //&#x4F20;&#x9001;&#x901F;&#x7387;<br>percent : &#x767E;&#x5206;&#x6BD4; //&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8FD9;&#x4E2A;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;<br>total : &#x603B;&#x5927;&#x5C0F;<br>transferred: &#x5DF2;&#x7ECF;&#x4E0B;&#x8F7D;</p><h2 id="articleHeader9">&#x53D1;&#x5E03;&#x66F4;&#x65B0;</h2><p>&#x5C06;&#x65B0;&#x7684;&#x5B89;&#x88C5;&#x5305;&#x548C;latest.yml &#x653E;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x76EE;&#x5F55;&#x4E0B; &#x7CFB;&#x7EDF;&#x4F1A;&#x81EA;&#x52A8;&#x53BB;&#x68C0;&#x6D4B;&#x7248;&#x672C; &#x5982;&#x679C;&#x6709;&#x65B0;&#x7248;&#x672C;&#x4F1A;&#x4E0B;&#x8F7D;&#x7684;!!</p><h2 id="articleHeader10">&#x68C0;&#x6D4B;&#x66F4;&#x65B0;</h2><p>&#x521B;&#x5EFA;&#x89E6;&#x53D1;&#x66F4;&#x65B0;&#x7684;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div&gt;&lt;h2&gt;&#x4F60;&#x597D; &#x6211;&#x662F;1.2.4&lt;/h2&gt;
        &lt;button @click=&quot;updateApp&quot; style=&quot;width:100px;height: 40px;&quot;&gt;&#x66F4;&#x65B0;&lt;/button&gt;
        &lt;Update :show.sync=&quot;show&quot; :percent=&quot;percent&quot;&gt;&lt;/Update&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;

    import Update from &quot;@/components/update&quot;;

    export default {
        name: &quot;index&quot;,
        components: {Update},
        data() {
            return {
               
                percent: 0,
                show: false
            }
        },
        mounted() {
            //&#x66F4;&#x65B0;&#x8FDB;&#x5EA6;
            this.$electron.ipcRenderer.on(&apos;downloadProgress&apos;, (event, data) =&gt; {
              
                this.percent = (data.percent).toFixed(2);
                if (data.percent &gt;= 100) {
                    // this.show = false;
                }
            });

            /**
             * &#x4E3B;&#x8FDB;&#x7A0B;&#x8FD4;&#x56DE;&#x7684;&#x68C0;&#x6D4B;&#x72B6;&#x6001;
             */
            this.$electron.ipcRenderer.on(&apos;message&apos;, (event, data) =&gt; {
                switch (data.status) {
                    case -1:
                        this.$Message.error(data.msg);
                        break;
                    case 0:
                        this.$Message.loading(data.msg);
                        break;
                    case 1:
                        this.show = true;
                        break;
                }
            });
        },
        methods: {
            updateApp() {
                this.$electron.ipcRenderer.send(&apos;checkForUpdate&apos;, &apos;asdad&apos;)
            }
        }
    }
&lt;/script&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x4F60;&#x597D; &#x6211;&#x662F;1.2.4<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;updateApp&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width:100px;height: 40px;&quot;</span>&gt;</span>&#x66F4;&#x65B0;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Update</span> <span class="hljs-attr">:show.sync</span>=<span class="hljs-string">&quot;show&quot;</span> <span class="hljs-attr">:percent</span>=<span class="hljs-string">&quot;percent&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Update</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

    <span class="hljs-keyword">import</span> Update <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/components/update&quot;</span>;

    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;index&quot;</span>,
        <span class="hljs-attr">components</span>: {Update},
        data() {
            <span class="hljs-keyword">return</span> {
               
                <span class="hljs-attr">percent</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
            }
        },
        mounted() {
            <span class="hljs-comment">//&#x66F4;&#x65B0;&#x8FDB;&#x5EA6;</span>
            <span class="hljs-keyword">this</span>.$electron.ipcRenderer.on(<span class="hljs-string">&apos;downloadProgress&apos;</span>, (event, data) =&gt; {
              
                <span class="hljs-keyword">this</span>.percent = (data.percent).toFixed(<span class="hljs-number">2</span>);
                <span class="hljs-keyword">if</span> (data.percent &gt;= <span class="hljs-number">100</span>) {
                    <span class="hljs-comment">// this.show = false;</span>
                }
            });

            <span class="hljs-comment">/**
             * &#x4E3B;&#x8FDB;&#x7A0B;&#x8FD4;&#x56DE;&#x7684;&#x68C0;&#x6D4B;&#x72B6;&#x6001;
             */</span>
            <span class="hljs-keyword">this</span>.$electron.ipcRenderer.on(<span class="hljs-string">&apos;message&apos;</span>, (event, data) =&gt; {
                <span class="hljs-keyword">switch</span> (data.status) {
                    <span class="hljs-keyword">case</span> <span class="hljs-number">-1</span>:
                        <span class="hljs-keyword">this</span>.$Message.error(data.msg);
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
                        <span class="hljs-keyword">this</span>.$Message.loading(data.msg);
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
                        <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">true</span>;
                        <span class="hljs-keyword">break</span>;
                }
            });
        },
        <span class="hljs-attr">methods</span>: {
            updateApp() {
                <span class="hljs-keyword">this</span>.$electron.ipcRenderer.send(<span class="hljs-string">&apos;checkForUpdate&apos;</span>, <span class="hljs-string">&apos;asdad&apos;</span>)
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p><span class="img-wrap"><img data-src="/img/bVbh77C?w=896&amp;h=438" src="https://static.alili.tech/img/bVbh77C?w=896&amp;h=438" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader11">&#x603B;&#x7ED3;</h2><p>&#x7531;&#x4E8E;&#x6211;&#x7684;&#x865A;&#x62DF;&#x673A;&#x662F;&#x5728;&#x672C;&#x5730; &#x6240;&#x4EE5;&#x4E0B;&#x8F7D;&#x901F;&#x5EA6;&#x8D85;&#x5FEB;<br>&#x540E;&#x6765;&#x6211;&#x5C06;&#x66F4;&#x65B0;&#x5730;&#x5740;&#x5207;&#x6362;&#x5230;&#x8FDC;&#x7A0B;&#x670D;&#x52A1;&#x5668; &#x4E0B;&#x9762;&#x662F;&#x64CD;&#x4F5C;&#x622A;&#x56FE;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
electron 自动更新以及手动更新

## 原文链接
[https://segmentfault.com/a/1190000016674982](https://segmentfault.com/a/1190000016674982)


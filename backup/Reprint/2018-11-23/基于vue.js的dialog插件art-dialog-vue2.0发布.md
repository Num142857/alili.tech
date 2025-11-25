---
title: '基于vue.js的dialog插件art-dialog-vue2.0发布' 
date: 2018-11-23 2:30:11
hidden: true
slug: v3q1ri1w4d
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">art-dialog-vue &#x2014;&#x2014; &#x7ECF;&#x5178;&#x3001;&#x4F18;&#x96C5;&#x7684;&#x7F51;&#x9875;&#x5BF9;&#x8BDD;&#x6846;&#x63A7;&#x4EF6;</h2><h3 id="articleHeader1">&#x4F18;&#x70B9;</h3><ol><li>&#x652F;&#x6301;&#x666E;&#x901A;&#x4E0E; 12 &#x65B9;&#x5411;&#x6C14;&#x6CE1;&#x72B6;&#x5BF9;&#x8BDD;&#x6846;</li><li>&#x652F;&#x6301; ARIA &#x6807;&#x51C6;</li><li>&#x9762;&#x5411;&#x672A;&#x6765;&#xFF1A;&#x57FA;&#x4E8E; HTML5 Dialog &#x7684; API</li><li>&#x652F;&#x6301;&#x6807;&#x51C6;&#x4E0E;&#x6A21;&#x6001;&#x5BF9;&#x8BDD;&#x6846;</li><li>&#x4E30;&#x5BCC;&#x4E14;&#x53CB;&#x597D;&#x7684;&#x7F16;&#x7A0B;&#x63A5;&#x53E3;</li><li>&#x80FD;&#x81EA;&#x9002;&#x5E94;&#x5185;&#x5BB9;&#x5C3A;&#x5BF8;</li></ol><h3 id="articleHeader2">&#x5B89;&#x88C5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm install art-dialog-vue //&#x63D2;&#x4EF6;&#x6587;&#x4EF6;&#x5728;plugin&#x76EE;&#x5F55;&#x4E0B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs hsp"><code style="word-break:break-word;white-space:initial"> npm install art-<span class="hljs-keyword">dialog</span>-vue <span class="hljs-comment">//&#x63D2;&#x4EF6;&#x6587;&#x4EF6;&#x5728;plugin&#x76EE;&#x5F55;&#x4E0B;</span></code></pre><h3 id="articleHeader3">url&#x5F15;&#x5165;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;plugin/dist/static/css/dialog.min.css&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;plugin/dist/static/js/dialog.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    Vue.use(Dialog.default)//&#x4F7F;&#x7528;&#x63D2;&#x4EF6;,&#x6CE8;&#x610F;&#x4EE5;url&#x5F15;&#x5165;&#x65F6;use&#x7684;&#x53C2;&#x6570;&#x662F;Dialog.default
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;plugin/dist/static/css/dialog.min.css&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;plugin/dist/static/js/dialog.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.use(Dialog.default)<span class="hljs-comment">//&#x4F7F;&#x7528;&#x63D2;&#x4EF6;,&#x6CE8;&#x610F;&#x4EE5;url&#x5F15;&#x5165;&#x65F6;use&#x7684;&#x53C2;&#x6570;&#x662F;Dialog.default</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h3 id="articleHeader4">&#x6A21;&#x5757;&#x5316;&#x5F15;&#x5165;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Dialog from &apos;art-dialog-vue&apos; //esm
const Dialog = require(&apos;art-dialog-vue&apos;).default //RequireJS&#xFF0C;&#x975E;esm&#x5F62;&#x5F0F;&#x8981;&#x52A0;.default
Vue.use(Dialog)//&#x4F7F;&#x7528;&#x63D2;&#x4EF6;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>import <span class="hljs-built_in">Dialog</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;art-dialog-vue&apos;</span> <span class="hljs-comment">//esm</span>
const <span class="hljs-built_in">Dialog</span> = require(<span class="hljs-string">&apos;art-dialog-vue&apos;</span>).<span class="hljs-keyword">default</span> <span class="hljs-comment">//RequireJS&#xFF0C;&#x975E;esm&#x5F62;&#x5F0F;&#x8981;&#x52A0;.default</span>
Vue.use(<span class="hljs-built_in">Dialog</span>)<span class="hljs-comment">//&#x4F7F;&#x7528;&#x63D2;&#x4EF6;</span></code></pre><h3 id="articleHeader5">&#x57FA;&#x672C;&#x4F7F;&#x7528;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const d = Vue.dialog({
    title: &apos;art-dialog-vue&apos;,
    content: {
              template: &apos;&lt;div&gt;"{{"name"}}"&#xFF0C;&#x6B22;&#x8FCE;&#x4F7F;&#x7528;&lt;/div&gt;&apos;,
              data() {
                  return {
                      name: &apos;hello&apos;
                }
              }
    },
    button: [
     {
         id: &apos;1&apos;,
         value: &apos;&#x786E;&#x5B9A;&apos;,
         callcack() {      
            //do something                                      
            return false;//&#x8FD4;&#x56DE;false &#x8868;&#x793A;&#x5F39;&#x7A97;&#x4E0D;&#x5173;&#x95ED;
        }
     },
     {
         id: &apos;2&apos;,
         value: &apos;&#x53D6;&#x6D88;&apos;,
         callcack() {      
            //do something                                      
            return false;//&#x8FD4;&#x56DE;false &#x8868;&#x793A;&#x5F39;&#x7A97;&#x4E0D;&#x5173;&#x95ED;
        }
     },
    ]
});
d.show();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>const d = Vue.dialog({
    title: <span class="hljs-string">&apos;art-dialog-vue&apos;</span>,
    content: {
              template: <span class="hljs-string">&apos;&lt;div&gt;"{{"name"}}"&#xFF0C;&#x6B22;&#x8FCE;&#x4F7F;&#x7528;&lt;/div&gt;&apos;</span>,
              <span class="hljs-keyword">data</span>() {
                  <span class="hljs-keyword">return</span> {
                      name: <span class="hljs-string">&apos;hello&apos;</span>
                }
              }
    },
    button: [
     {
         id: <span class="hljs-string">&apos;1&apos;</span>,
         value: <span class="hljs-string">&apos;&#x786E;&#x5B9A;&apos;</span>,
         callcack() {      
            <span class="hljs-comment">//do something                                      </span>
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;<span class="hljs-comment">//&#x8FD4;&#x56DE;false &#x8868;&#x793A;&#x5F39;&#x7A97;&#x4E0D;&#x5173;&#x95ED;</span>
        }
     },
     {
         id: <span class="hljs-string">&apos;2&apos;</span>,
         value: <span class="hljs-string">&apos;&#x53D6;&#x6D88;&apos;</span>,
         callcack() {      
            <span class="hljs-comment">//do something                                      </span>
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;<span class="hljs-comment">//&#x8FD4;&#x56DE;false &#x8868;&#x793A;&#x5F39;&#x7A97;&#x4E0D;&#x5173;&#x95ED;</span>
        }
     },
    ]
});
d.show();</code></pre><p>&#x8BE6;&#x7EC6;&#x4F7F;&#x7528;&#x6587;&#x6863;&#x8BF7;&#x53C2;&#x8003;&#xFF1A;<a href="https://leeseean.github.io/vue-dialog-API/" rel="nofollow noreferrer" target="_blank">https://leeseean.github.io/vu...</a>&#xFF0C;&#x9879;&#x76EE;github&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/leeseean/vue-dialog" rel="nofollow noreferrer" target="_blank">https://github.com/leeseean/v...</a>&#xFF08;&#x6C42;star&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue.js的dialog插件art-dialog-vue2.0发布

## 原文链接
[https://segmentfault.com/a/1190000015599611](https://segmentfault.com/a/1190000015599611)


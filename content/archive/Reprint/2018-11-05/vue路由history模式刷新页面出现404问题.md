---
title: vue路由history模式刷新页面出现404问题
hidden: true
categories: reprint
slug: 429669d4
date: 2018-11-05 02:30:10
---

{{< raw >}}
<p><code>vue hash</code>&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;<code>URL</code>&#x4E2D;&#x5B58;&#x5728;<code>&apos;#&apos;</code>&#xFF0C;&#x7528;<code>&apos;history&apos;</code>&#x6A21;&#x5F0F;&#x5C31;&#x80FD;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;&#x4F46;&#x662F;<code>history</code>&#x6A21;&#x5F0F;&#x4F1A;&#x51FA;&#x73B0;&#x5237;&#x65B0;&#x9875;&#x9762;&#x540E;&#xFF0C;&#x9875;&#x9762;&#x51FA;&#x73B0;404&#x3002;&#x89E3;&#x51B3;&#x7684;&#x529E;&#x6CD5;&#x662F;&#x7528;<code>nginx</code>&#x914D;&#x7F6E;&#x4E00;&#x4E0B;&#x3002;<br>&#x5728;<code>nginx</code>&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x4FEE;&#x6539;</p><p><strong>&#x65B9;&#x6CD5;&#x4E00;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location /{
    root   /data/nginx/html;
    index  index.html index.htm;
    if (!-e $request_filename) {
        rewrite ^/(.*) /index.html last;
        break;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs glsl"><code><span class="hljs-keyword">location</span> /{
    root   /data/nginx/html;
    <span class="hljs-keyword">index</span>  <span class="hljs-keyword">index</span>.html <span class="hljs-keyword">index</span>.htm;
    <span class="hljs-keyword">if</span> (!-e $request_filename) {
        rewrite ^/(.*) /<span class="hljs-keyword">index</span>.html last;
        <span class="hljs-keyword">break</span>;
    }
}</code></pre><p><strong>&#x65B9;&#x6CD5;&#x4E8C;&#xFF1A;</strong><br>vue.js&#x5B98;&#x65B9;&#x6559;&#x7A0B;&#x91CC;&#x63D0;&#x5230;&#x7684;<a href="https://router.vuejs.org/zh/guide/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank"></a><a href="https://router.vuejs.org/zh/guide/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">https://router.vuejs.org/zh/g...</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  server {
        listen       8081;#&#x9ED8;&#x8BA4;&#x7AEF;&#x53E3;&#x662F;80&#xFF0C;&#x5982;&#x679C;&#x7AEF;&#x53E3;&#x6CA1;&#x88AB;&#x5360;&#x7528;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x4FEE;&#x6539;
        server_name  myapp.com;
        root        D:/vue/my_app/dist;#vue&#x9879;&#x76EE;&#x7684;&#x6253;&#x5305;&#x540E;&#x7684;dist
        location / {
            try_files $uri $uri/ @router;#&#x9700;&#x8981;&#x6307;&#x5411;&#x4E0B;&#x9762;&#x7684;@router&#x5426;&#x5219;&#x4F1A;&#x51FA;&#x73B0;vue&#x7684;&#x8DEF;&#x7531;&#x5728;nginx&#x4E2D;&#x5237;&#x65B0;&#x51FA;&#x73B0;404
            index  index.html index.htm;
        }
        #&#x5BF9;&#x5E94;&#x4E0A;&#x9762;&#x7684;@router&#xFF0C;&#x4E3B;&#x8981;&#x539F;&#x56E0;&#x662F;&#x8DEF;&#x7531;&#x7684;&#x8DEF;&#x5F84;&#x8D44;&#x6E90;&#x5E76;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x771F;&#x5B9E;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x6240;&#x4EE5;&#x65E0;&#x6CD5;&#x627E;&#x5230;&#x5177;&#x4F53;&#x7684;&#x6587;&#x4EF6;
        #&#x56E0;&#x6B64;&#x9700;&#x8981;rewrite&#x5230;index.html&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x4EA4;&#x7ED9;&#x8DEF;&#x7531;&#x5728;&#x5904;&#x7406;&#x8BF7;&#x6C42;&#x8D44;&#x6E90;
        location @router {
            rewrite ^.*$ /index.html last;
        }
        #.......&#x5176;&#x4ED6;&#x90E8;&#x5206;&#x7701;&#x7565;
  }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nginx"><code>  <span class="hljs-section">server</span> {
        <span class="hljs-attribute">listen</span>       <span class="hljs-number">8081</span>;<span class="hljs-comment">#&#x9ED8;&#x8BA4;&#x7AEF;&#x53E3;&#x662F;80&#xFF0C;&#x5982;&#x679C;&#x7AEF;&#x53E3;&#x6CA1;&#x88AB;&#x5360;&#x7528;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x4FEE;&#x6539;</span>
        <span class="hljs-attribute">server_name</span>  myapp.com;
        <span class="hljs-attribute">root</span>        D:/vue/my_app/dist;<span class="hljs-comment">#vue&#x9879;&#x76EE;&#x7684;&#x6253;&#x5305;&#x540E;&#x7684;dist</span>
        <span class="hljs-attribute">location</span> / {
            <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ <span class="hljs-variable">@router</span>;<span class="hljs-comment">#&#x9700;&#x8981;&#x6307;&#x5411;&#x4E0B;&#x9762;&#x7684;@router&#x5426;&#x5219;&#x4F1A;&#x51FA;&#x73B0;vue&#x7684;&#x8DEF;&#x7531;&#x5728;nginx&#x4E2D;&#x5237;&#x65B0;&#x51FA;&#x73B0;404</span>
            <span class="hljs-attribute">index</span>  index.html index.htm;
        }
        <span class="hljs-comment">#&#x5BF9;&#x5E94;&#x4E0A;&#x9762;&#x7684;@router&#xFF0C;&#x4E3B;&#x8981;&#x539F;&#x56E0;&#x662F;&#x8DEF;&#x7531;&#x7684;&#x8DEF;&#x5F84;&#x8D44;&#x6E90;&#x5E76;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x771F;&#x5B9E;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x6240;&#x4EE5;&#x65E0;&#x6CD5;&#x627E;&#x5230;&#x5177;&#x4F53;&#x7684;&#x6587;&#x4EF6;</span>
        <span class="hljs-comment">#&#x56E0;&#x6B64;&#x9700;&#x8981;rewrite&#x5230;index.html&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x4EA4;&#x7ED9;&#x8DEF;&#x7531;&#x5728;&#x5904;&#x7406;&#x8BF7;&#x6C42;&#x8D44;&#x6E90;</span>
        <span class="hljs-attribute">location</span> <span class="hljs-variable">@router</span> {
            <span class="hljs-attribute">rewrite</span><span class="hljs-regexp"> ^.*$</span> /index.html <span class="hljs-literal">last</span>;
        }
        <span class="hljs-comment">#.......&#x5176;&#x4ED6;&#x90E8;&#x5206;&#x7701;&#x7565;</span>
  }
</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue路由history模式刷新页面出现404问题

## 原文链接
[https://segmentfault.com/a/1190000016653688](https://segmentfault.com/a/1190000016653688)


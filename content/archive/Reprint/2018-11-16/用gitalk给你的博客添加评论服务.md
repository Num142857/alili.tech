---
title: '用gitalk给你的博客添加评论服务' 
date: 2018-11-16 2:30:06
hidden: true
slug: llaqesehme8
categories: reprint
---

{{< raw >}}
<h1>&#x4E00;&#x3001;&#x524D;&#x8A00;</h1><p>&#x4E0D;&#x50CF;hexo&#x3001;jekyll&#x7B49;&#xFF0C;&#x4E3A;&#x4E86;&#x5B66;&#x4E60;&#xFF0C;&#x6211;&#x7684;&#x535A;&#x5BA2;&#x662F;&#x7528;<code>vue</code>&#x548C;<code>nodejs</code>&#x642D;&#x5EFA;&#x51FA;&#x6765;&#x7684;&#x3002;&#x652F;&#x6301;&#x5728;&#x7EBF;&#x7F16;&#x8F91;&#x548C;markdown&#x6E32;&#x67D3;&#x7B49;&#x529F;&#x80FD;&#x3002;</p><p>&#x5927;&#x5BB6;&#x5982;&#x679C;&#x611F;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x770B;&#x6211;&#x7684;<a>&#x535A;&#x5BA2;&#x5730;&#x5740;</a></p><p>&#x6700;&#x8FD1;&#x7ED9;&#x81EA;&#x5DF1;&#x7684;&#x535A;&#x5BA2;&#x6DFB;&#x52A0;&#x4E86;&#x8BC4;&#x8BBA;&#x670D;&#x52A1;&#xFF0C;&#x7528;&#x5230;&#x7684;&#x8BC4;&#x8BBA;&#x670D;&#x52A1;&#x662F;<a href="https://github.com/gitalk/gitalk" rel="nofollow noreferrer">Gitalk</a>&#xFF0C;&#x5B83;&#x662F;&#x57FA;&#x4E8E;<code>github issue</code>&#x642D;&#x5EFA;&#x51FA;&#x6765;&#x7684;&#x8BC4;&#x8BBA;&#x7CFB;&#x7EDF;&#x3002;&#x5E9F;&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x8BF4;&#x8BF4;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x3002;</p><h1>&#x4E8C;&#x3001;&#x5FC5;&#x8981;&#x7684;&#x51C6;&#x5907;</h1><h3>&#x5728;Github&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x5B58;&#x653E;&#x8BC4;&#x8BBA;&#x7684;&#x4ED3;&#x5E93;</h3><p>&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x7528;&#x4F60;&#x535A;&#x5BA2;&#x6240;&#x5728;&#x7684;&#x4ED3;&#x5E93;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x7684;&#x535A;&#x5BA2;&#x90E8;&#x7F72;&#x5230;&#x4E86;<code>coding pages</code>&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x5355;&#x72EC;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x4ED3;&#x5E93;&#x7528;&#x6765;&#x5B58;&#x653E;&#x8BC4;&#x8BBA;&#x3002;</p><h3>&#x6CE8;&#x518C;&#x4E00;&#x4E2A;<code>Github OAuth application</code></h3><p><a href="https://github.com/settings/applications/new" rel="nofollow noreferrer">&#x6CA1;&#x6709;&#x7684;&#x53EF;&#x4EE5;&#x70B9;&#x8FD9;&#x91CC;&#x7533;&#x8BF7;</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016060382?w=738&amp;h=683" src="https://static.alili.tech/img/remote/1460000016060382?w=738&amp;h=683" alt="&#x7533;&#x8BF7;OAuth application" title="&#x7533;&#x8BF7;OAuth application"></span></p><p>&#x6CE8;&#x518C;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x8BB0;&#x5F55;&#x4E0B;&#x4F60;&#x7684;<code>clientID</code>&#x548C;<code>clientSecret</code>&#x3002;</p><h1>&#x4E09;&#x3001;&#x5B89;&#x88C5;</h1><p>&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x5B89;&#x88C5;(CDN&#x548C;npm)&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x81EA;&#x884C;&#x9009;&#x62E9;&#x3002;</p><h3>1. CDN</h3><pre><code>  &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css&quot;&gt;
  &lt;script src=&quot;https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js&quot;&gt;&lt;/script&gt;

  &lt;!-- or --&gt;

  &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/gitalk/dist/gitalk.css&quot;&gt;
  &lt;script src=&quot;https://unpkg.com/gitalk/dist/gitalk.min.js&quot;&gt;&lt;/script&gt;</code></pre><h3>2. npm</h3><pre><code>npm i --save gitalk</code></pre><h1>&#x56DB;&#x3001;&#x4F7F;&#x7528;</h1><p>&#x8003;&#x8651;&#x5230;<code>vue</code>&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x7B49;&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x4E0A;&#x548C;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x7ED9;&#x51FA;&#x6765;&#x7684;&#x662F;&#x9700;&#x8981;&#x505A;&#x7565;&#x5FAE;&#x7684;&#x8C03;&#x6574;&#x7684;&#x3002;</p><h3>&#x5F15;&#x5165;gitalk</h3><pre><code>//&#x5728;index.html&#x9875;&#x9762;&#x4E2D;CDN&#x5F15;&#x5165;
&lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/gitalk/dist/gitalk.css&quot;&gt;
&lt;script src=&quot;https://unpkg.com/gitalk/dist/gitalk.min.js&quot;&gt;

//&#x5728;vue&#x4E2D;import
import Gitalk from &apos;gitalk&apos;</code></pre><h3>&#x521D;&#x59CB;&#x5316;Gitalk&#x5B9E;&#x4F8B;</h3><pre><code>export default {
  data(){
     return{
    gitalk: new Gitalk({
        clientID: &quot;&#x4F60;&#x7684;clientID&quot;,
            clientSecret: &quot;&#x4F60;&#x7684;clientSecret&quot;,
            repo: &quot;&#x521A;&#x521A;&#x521B;&#x5EFA;&#x7684;&#x9879;&#x76EE;&#x540D;&quot;,
            owner: &quot;github&#x7528;&#x6237;&#x540D;&quot;,
            admin: [&quot;github&#x7528;&#x6237;&#x540D;&quot;],
            id: window.location.hash, // &#x9ED8;&#x8BA4;&#x4E3A;pathname,&#x5982;&#x679C;&#x4F60;&#x4E5F;&#x662F;&#x50CF;&#x6211;&#x8FD9;&#x6837;&#x7528;vue&#x642D;&#x5EFA;&#x7684;&#xFF0C;&#x6211;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;hash&#xFF0C;&#x539F;&#x56E0;&#x5177;&#x4F53;&#x540E;&#x9762;&#x4F1A;&#x8BA8;&#x8BBA;&#x5230;&#x3002;
            distractionFreeMode: false // Facebook-like distraction free mode
    })    
    }
  }
}</code></pre><h3>&#x5728;&#x6070;&#x5F53;&#x7684;&#x4F4D;&#x7F6E;&#x6DFB;&#x52A0;&#x6807;&#x7B7E;,&#x7528;&#x6765;&#x6E32;&#x67D3;Gitalk&#x7EC4;&#x4EF6;&#x3002;</h3><pre><code>&lt;div id=&quot;gitalk-container&quot;&gt;&lt;/div&gt; </code></pre><h3>&#x6E32;&#x67D3;</h3><pre><code>mounted(){
  this.gitalk.render(&quot;gitalk-container&quot;);
}</code></pre><h1>&#x4E94;&#x3001;&#x6CE8;&#x610F;&#x4E8B;&#x9879;</h1><h3>id&#x7684;&#x8BBE;&#x7F6E;</h3><p>&#x8FD9;&#x4E2A;id&#x662F;&#x7528;&#x6765;&#x552F;&#x4E00;&#x533A;&#x5206;&#x9875;&#x9762;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4F60;&#x4E0D;&#x540C;&#x7684;&#x6587;&#x7AE0;&#x80AF;&#x5B9A;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x8BC4;&#x8BBA;&#x6570;&#x636E;&#xFF0C;<code>Gitalk</code>&#x8981;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;id&#x6765;&#x533A;&#x5206;&#x662F;&#x54EA;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x4F60;&#x7684;<code>github</code>&#x4ED3;&#x5E93;&#x521B;&#x5EFA;&#x76F8;&#x5E94;&#x7684;<code>issue</code>&#x6765;&#x5B58;&#x653E;&#x5F53;&#x9875;&#x8BC4;&#x8BBA;&#x6570;&#x636E;&#xFF0C;<code>id</code>&#x9ED8;&#x8BA4;&#x503C;&#x662F;<code>window.location.pathname</code></p><p>&#x4F46;&#x662F;&#x9ED8;&#x8BA4;&#x7684;&#x53EA;&#x9002;&#x7528;&#x4E8E;&#x91C7;&#x7528;<code>history</code>&#x6A21;&#x5F0F;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x4F46;&#x5BF9;&#x4E8E;<code>vue-router</code>&#x8FD9;&#x79CD;&#x9ED8;&#x8BA4;&#x91C7;&#x7528;<code>hash</code>&#x6A21;&#x5F0F;&#x7684;&#x5C31;&#x4E0D;&#x884C;&#x4E86;&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;</p><pre><code>//&#x5728;history&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x8DEF;&#x7531;URL&#x5982;&#x4E0B;&#x683C;&#x5F0F;
www.rychou.xyz/article/69

window.location.pathname;// &#x503C;&#x662F; /article/69

//&#x5728;hash&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x8DEF;&#x7531;&#x53D8;&#x6210;&#x8FD9;&#x6837;&#x4E86;
www.rychou.xyz/#/article/69

window.location.pathname; // &#x503C;&#x662F; /</code></pre><p>&#x6B64;&#x65F6;&#xFF0C;&#x5728;<code>hash</code>&#x6A21;&#x5F0F;&#x4E0B;<code>id</code>&#x5C31;&#x4E0D;&#x5177;&#x6709;&#x552F;&#x4E00;&#x6027;&#x4E86;&#x3002;</p><p>&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;<code>window.location.hash</code>&#xFF0C;&#x6B64;&#x65F6;&#x7684;&#x503C;&#x662F;<code>#/aticle/69</code>,&#x5177;&#x6709;&#x552F;&#x4E00;&#x6027;&#x3002;</p><p>&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;<code>vue-router</code>&#x4E3A;<code>history</code>&#x6A21;&#x5F0F;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x5237;&#x65B0;&#x9875;&#x9762;&#x51FA;&#x73B0;404&#x7684;BUG&#xFF0C;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x53C2;&#x8003;<a href="https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations" rel="nofollow noreferrer">&#x5B98;&#x65B9;&#x6587;&#x6863;</a></p><h3>&#x4E0D;&#x4F7F;&#x7528;&#x7C7B;&#x4F3C;&#x7684;&#x8BC4;&#x8BBA;&#x670D;&#x52A1;<a href="https://github.com/imsun/gitment" rel="nofollow noreferrer">Gitment</a>&#x7684;&#x539F;&#x56E0;</h3><p>&#x6211;&#x4E5F;&#x8BD5;&#x8FC7;&#x7528;<code>Gitment</code>&#xFF0C;&#x4E5F;&#x6210;&#x529F;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x4EE4;&#x4EBA;&#x4E0D;&#x723D;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x5C31;&#x662F;&#x6BCF;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x90FD;&#x9700;&#x8981;&#x624B;&#x52A8;&#x521D;&#x59CB;&#x5316;(&#x521B;&#x5EFA;&#x76F8;&#x5E94;issue)&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x8FD8;&#x662F;&#x7528;&#x4E86;<code>Gitalk</code>,&#x5B83;&#x4F1A;&#x6839;&#x636E;&#x4F60;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x81EA;&#x52A8;&#x5E2E;&#x4F60;&#x521D;&#x59CB;&#x5316;&#x3002;</p><h1>&#x516D;&#x3001;&#x6700;&#x540E;</h1><p>&#x6709;&#x95EE;&#x9898;&#x7684;&#x540C;&#x5B66;&#x4EEC;&#xFF0C;&#x6B22;&#x8FCE;&#x6765;<a href="http://www.rychou.xyz/#/article/69" rel="nofollow noreferrer">&#x539F;&#x6587;</a>&#x4E0B;&#x65B9;&#x63D0;&#x95EE;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x76F8;&#x5F53;&#x4E8E;&#x5E2E;&#x6211;&#x6D4B;&#x8BD5;&#x4E00;&#x4E0B;&#x8BC4;&#x8BBA;&#x670D;&#x52A1;&#x4E86;&#x3002;</p><blockquote><p>&#x53C2;&#x8003;&#x94FE;&#x63A5;&#xFF1A;</p><ul><li><a href="https://github.com/gitalk/gitalk" rel="nofollow noreferrer">Gitalk</a></li><li><a href="https://github.com/imsun/gitment" rel="nofollow noreferrer">Gitment</a></li><li><a href="https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations" rel="nofollow noreferrer">&#x5B98;&#x65B9;&#x6587;&#x6863;- vue-router History&#x6A21;&#x5F0F;</a></li></ul></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用gitalk给你的博客添加评论服务

## 原文链接
[https://segmentfault.com/a/1190000016060379](https://segmentfault.com/a/1190000016060379)


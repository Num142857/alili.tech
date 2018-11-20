---
title: '【笔记1】使用laravel-echo-server 搭建事件广播平台' 
date: 2018-11-21 2:30:10
hidden: true
slug: dyiyekuv9kg
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x6B64;&#x6587;&#x8BB0;&#x5F55;&#x4E00;&#x4E0B;&#x4E4B;&#x524D;&#x9879;&#x76EE;&#x4E2D;&#x9047;&#x5230;&#x7684;laravel&#x540E;&#x53F0;&#x5E7F;&#x64AD;&#x6D88;&#x606F;&#x5230;vue&#x524D;&#x53F0;&#x7684;&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;&#x3002;Laravel &#x5E76;&#x672A;&#x5185;&#x7F6E;&#x4E00;&#x4E2A; Socket.IO &#x670D;&#x52A1;&#x5668;&#x5B9E;&#x73B0;&#xFF0C;&#x4E0D;&#x8FC7;&#xFF0C;&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x7B2C;&#x4E09;&#x65B9;&#x5B9E;&#x73B0;&#x7684; Socket.IO &#x9A71;&#x52A8;&#xFF1A;<a href="https://github.com/tlaverdure/laravel-echo-server" rel="nofollow noreferrer" target="_blank"><code>laravel-echo-server</code></a>&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF1B;&#x6280;&#x672F;&#x8981;&#x70B9;&#xFF1A;<code>laravel</code> + <code>laravel-echo-server</code> + <code>vue/laravel-echo</code></blockquote><h3 id="articleHeader0">0. &#x6574;&#x4F53;&#x67B6;&#x6784;</h3><p><span class="img-wrap"><img data-src="/img/bVbek9t?w=747&amp;h=133" src="https://static.alili.tech/img/bVbek9t?w=747&amp;h=133" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader1">1. laravel-echo-server</h3><p>&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x53C2;&#x89C1;&#xFF1A;<a href="https://github.com/tlaverdure/laravel-echo-server" rel="nofollow noreferrer" target="_blank">https://github.com/tlaverdure...</a></p><h4>1.1 <code>laravel-echo-server</code>&#x670D;&#x52A1;&#x5668;&#x76F4;&#x63A5;&#x642D;&#x5EFA;&#x5728;laravel&#x9879;&#x76EE;&#x4E2D;&#xFF1A;</h4><p>&#x2460; &#x5168;&#x5C40;&#x5B89;&#x88C5;laravel-echo-server&#xFF1A; <code>npm install laravel-echo-server -g</code>;<br>&#x2461; &#x63A7;&#x5236;&#x53F0;&#x8FDB;&#x5165;laravel&#x9879;&#x76EE;&#xFF0C;&#x8FD0;&#x884C;&#x547D;&#x4EE4;&#xFF1A;<code>laravel-echo-server init</code><span class="img-wrap"><img data-src="/img/bVbej93?w=1430&amp;h=361" src="https://static.alili.tech/img/bVbej93?w=1430&amp;h=361" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span><br>&#x5728;laravel&#x9879;&#x76EE;&#x4E2D;&#x4F1A;&#x591A;&#x51FA;&#x4E00;&#x4E2A;<code>laravel-echo-server.json</code>&#x6587;&#x4EF6;&#xFF0C;&#x91CC;&#x9762;&#x5305;&#x542B;&#x4E86;&#x6240;&#x6709;&#x7684;&#x914D;&#x7F6E;&#x4FE1;&#x606F;&#xFF1B;<br>&#x2462; &#x901A;&#x8FC7;&#x8FD0;&#x884C;<code>laravel-echo-server start</code> &#x547D;&#x4EE4;&#x884C;&#x542F;&#x52A8;&#x670D;&#x52A1;</p><h4>1.2 <code>laravel-echo-server</code>&#x670D;&#x52A1;&#x5668;&#x72EC;&#x7ACB;&#x90E8;&#x7F72;</h4><p>&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#xFF0C;&#x5176;&#x5B9E;&#x53EA;&#x8981;&#x6709;&#x4E00;&#x4E2A;<code>laravel-echo-server.json</code>&#x6587;&#x4EF6;&#x5C31;&#x80FD;&#x542F;&#x52A8;&#x670D;&#x52A1;&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x7136;&#x53EF;&#x4EE5;&#x5C06;&#x670D;&#x52A1;&#x72EC;&#x7ACB;&#x51FA;laravel&#x9879;&#x76EE;&#x8FDB;&#x884C;&#x90E8;&#x7F72;&#xFF08;&#x89C9;&#x5F97;&#x6CA1;&#x5FC5;&#x8981;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x8FD9;&#x4E48;&#x6298;&#x817E;&#xFF09;&#x3002;<br>&#x4F7F;&#x7528;Http&#x7684;&#x65B9;&#x5F0F;&#x63A8;&#x9001;&#x6D88;&#x606F;&#x81F3;<code>laravel-echo-server</code>&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x683C;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="POST http://app.dev:6001/apps/your-appId/events?auth_key=you-key&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code style="word-break:break-word;white-space:initial">POST <span class="hljs-string">http:</span><span class="hljs-comment">//app.dev:6001/apps/your-appId/events?auth_key=you-key&apos;</span></code></pre><p>&#x7528;postman&#x6D4B;&#x8BD5;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbekdP?w=1304&amp;h=648" src="https://static.alili.tech/img/bVbekdP?w=1304&amp;h=648" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6D4B;&#x8BD5;&#x6210;&#x529F;&#xFF0C;<code>laravel-echo-server</code>&#x670D;&#x52A1;&#x5668;&#x642D;&#x5EFA;&#x6210;&#x529F;</p><h3 id="articleHeader2">2. laravel&#x540E;&#x53F0;</h3><p>&#x5B9A;&#x4E49;<code>BroadcastHttpPush.php</code>&#x4F5C;&#x4E3A;&#x63A5;&#x53E3;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;?php

namespace App\HelpTrait;

use GuzzleHttp\Client;

trait BroadcastHttpPush
{
    public function push($data)
    {
        $baseUrl = env(&apos;WEBSOCKET_BASEURL&apos;, &apos;http://localhost:6001/&apos;);
        $appId = env(&apos;WEBSOCKET_APPID&apos;, &apos;3ccfbd93b5e2906a&apos;);
        $key = env(&apos;WEBSOCKET_KEY&apos;, &apos;6509c546c053d59057a61e46ae9a7898&apos;);
        $httpUrl = $baseUrl . &apos;apps/&apos; . $appId . &apos;/events?auth_key=&apos; . $key;
      
        $client = new Client([
            &apos;base_uri&apos; =&gt; $httpUrl,
            &apos;timeout&apos; =&gt; 2.0,
        ]);
        $response = $client-&gt;post($httpUrl, [
            &apos;json&apos; =&gt; $data
        ]);
        $code = $response-&gt;getStatusCode();
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>

<span class="hljs-keyword">namespace</span> <span class="hljs-title">App</span>\<span class="hljs-title">HelpTrait</span>;

<span class="hljs-keyword">use</span> <span class="hljs-title">GuzzleHttp</span>\<span class="hljs-title">Client</span>;

<span class="hljs-keyword">trait</span> BroadcastHttpPush
{
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">push</span><span class="hljs-params">($data)</span>
    </span>{
        $baseUrl = env(<span class="hljs-string">&apos;WEBSOCKET_BASEURL&apos;</span>, <span class="hljs-string">&apos;http://localhost:6001/&apos;</span>);
        $appId = env(<span class="hljs-string">&apos;WEBSOCKET_APPID&apos;</span>, <span class="hljs-string">&apos;3ccfbd93b5e2906a&apos;</span>);
        $key = env(<span class="hljs-string">&apos;WEBSOCKET_KEY&apos;</span>, <span class="hljs-string">&apos;6509c546c053d59057a61e46ae9a7898&apos;</span>);
        $httpUrl = $baseUrl . <span class="hljs-string">&apos;apps/&apos;</span> . $appId . <span class="hljs-string">&apos;/events?auth_key=&apos;</span> . $key;
      
        $client = <span class="hljs-keyword">new</span> Client([
            <span class="hljs-string">&apos;base_uri&apos;</span> =&gt; $httpUrl,
            <span class="hljs-string">&apos;timeout&apos;</span> =&gt; <span class="hljs-number">2.0</span>,
        ]);
        $response = $client-&gt;post($httpUrl, [
            <span class="hljs-string">&apos;json&apos;</span> =&gt; $data
        ]);
        $code = $response-&gt;getStatusCode();
    }
}</span></code></pre><p>&#x4F7F;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;?php

namespace App\Controllers;

use App\HelpTrait\BroadcastHttpPush;

class SendMessage
{
    use BroadcastHttpPush;
    
    public function index()
    {
        $broadcastChannel = array(
            &quot;channel&quot; =&gt; &quot;private-Message&quot;,   // &#x901A;&#x9053;&#x540D;&#xFF0C;`private-`&#x8868;&#x793A;&#x79C1;&#x6709;
            &quot;name&quot; =&gt; &quot;sayHello&quot;,    // &#x4E8B;&#x4EF6;&#x540D;
            &quot;data&quot; =&gt; array(
                &quot;status&quot; =&gt; 200, 
                &quot;message&quot; =&gt; &quot;hello world!&quot;
            )
        );
        $this-&gt;push($broadcastChannel);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>

<span class="hljs-keyword">namespace</span> <span class="hljs-title">App</span>\<span class="hljs-title">Controllers</span>;

<span class="hljs-keyword">use</span> <span class="hljs-title">App</span>\<span class="hljs-title">HelpTrait</span>\<span class="hljs-title">BroadcastHttpPush</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SendMessage</span>
</span>{
    <span class="hljs-keyword">use</span> <span class="hljs-title">BroadcastHttpPush</span>;
    
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">index</span><span class="hljs-params">()</span>
    </span>{
        $broadcastChannel = <span class="hljs-keyword">array</span>(
            <span class="hljs-string">&quot;channel&quot;</span> =&gt; <span class="hljs-string">&quot;private-Message&quot;</span>,   <span class="hljs-comment">// &#x901A;&#x9053;&#x540D;&#xFF0C;`private-`&#x8868;&#x793A;&#x79C1;&#x6709;</span>
            <span class="hljs-string">&quot;name&quot;</span> =&gt; <span class="hljs-string">&quot;sayHello&quot;</span>,    <span class="hljs-comment">// &#x4E8B;&#x4EF6;&#x540D;</span>
            <span class="hljs-string">&quot;data&quot;</span> =&gt; <span class="hljs-keyword">array</span>(
                <span class="hljs-string">&quot;status&quot;</span> =&gt; <span class="hljs-number">200</span>, 
                <span class="hljs-string">&quot;message&quot;</span> =&gt; <span class="hljs-string">&quot;hello world!&quot;</span>
            )
        );
        <span class="hljs-keyword">$this</span>-&gt;push($broadcastChannel);
    }
}</span></code></pre><h3 id="articleHeader3">3. vue&#x524D;&#x7AEF;</h3><p>&#x5B9A;&#x4E49;<code>UserActionNotification.vue</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import Echo from &apos;laravel-echo&apos;
import io from &apos;socket.io-client&apos;
export default {
  mounted() {
    window.io = io
    window.Echo = new Echo({
      broadcaster: &apos;socket.io&apos;,
      host: &apos;http://localhost:6001&apos;,
    })
    window.Echo.private(&apos;Message&apos;).listen(&apos;.sayHello&apos;, (res) =&gt; {
       if (res.status === 200) {
         console.log(res.message)
       } else {
         console.log(&apos;something wrong!&apos;)
       }
    })
  }
}
&lt;/script&gt;

&lt;style lang=&quot;sass&quot; scoped&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Echo <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;laravel-echo&apos;</span>
<span class="hljs-keyword">import</span> io <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;socket.io-client&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  mounted() {
    <span class="hljs-built_in">window</span>.io = io
    <span class="hljs-built_in">window</span>.Echo = <span class="hljs-keyword">new</span> Echo({
      <span class="hljs-attr">broadcaster</span>: <span class="hljs-string">&apos;socket.io&apos;</span>,
      <span class="hljs-attr">host</span>: <span class="hljs-string">&apos;http://localhost:6001&apos;</span>,
    })
    <span class="hljs-built_in">window</span>.Echo.private(<span class="hljs-string">&apos;Message&apos;</span>).listen(<span class="hljs-string">&apos;.sayHello&apos;</span>, (res) =&gt; {
       <span class="hljs-keyword">if</span> (res.status === <span class="hljs-number">200</span>) {
         <span class="hljs-built_in">console</span>.log(res.message)
       } <span class="hljs-keyword">else</span> {
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;something wrong!&apos;</span>)
       }
    })
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;sass&quot;</span> <span class="hljs-attr">scoped</span>&gt;</span></code><span class="undefined"></span></pre><p><code>&#x6CE8;&#xFF1A;</code>&#x4E8B;&#x4EF6;<code>sayHello</code>&#x524D;&#x9762;&#x8981;&#x52A0;<code>.</code>, &#x4E0D;&#x7136;&#x9700;&#x8981;&#x5E26;&#x4E0A;&#x4E8B;&#x4EF6;&#x7684;&#x57DF;&#x540D;&#x7A7A;&#x95F4;&#xFF1B;</p><h3 id="articleHeader4">4. &#x53C2;&#x8003;&#x8D44;&#x6599;</h3><ul><li><a href="http://laravelacademy.org/post/8379.html" rel="nofollow noreferrer" target="_blank">Laravel 5.5 &#x6587;&#x6863; &#x8FDB;&#x9636;&#x7CFB;&#x5217; &#x2014;&#x2014; Laravel &#x4E2D;&#x670D;&#x52A1;&#x7AEF;&#x4E0E;&#x5BA2;&#x6237;&#x7AEF;&#x4E8B;&#x4EF6;&#x5E7F;&#x64AD;&#x5B9E;&#x73B0;</a></li><li><a href="https://github.com/tlaverdure/laravel-echo-server" rel="nofollow noreferrer" target="_blank">tlaverdure/laravel-echo-server</a></li><li><a href="https://www.npmjs.com/package/laravel-echo" rel="nofollow noreferrer" target="_blank">laravel-echo</a></li><li><a href="http://www.cnblogs.com/redirect/p/8658800.html" rel="nofollow noreferrer" target="_blank">laravel5.5&#x4E8B;&#x4EF6;&#x5E7F;&#x64AD;&#x7CFB;&#x7EDF;&#x5B9E;&#x4F8B;laravel-echo + redis + socket.io</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【笔记1】使用laravel-echo-server 搭建事件广播平台

## 原文链接
[https://segmentfault.com/a/1190000015772826](https://segmentfault.com/a/1190000015772826)


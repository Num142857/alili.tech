---
title: 'Vue源码阅读 - 批量异步更新与nextTick原理' 
date: 2018-11-22 11:48:10
hidden: true
slug: zx0671ot98
categories: [reprint]
---

{{< raw >}}
<p>vue&#x5DF2;&#x662F;&#x76EE;&#x524D;&#x56FD;&#x5185;&#x524D;&#x7AEF;web&#x7AEF;&#x4E09;&#x5206;&#x5929;&#x4E0B;&#x4E4B;&#x4E00;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x4F5C;&#x4E3A;&#x672C;&#x4EBA;&#x4E3B;&#x8981;&#x6280;&#x672F;&#x6808;&#x4E4B;&#x4E00;&#xFF0C;&#x5728;&#x65E5;&#x5E38;&#x4F7F;&#x7528;&#x4E2D;&#x77E5;&#x5176;&#x7136;&#x4E5F;&#x597D;&#x5947;&#x7740;&#x6240;&#x4EE5;&#x7136;&#xFF0C;&#x53E6;&#x5916;&#x6700;&#x8FD1;&#x7684;&#x793E;&#x533A;&#x6D8C;&#x73B0;&#x4E86;&#x4E00;&#x5927;&#x7968;vue&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x7C7B;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x5728;&#x4E0B;&#x501F;&#x8FD9;&#x4E2A;&#x673A;&#x4F1A;&#x4ECE;&#x5927;&#x5BB6;&#x7684;&#x6587;&#x7AE0;&#x548C;&#x8BA8;&#x8BBA;&#x4E2D;&#x6C72;&#x53D6;&#x4E86;&#x4E00;&#x4E9B;&#x8425;&#x517B;&#xFF0C;&#x540C;&#x65F6;&#x5BF9;&#x4E00;&#x4E9B;&#x9605;&#x8BFB;&#x6E90;&#x7801;&#x65F6;&#x7684;&#x60F3;&#x6CD5;&#x8FDB;&#x884C;&#x603B;&#x7ED3;&#xFF0C;&#x51FA;&#x4EA7;&#x4E00;&#x4E9B;&#x6587;&#x7AE0;&#xFF0C;&#x4F5C;&#x4E3A;&#x81EA;&#x5DF1;&#x601D;&#x8003;&#x7684;&#x603B;&#x7ED3;&#xFF0C;&#x672C;&#x4EBA;&#x6C34;&#x5E73;&#x6709;&#x9650;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x8BA8;&#x8BBA;~</p><p>&#x76EE;&#x6807;Vue&#x7248;&#x672C;&#xFF1A;<code>2.5.17-beta.0</code></p><p>vue&#x6E90;&#x7801;&#x6CE8;&#x91CA;&#xFF1A;<a href="https://github.com/SHERlocked93/vue-analysis" rel="nofollow noreferrer" target="_blank">https://github.com/SHERlocked93/vue-analysis</a></p><p>&#x58F0;&#x660E;&#xFF1A;&#x6587;&#x7AE0;&#x4E2D;&#x6E90;&#x7801;&#x7684;&#x8BED;&#x6CD5;&#x90FD;&#x4F7F;&#x7528; Flow&#xFF0C;&#x5E76;&#x4E14;&#x6E90;&#x7801;&#x6839;&#x636E;&#x9700;&#x8981;&#x90FD;&#x6709;&#x5220;&#x8282;(&#x4E3A;&#x4E86;&#x4E0D;&#x88AB;&#x8FF7;&#x7CCA; @_@)&#xFF0C;&#x5982;&#x679C;&#x8981;&#x770B;&#x5B8C;&#x6574;&#x7248;&#x7684;&#x8BF7;&#x8FDB;&#x5165;&#x4E0A;&#x9762;&#x7684;<a href="https://github.com/SHERlocked93/vue-analysis" rel="nofollow noreferrer" target="_blank">github&#x5730;&#x5740;</a>&#xFF0C;&#x672C;&#x6587;&#x662F;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#xFF0C;&#x6587;&#x7AE0;&#x5730;&#x5740;&#x89C1;&#x5E95;&#x90E8;~</p><h2 id="articleHeader0">1. &#x5F02;&#x6B65;&#x66F4;&#x65B0;</h2><p><a href="https://juejin.im/post/5b38830de51d455888216675" rel="nofollow noreferrer" target="_blank">&#x4E0A;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;</a>&#x6211;&#x4EEC;&#x5728;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x539F;&#x7406;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x65B9;&#x6CD5; <code>defineReactive</code> &#x4E2D;&#x7684; <code>setter</code> &#x8BBF;&#x95EE;&#x5668;&#x4E2D;&#x6709;&#x6D3E;&#x53D1;&#x66F4;&#x65B0; <code>dep.notify()</code> &#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4F1A;&#x6328;&#x4E2A;&#x901A;&#x77E5;&#x5728; <code>dep</code> &#x7684; <code>subs</code> &#x4E2D;&#x6536;&#x96C6;&#x7684;&#x8BA2;&#x9605;&#x81EA;&#x5DF1;&#x53D8;&#x52A8;&#x7684;watchers&#x6267;&#x884C;update&#x3002;&#x4E00;&#x8D77;&#x6765;&#x770B;&#x770B; <code>update</code> &#x65B9;&#x6CD5;&#x7684;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/observer/watcher.js

/* Subscriber&#x63A5;&#x53E3;&#xFF0C;&#x5F53;&#x4F9D;&#x8D56;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C;&#x56DE;&#x8C03; */
update() {
  if (this.computed) {
    // &#x4E00;&#x4E2A;computed watcher&#x6709;&#x4E24;&#x79CD;&#x6A21;&#x5F0F;&#xFF1A;activated lazy(&#x9ED8;&#x8BA4;)
    // &#x53EA;&#x6709;&#x5F53;&#x5B83;&#x88AB;&#x81F3;&#x5C11;&#x4E00;&#x4E2A;&#x8BA2;&#x9605;&#x8005;&#x4F9D;&#x8D56;&#x65F6;&#x624D;&#x7F6E;activated&#xFF0C;&#x8FD9;&#x901A;&#x5E38;&#x662F;&#x53E6;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x6216;&#x7EC4;&#x4EF6;&#x7684;render function
    if (this.dep.subs.length === 0) {       // &#x5982;&#x679C;&#x6CA1;&#x4EBA;&#x8BA2;&#x9605;&#x8FD9;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x53D8;&#x5316;
      // lazy&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x5B83;&#x53EA;&#x5728;&#x5FC5;&#x8981;&#x65F6;&#x6267;&#x884C;&#x8BA1;&#x7B97;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x5730;&#x5C06;&#x89C2;&#x5BDF;&#x8005;&#x6807;&#x8BB0;&#x4E3A;dirty
      // &#x5F53;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x88AB;&#x8BBF;&#x95EE;&#x65F6;&#xFF0C;&#x5B9E;&#x9645;&#x7684;&#x8BA1;&#x7B97;&#x5728;this.evaluate()&#x4E2D;&#x6267;&#x884C;
      this.dirty = true
    } else {
      // activated&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x4E3B;&#x52A8;&#x6267;&#x884C;&#x8BA1;&#x7B97;&#xFF0C;&#x4F46;&#x53EA;&#x6709;&#x5F53;&#x503C;&#x786E;&#x5B9E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#x624D;&#x901A;&#x77E5;&#x6211;&#x4EEC;&#x7684;&#x8BA2;&#x9605;&#x8005;
      this.getAndInvoke(() =&gt; {
        this.dep.notify()     // &#x901A;&#x77E5;&#x6E32;&#x67D3;watcher&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x901A;&#x77E5;&#x4F9D;&#x8D56;&#x81EA;&#x5DF1;&#x7684;&#x6240;&#x6709;watcher&#x6267;&#x884C;update
      })
    }
  } else if (this.sync) {      // &#x540C;&#x6B65;
    this.run()
  } else {
    queueWatcher(this)        // &#x5F02;&#x6B65;&#x63A8;&#x9001;&#x5230;&#x8C03;&#x5EA6;&#x8005;&#x89C2;&#x5BDF;&#x8005;&#x961F;&#x5217;&#x4E2D;&#xFF0C;&#x4E0B;&#x4E00;&#x4E2A;tick&#x65F6;&#x8C03;&#x7528;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/observer/watcher.js</span>

<span class="hljs-comment">/* Subscriber&#x63A5;&#x53E3;&#xFF0C;&#x5F53;&#x4F9D;&#x8D56;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C;&#x56DE;&#x8C03; */</span>
update() {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.computed) {
    <span class="hljs-comment">// &#x4E00;&#x4E2A;computed watcher&#x6709;&#x4E24;&#x79CD;&#x6A21;&#x5F0F;&#xFF1A;activated lazy(&#x9ED8;&#x8BA4;)</span>
    <span class="hljs-comment">// &#x53EA;&#x6709;&#x5F53;&#x5B83;&#x88AB;&#x81F3;&#x5C11;&#x4E00;&#x4E2A;&#x8BA2;&#x9605;&#x8005;&#x4F9D;&#x8D56;&#x65F6;&#x624D;&#x7F6E;activated&#xFF0C;&#x8FD9;&#x901A;&#x5E38;&#x662F;&#x53E6;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x6216;&#x7EC4;&#x4EF6;&#x7684;render function</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.dep.subs.length === <span class="hljs-number">0</span>) {       <span class="hljs-comment">// &#x5982;&#x679C;&#x6CA1;&#x4EBA;&#x8BA2;&#x9605;&#x8FD9;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x53D8;&#x5316;</span>
      <span class="hljs-comment">// lazy&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x5B83;&#x53EA;&#x5728;&#x5FC5;&#x8981;&#x65F6;&#x6267;&#x884C;&#x8BA1;&#x7B97;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x5730;&#x5C06;&#x89C2;&#x5BDF;&#x8005;&#x6807;&#x8BB0;&#x4E3A;dirty</span>
      <span class="hljs-comment">// &#x5F53;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x88AB;&#x8BBF;&#x95EE;&#x65F6;&#xFF0C;&#x5B9E;&#x9645;&#x7684;&#x8BA1;&#x7B97;&#x5728;this.evaluate()&#x4E2D;&#x6267;&#x884C;</span>
      <span class="hljs-keyword">this</span>.dirty = <span class="hljs-literal">true</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// activated&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x4E3B;&#x52A8;&#x6267;&#x884C;&#x8BA1;&#x7B97;&#xFF0C;&#x4F46;&#x53EA;&#x6709;&#x5F53;&#x503C;&#x786E;&#x5B9E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#x624D;&#x901A;&#x77E5;&#x6211;&#x4EEC;&#x7684;&#x8BA2;&#x9605;&#x8005;</span>
      <span class="hljs-keyword">this</span>.getAndInvoke(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.dep.notify()     <span class="hljs-comment">// &#x901A;&#x77E5;&#x6E32;&#x67D3;watcher&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x901A;&#x77E5;&#x4F9D;&#x8D56;&#x81EA;&#x5DF1;&#x7684;&#x6240;&#x6709;watcher&#x6267;&#x884C;update</span>
      })
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.sync) {      <span class="hljs-comment">// &#x540C;&#x6B65;</span>
    <span class="hljs-keyword">this</span>.run()
  } <span class="hljs-keyword">else</span> {
    queueWatcher(<span class="hljs-keyword">this</span>)        <span class="hljs-comment">// &#x5F02;&#x6B65;&#x63A8;&#x9001;&#x5230;&#x8C03;&#x5EA6;&#x8005;&#x89C2;&#x5BDF;&#x8005;&#x961F;&#x5217;&#x4E2D;&#xFF0C;&#x4E0B;&#x4E00;&#x4E2A;tick&#x65F6;&#x8C03;&#x7528;</span>
  }
}</code></pre><p>&#x5982;&#x679C;&#x4E0D;&#x662F; <code>computed watcher</code> &#x4E5F;&#x975E; <code>sync</code> &#x4F1A;&#x628A;&#x8C03;&#x7528;update&#x7684;&#x5F53;&#x524D;watcher&#x63A8;&#x9001;&#x5230;&#x8C03;&#x5EA6;&#x8005;&#x961F;&#x5217;&#x4E2D;&#xFF0C;&#x4E0B;&#x4E00;&#x4E2A;tick&#x65F6;&#x8C03;&#x7528;&#xFF0C;&#x770B;&#x770B; <code>queueWatcher</code> &#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/observer/scheduler.js

/* &#x5C06;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x5BF9;&#x8C61;push&#x8FDB;&#x89C2;&#x5BDF;&#x8005;&#x961F;&#x5217;&#xFF0C;&#x5728;&#x961F;&#x5217;&#x4E2D;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x76F8;&#x540C;&#x7684;id&#x5219;
 * &#x8BE5;watcher&#x5C06;&#x88AB;&#x8DF3;&#x8FC7;&#xFF0C;&#x9664;&#x975E;&#x5B83;&#x662F;&#x5728;&#x961F;&#x5217;&#x6B63;&#x88AB;flush&#x65F6;&#x63A8;&#x9001;
 */
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {     // &#x68C0;&#x9A8C;id&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF0C;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x5219;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x5219;&#x6807;&#x8BB0;&#x54C8;&#x5E0C;&#x8868;has&#xFF0C;&#x7528;&#x4E8E;&#x4E0B;&#x6B21;&#x68C0;&#x9A8C;
    has[id] = true
    queue.push(watcher)      // &#x5982;&#x679C;&#x6CA1;&#x6709;&#x6B63;&#x5728;flush&#xFF0C;&#x76F4;&#x63A5;push&#x5230;&#x961F;&#x5217;&#x4E2D;
    if (!waiting) {          // &#x6807;&#x8BB0;&#x662F;&#x5426;&#x5DF2;&#x4F20;&#x7ED9;nextTick
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}

/* &#x91CD;&#x7F6E;&#x8C03;&#x5EA6;&#x8005;&#x72B6;&#x6001; */
function resetSchedulerState () {
  queue.length = 0
  has = {}
  waiting = false
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/observer/scheduler.js</span>

<span class="hljs-comment">/* &#x5C06;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x5BF9;&#x8C61;push&#x8FDB;&#x89C2;&#x5BDF;&#x8005;&#x961F;&#x5217;&#xFF0C;&#x5728;&#x961F;&#x5217;&#x4E2D;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x76F8;&#x540C;&#x7684;id&#x5219;
 * &#x8BE5;watcher&#x5C06;&#x88AB;&#x8DF3;&#x8FC7;&#xFF0C;&#x9664;&#x975E;&#x5B83;&#x662F;&#x5728;&#x961F;&#x5217;&#x6B63;&#x88AB;flush&#x65F6;&#x63A8;&#x9001;
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queueWatcher</span> (<span class="hljs-params">watcher: Watcher</span>) </span>{
  <span class="hljs-keyword">const</span> id = watcher.id
  <span class="hljs-keyword">if</span> (has[id] == <span class="hljs-literal">null</span>) {     <span class="hljs-comment">// &#x68C0;&#x9A8C;id&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF0C;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x5219;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x5219;&#x6807;&#x8BB0;&#x54C8;&#x5E0C;&#x8868;has&#xFF0C;&#x7528;&#x4E8E;&#x4E0B;&#x6B21;&#x68C0;&#x9A8C;</span>
    has[id] = <span class="hljs-literal">true</span>
    queue.push(watcher)      <span class="hljs-comment">// &#x5982;&#x679C;&#x6CA1;&#x6709;&#x6B63;&#x5728;flush&#xFF0C;&#x76F4;&#x63A5;push&#x5230;&#x961F;&#x5217;&#x4E2D;</span>
    <span class="hljs-keyword">if</span> (!waiting) {          <span class="hljs-comment">// &#x6807;&#x8BB0;&#x662F;&#x5426;&#x5DF2;&#x4F20;&#x7ED9;nextTick</span>
      waiting = <span class="hljs-literal">true</span>
      nextTick(flushSchedulerQueue)
    }
  }
}

<span class="hljs-comment">/* &#x91CD;&#x7F6E;&#x8C03;&#x5EA6;&#x8005;&#x72B6;&#x6001; */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resetSchedulerState</span> (<span class="hljs-params"></span>) </span>{
  queue.length = <span class="hljs-number">0</span>
  has = {}
  waiting = <span class="hljs-literal">false</span>
}</code></pre><p>&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86;&#x4E00;&#x4E2A; <code>has</code> &#x7684;&#x54C8;&#x5E0C;map&#x7528;&#x6765;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x5F53;&#x524D;watcher&#x7684;id&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF0C;&#x82E5;&#x5DF2;&#x5B58;&#x5728;&#x5219;&#x8DF3;&#x8FC7;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x5219;&#x5C31;push&#x5230; <code>queue</code> &#x961F;&#x5217;&#x4E2D;&#x5E76;&#x6807;&#x8BB0;&#x54C8;&#x5E0C;&#x8868;has&#xFF0C;&#x7528;&#x4E8E;&#x4E0B;&#x6B21;&#x68C0;&#x9A8C;&#xFF0C;&#x9632;&#x6B62;&#x91CD;&#x590D;&#x6DFB;&#x52A0;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x53BB;&#x91CD;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x6BD4;&#x6BCF;&#x6B21;&#x67E5;&#x91CD;&#x90FD;&#x8981;&#x53BB;queue&#x4E2D;&#x627E;&#x8981;&#x6587;&#x660E;&#xFF0C;&#x5728;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x4E0D;&#x4F1A;&#x91CD;&#x590D; <code>patch</code> &#x76F8;&#x540C;watcher&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x7B97;&#x540C;&#x6B65;&#x4FEE;&#x6539;&#x4E86;&#x4E00;&#x767E;&#x6B21;&#x89C6;&#x56FE;&#x4E2D;&#x7528;&#x5230;&#x7684;data&#xFF0C;&#x5F02;&#x6B65; <code>patch</code> &#x7684;&#x65F6;&#x5019;&#x4E5F;&#x53EA;&#x4F1A;&#x66F4;&#x65B0;&#x6700;&#x540E;&#x4E00;&#x6B21;&#x4FEE;&#x6539;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x7684; <code>waiting</code> &#x65B9;&#x6CD5;&#x662F;&#x7528;&#x6765;&#x6807;&#x8BB0; <code>flushSchedulerQueue</code> &#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x4F20;&#x9012;&#x7ED9; <code>nextTick</code> &#x7684;&#x6807;&#x8BB0;&#x4F4D;&#xFF0C;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x4F20;&#x9012;&#x5219;&#x53EA;push&#x5230;&#x961F;&#x5217;&#x4E2D;&#x4E0D;&#x4F20;&#x9012; <code>flushSchedulerQueue</code> &#x7ED9; <code>nextTick</code>&#xFF0C;&#x7B49;&#x5230; <code>resetSchedulerState</code> &#x91CD;&#x7F6E;&#x8C03;&#x5EA6;&#x8005;&#x72B6;&#x6001;&#x7684;&#x65F6;&#x5019; <code>waiting</code> &#x4F1A;&#x88AB;&#x7F6E;&#x56DE; <code>false</code> &#x5141;&#x8BB8; <code>flushSchedulerQueue</code> &#x88AB;&#x4F20;&#x9012;&#x7ED9;&#x4E0B;&#x4E00;&#x4E2A;tick&#x7684;&#x56DE;&#x8C03;&#xFF0C;&#x603B;&#x4E4B;&#x4FDD;&#x8BC1;&#x4E86; <code>flushSchedulerQueue</code> &#x56DE;&#x8C03;&#x5728;&#x4E00;&#x4E2A;tick&#x5185;&#x53EA;&#x5141;&#x8BB8;&#x88AB;&#x4F20;&#x5165;&#x4E00;&#x6B21;&#x3002;&#x6765;&#x770B;&#x770B;&#x88AB;&#x4F20;&#x9012;&#x7ED9; <code>nextTick</code> &#x7684;&#x56DE;&#x8C03; <code>flushSchedulerQueue</code> &#x505A;&#x4E86;&#x4EC0;&#x4E48;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/observer/scheduler.js

/* nextTick&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x4E0B;&#x4E00;&#x4E2A;tick&#x65F6;flush&#x6389;&#x4E24;&#x4E2A;&#x961F;&#x5217;&#x540C;&#x65F6;&#x8FD0;&#x884C;watchers */
function flushSchedulerQueue () {
  flushing = true
  let watcher, id

  queue.sort((a, b) =&gt; a.id - b.id)                    // &#x6392;&#x5E8F;

  for (index = 0; index &lt; queue.length; index++) {     // &#x4E0D;&#x8981;&#x5C06;length&#x8FDB;&#x884C;&#x7F13;&#x5B58;
    watcher = queue[index]
    if (watcher.before) {         // &#x5982;&#x679C;watcher&#x6709;before&#x5219;&#x6267;&#x884C;
      watcher.before()
    }
    id = watcher.id
    has[id] = null                // &#x5C06;has&#x7684;&#x6807;&#x8BB0;&#x5220;&#x9664;
    watcher.run()                 // &#x6267;&#x884C;watcher
    if (process.env.NODE_ENV !== &apos;production&apos; &amp;&amp; has[id] != null) {  // &#x5728;dev&#x73AF;&#x5883;&#x4E0B;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x8FDB;&#x5165;&#x6B7B;&#x5FAA;&#x73AF;
      circular[id] = (circular[id] || 0) + 1     // &#x6BD4;&#x5982;user watcher&#x8BA2;&#x9605;&#x81EA;&#x5DF1;&#x7684;&#x60C5;&#x51B5;
      if (circular[id] &gt; MAX_UPDATE_COUNT) {     // &#x6301;&#x7EED;&#x6267;&#x884C;&#x4E86;&#x4E00;&#x767E;&#x6B21;watch&#x4EE3;&#x8868;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x6B7B;&#x5FAA;&#x73AF;
        warn()                                  // &#x8FDB;&#x5165;&#x6B7B;&#x5FAA;&#x73AF;&#x7684;&#x8B66;&#x544A;
        break
      }
    }
  }
  resetSchedulerState()           // &#x91CD;&#x7F6E;&#x8C03;&#x5EA6;&#x8005;&#x72B6;&#x6001;
  callActivatedHooks()            // &#x4F7F;&#x5B50;&#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#x90FD;&#x7F6E;&#x6210;active&#x540C;&#x65F6;&#x8C03;&#x7528;activated&#x94A9;&#x5B50;
  callUpdatedHooks()              // &#x8C03;&#x7528;updated&#x94A9;&#x5B50;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/observer/scheduler.js</span>

<span class="hljs-comment">/* nextTick&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x4E0B;&#x4E00;&#x4E2A;tick&#x65F6;flush&#x6389;&#x4E24;&#x4E2A;&#x961F;&#x5217;&#x540C;&#x65F6;&#x8FD0;&#x884C;watchers */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flushSchedulerQueue</span> (<span class="hljs-params"></span>) </span>{
  flushing = <span class="hljs-literal">true</span>
  <span class="hljs-keyword">let</span> watcher, id

  queue.sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.id - b.id)                    <span class="hljs-comment">// &#x6392;&#x5E8F;</span>

  <span class="hljs-keyword">for</span> (index = <span class="hljs-number">0</span>; index &lt; queue.length; index++) {     <span class="hljs-comment">// &#x4E0D;&#x8981;&#x5C06;length&#x8FDB;&#x884C;&#x7F13;&#x5B58;</span>
    watcher = queue[index]
    <span class="hljs-keyword">if</span> (watcher.before) {         <span class="hljs-comment">// &#x5982;&#x679C;watcher&#x6709;before&#x5219;&#x6267;&#x884C;</span>
      watcher.before()
    }
    id = watcher.id
    has[id] = <span class="hljs-literal">null</span>                <span class="hljs-comment">// &#x5C06;has&#x7684;&#x6807;&#x8BB0;&#x5220;&#x9664;</span>
    watcher.run()                 <span class="hljs-comment">// &#x6267;&#x884C;watcher</span>
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span> &amp;&amp; has[id] != <span class="hljs-literal">null</span>) {  <span class="hljs-comment">// &#x5728;dev&#x73AF;&#x5883;&#x4E0B;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x8FDB;&#x5165;&#x6B7B;&#x5FAA;&#x73AF;</span>
      circular[id] = (circular[id] || <span class="hljs-number">0</span>) + <span class="hljs-number">1</span>     <span class="hljs-comment">// &#x6BD4;&#x5982;user watcher&#x8BA2;&#x9605;&#x81EA;&#x5DF1;&#x7684;&#x60C5;&#x51B5;</span>
      <span class="hljs-keyword">if</span> (circular[id] &gt; MAX_UPDATE_COUNT) {     <span class="hljs-comment">// &#x6301;&#x7EED;&#x6267;&#x884C;&#x4E86;&#x4E00;&#x767E;&#x6B21;watch&#x4EE3;&#x8868;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x6B7B;&#x5FAA;&#x73AF;</span>
        warn()                                  <span class="hljs-comment">// &#x8FDB;&#x5165;&#x6B7B;&#x5FAA;&#x73AF;&#x7684;&#x8B66;&#x544A;</span>
        <span class="hljs-keyword">break</span>
      }
    }
  }
  resetSchedulerState()           <span class="hljs-comment">// &#x91CD;&#x7F6E;&#x8C03;&#x5EA6;&#x8005;&#x72B6;&#x6001;</span>
  callActivatedHooks()            <span class="hljs-comment">// &#x4F7F;&#x5B50;&#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#x90FD;&#x7F6E;&#x6210;active&#x540C;&#x65F6;&#x8C03;&#x7528;activated&#x94A9;&#x5B50;</span>
  callUpdatedHooks()              <span class="hljs-comment">// &#x8C03;&#x7528;updated&#x94A9;&#x5B50;</span>
}</code></pre><p>&#x5728; <code>nextTick</code> &#x65B9;&#x6CD5;&#x4E2D;&#x6267;&#x884C; <code>flushSchedulerQueue</code> &#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x6328;&#x4E2A;&#x6267;&#x884C; <code>queue</code> &#x4E2D;&#x7684;watcher&#x7684; <code>run</code> &#x65B9;&#x6CD5;&#x3002;&#x6211;&#x4EEC;&#x770B;&#x5230;&#x5728;&#x9996;&#x5148;&#x6709;&#x4E2A; <code>queue.sort()</code> &#x65B9;&#x6CD5;&#x628A;&#x961F;&#x5217;&#x4E2D;&#x7684;watcher&#x6309;id&#x4ECE;&#x5C0F;&#x5230;&#x5927;&#x6392;&#x4E86;&#x4E2A;&#x5E8F;&#xFF0C;&#x8FD9;&#x6837;&#x505A;&#x53EF;&#x4EE5;&#x4FDD;&#x8BC1;&#xFF1A;</p><ol><li>&#x7EC4;&#x4EF6;&#x66F4;&#x65B0;&#x7684;&#x987A;&#x5E8F;&#x662F;&#x4ECE;&#x7236;&#x7EC4;&#x4EF6;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x987A;&#x5E8F;&#xFF0C;&#x56E0;&#x4E3A;&#x7236;&#x7EC4;&#x4EF6;&#x603B;&#x662F;&#x6BD4;&#x5B50;&#x7EC4;&#x4EF6;&#x5148;&#x521B;&#x5EFA;&#x3002;</li><li>&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;user watchers(&#x4FA6;&#x542C;&#x5668;watcher)&#x6BD4;render watcher&#x5148;&#x8FD0;&#x884C;&#xFF0C;&#x56E0;&#x4E3A;user watchers&#x5F80;&#x5F80;&#x6BD4;render watcher&#x66F4;&#x65E9;&#x521B;&#x5EFA;</li><li>&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x5728;&#x7236;&#x7EC4;&#x4EF6;watcher&#x8FD0;&#x884C;&#x671F;&#x95F4;&#x88AB;&#x9500;&#x6BC1;&#xFF0C;&#x5B83;&#x7684;watcher&#x6267;&#x884C;&#x5C06;&#x88AB;&#x8DF3;&#x8FC7;</li></ol><p>&#x5728;&#x6328;&#x4E2A;&#x6267;&#x884C;&#x961F;&#x5217;&#x4E2D;&#x7684;for&#x5FAA;&#x73AF;&#x4E2D;&#xFF0C;<code>index &lt; queue.length</code> &#x8FD9;&#x91CC;&#x6CA1;&#x6709;&#x5C06;length&#x8FDB;&#x884C;&#x7F13;&#x5B58;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x6267;&#x884C;&#x5904;&#x7406;&#x73B0;&#x6709;watcher&#x5BF9;&#x8C61;&#x671F;&#x95F4;&#xFF0C;&#x66F4;&#x591A;&#x7684;watcher&#x5BF9;&#x8C61;&#x53EF;&#x80FD;&#x4F1A;&#x88AB;push&#x8FDB;queue&#x3002;</p><p>&#x90A3;&#x4E48;&#x6570;&#x636E;&#x7684;&#x4FEE;&#x6539;&#x4ECE;model&#x5C42;&#x53CD;&#x6620;&#x5230;view&#x7684;&#x8FC7;&#x7A0B;&#xFF1A;<code>&#x6570;&#x636E;&#x66F4;&#x6539; -&gt; setter -&gt; Dep -&gt; Watcher -&gt; nextTick -&gt; patch -&gt; &#x66F4;&#x65B0;&#x89C6;&#x56FE;</code></p><h2 id="articleHeader1">2. nextTick&#x539F;&#x7406;</h2><h3 id="articleHeader2">2.1 &#x5B8F;&#x4EFB;&#x52A1;/&#x5FAE;&#x4EFB;&#x52A1;</h3><p>&#x8FD9;&#x91CC;&#x5C31;&#x6765;&#x770B;&#x770B;&#x5305;&#x542B;&#x7740;&#x6BCF;&#x4E2A;watcher&#x6267;&#x884C;&#x7684;&#x65B9;&#x6CD5;&#x88AB;&#x4F5C;&#x4E3A;&#x56DE;&#x8C03;&#x4F20;&#x5165; <code>nextTick</code> &#x4E4B;&#x540E;&#xFF0C;<code>nextTick</code> &#x5BF9;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x505A;&#x4E86;&#x4EC0;&#x4E48;&#x3002;&#x4E0D;&#x8FC7;&#x9996;&#x5148;&#x8981;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684; <code>EventLoop</code>&#x3001;<code>macro task</code>&#x3001;<code>micro task</code>&#x51E0;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x4E0D;&#x4E86;&#x89E3;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x4E00;&#x4E0B; <a href="https://segmentfault.com/a/1190000012362096#articleHeader6">JS&#x4E0E;Node.js&#x4E2D;&#x7684;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;</a> &#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x7528;&#x4E00;&#x5F20;&#x56FE;&#x6765;&#x8868;&#x660E;&#x4E00;&#x4E0B;&#x540E;&#x4E24;&#x8005;&#x5728;&#x4E3B;&#x7EBF;&#x7A0B;&#x4E2D;&#x7684;&#x6267;&#x884C;&#x5173;&#x7CFB;&#xFF1A;</p><p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV3EIf?w=547&amp;h=261" src="https://static.alili.techhttps://segmentfault.com/img/bV3EIf?w=547&amp;h=261" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#xFF0C;&#x5F53;&#x4E3B;&#x7EBF;&#x7A0B;&#x6267;&#x884C;&#x5B8C;&#x540C;&#x6B65;&#x4EFB;&#x52A1;&#x540E;&#xFF1A;</p><ol><li>&#x5F15;&#x64CE;&#x9996;&#x5148;&#x4ECE;macrotask queue&#x4E2D;&#x53D6;&#x51FA;&#x7B2C;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#xFF0C;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;&#x5C06;microtask queue&#x4E2D;&#x7684;&#x6240;&#x6709;&#x4EFB;&#x52A1;&#x53D6;&#x51FA;&#xFF0C;&#x6309;&#x987A;&#x5E8F;&#x5168;&#x90E8;&#x6267;&#x884C;&#xFF1B;</li><li>&#x7136;&#x540E;&#x518D;&#x4ECE;macrotask queue&#x4E2D;&#x53D6;&#x4E0B;&#x4E00;&#x4E2A;&#xFF0C;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;&#x518D;&#x6B21;&#x5C06;microtask queue&#x4E2D;&#x7684;&#x5168;&#x90E8;&#x53D6;&#x51FA;&#xFF1B;</li><li>&#x5FAA;&#x73AF;&#x5F80;&#x590D;&#xFF0C;&#x76F4;&#x5230;&#x4E24;&#x4E2A;queue&#x4E2D;&#x7684;&#x4EFB;&#x52A1;&#x90FD;&#x53D6;&#x5B8C;&#x3002;</li></ol><p>&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x4E2D;&#x5E38;&#x89C1;&#x7684;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#x79CD;&#x7C7B;&#xFF0C;&#x6309;&#x7167;&#x4F18;&#x5148;&#x7EA7;&#xFF1A;</p><ul><li><code>macro task</code> &#xFF1A;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x3001;<code>setImmediate</code>&#x3001;<code>MessageChannel</code>&#x3001;<code>setTimeout/setInterval</code></li><li><code>micro task</code>&#xFF1A;<code>Promise.then</code>&#x3001;<code>MutationObserver</code></li></ul><p>&#x6709;&#x7684;&#x6587;&#x7AE0;&#x628A; <code>micro task</code> &#x53EB;&#x5FAE;&#x4EFB;&#x52A1;&#xFF0C;<code>macro task</code> &#x53EB;&#x5B8F;&#x4EFB;&#x52A1;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E24;&#x4E2A;&#x5355;&#x8BCD;&#x62FC;&#x5199;&#x592A;&#x50CF;&#x4E86; -&#x3002;- &#xFF0C;&#x6240;&#x4EE5;&#x540E;&#x9762;&#x7684;&#x6CE8;&#x91CA;&#x591A;&#x7528;&#x4E2D;&#x6587;&#x8868;&#x793A;~</p><p>&#x5148;&#x6765;&#x770B;&#x770B;&#x6E90;&#x7801;&#x4E2D;&#x5BF9; <code>micro task</code> &#x4E0E; <code>macro task</code> &#x7684;&#x5B9E;&#x73B0;&#xFF1A; <code>macroTimerFunc</code>&#x3001;<code>microTimerFunc</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/util/next-tick.js

const callbacks = []     // &#x5B58;&#x653E;&#x5F02;&#x6B65;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;
let pending = false      // &#x4E00;&#x4E2A;&#x6807;&#x8BB0;&#x4F4D;&#xFF0C;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x6709;timerFunc&#x88AB;&#x63A8;&#x9001;&#x5230;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x4E2D;&#x53BB;&#x5219;&#x4E0D;&#x9700;&#x8981;&#x91CD;&#x590D;&#x63A8;&#x9001;

/* &#x6328;&#x4E2A;&#x540C;&#x6B65;&#x6267;&#x884C;callbacks&#x4E2D;&#x56DE;&#x8C03; */
function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i &lt; copies.length; i++) {
    copies[i]()
  }
}

let microTimerFunc        // &#x5FAE;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x65B9;&#x6CD5;
let macroTimerFunc        // &#x5B8F;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x65B9;&#x6CD5;
let useMacroTask = false  // &#x662F;&#x5426;&#x5F3A;&#x5236;&#x4E3A;&#x5B8F;&#x4EFB;&#x52A1;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;&#x5FAE;&#x4EFB;&#x52A1;

// &#x5B8F;&#x4EFB;&#x52A1;
if (typeof setImmediate !== &apos;undefined&apos; &amp;&amp; isNative(setImmediate)) {
  macroTimerFunc = () =&gt; {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel !== &apos;undefined&apos; &amp;&amp; (
  isNative(MessageChannel) ||
  MessageChannel.toString() === &apos;[object MessageChannelConstructor]&apos;  // PhantomJS
)) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () =&gt; {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () =&gt; {
    setTimeout(flushCallbacks, 0)
  }
}

// &#x5FAE;&#x4EFB;&#x52A1;
if (typeof Promise !== &apos;undefined&apos; &amp;&amp; isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () =&gt; {
    p.then(flushCallbacks)
  }
} else {
  microTimerFunc = macroTimerFunc      // fallback to macro
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/util/next-tick.js</span>

<span class="hljs-keyword">const</span> callbacks = []     <span class="hljs-comment">// &#x5B58;&#x653E;&#x5F02;&#x6B65;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;</span>
<span class="hljs-keyword">let</span> pending = <span class="hljs-literal">false</span>      <span class="hljs-comment">// &#x4E00;&#x4E2A;&#x6807;&#x8BB0;&#x4F4D;&#xFF0C;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x6709;timerFunc&#x88AB;&#x63A8;&#x9001;&#x5230;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x4E2D;&#x53BB;&#x5219;&#x4E0D;&#x9700;&#x8981;&#x91CD;&#x590D;&#x63A8;&#x9001;</span>

<span class="hljs-comment">/* &#x6328;&#x4E2A;&#x540C;&#x6B65;&#x6267;&#x884C;callbacks&#x4E2D;&#x56DE;&#x8C03; */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flushCallbacks</span>(<span class="hljs-params"></span>) </span>{
  pending = <span class="hljs-literal">false</span>
  <span class="hljs-keyword">const</span> copies = callbacks.slice(<span class="hljs-number">0</span>)
  callbacks.length = <span class="hljs-number">0</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; copies.length; i++) {
    copies[i]()
  }
}

<span class="hljs-keyword">let</span> microTimerFunc        <span class="hljs-comment">// &#x5FAE;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">let</span> macroTimerFunc        <span class="hljs-comment">// &#x5B8F;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">let</span> useMacroTask = <span class="hljs-literal">false</span>  <span class="hljs-comment">// &#x662F;&#x5426;&#x5F3A;&#x5236;&#x4E3A;&#x5B8F;&#x4EFB;&#x52A1;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;&#x5FAE;&#x4EFB;&#x52A1;</span>

<span class="hljs-comment">// &#x5B8F;&#x4EFB;&#x52A1;</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> setImmediate !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; isNative(setImmediate)) {
  macroTimerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    setImmediate(flushCallbacks)
  }
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> MessageChannel !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; (
  isNative(MessageChannel) ||
  MessageChannel.toString() === <span class="hljs-string">&apos;[object MessageChannelConstructor]&apos;</span>  <span class="hljs-comment">// PhantomJS</span>
)) {
  <span class="hljs-keyword">const</span> channel = <span class="hljs-keyword">new</span> MessageChannel()
  <span class="hljs-keyword">const</span> port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    port.postMessage(<span class="hljs-number">1</span>)
  }
} <span class="hljs-keyword">else</span> {
  macroTimerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    setTimeout(flushCallbacks, <span class="hljs-number">0</span>)
  }
}

<span class="hljs-comment">// &#x5FAE;&#x4EFB;&#x52A1;</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span> !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; isNative(<span class="hljs-built_in">Promise</span>)) {
  <span class="hljs-keyword">const</span> p = <span class="hljs-built_in">Promise</span>.resolve()
  microTimerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    p.then(flushCallbacks)
  }
} <span class="hljs-keyword">else</span> {
  microTimerFunc = macroTimerFunc      <span class="hljs-comment">// fallback to macro</span>
}</code></pre><p><code>flushCallbacks</code> &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x6328;&#x4E2A;&#x540C;&#x6B65;&#x7684;&#x53BB;&#x6267;&#x884C;callbacks&#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4EEC;&#xFF0C;callbacks&#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x662F;&#x5728;&#x8C03;&#x7528; <code>nextTick</code> &#x7684;&#x65F6;&#x5019;&#x6DFB;&#x52A0;&#x8FDB;&#x53BB;&#x7684;&#xFF1B;&#x90A3;&#x4E48;&#x600E;&#x4E48;&#x53BB;&#x4F7F;&#x7528; <code>micro task</code> &#x4E0E; <code>macro task</code> &#x53BB;&#x6267;&#x884C; <code>flushCallbacks</code> &#x5462;&#xFF0C;&#x8FD9;&#x91CC;&#x4ED6;&#x4EEC;&#x7684;&#x5B9E;&#x73B0; <code>macroTimerFunc</code>&#x3001;<code>microTimerFunc</code> &#x4F7F;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x5B8F;&#x4EFB;&#x52A1;/&#x5FAE;&#x4EFB;&#x52A1;&#x7684;API&#x5BF9;<code>flushCallbacks</code> &#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x4E86;&#x4E00;&#x5C42;&#x5305;&#x88C5;&#x3002;&#x6BD4;&#x5982;&#x5B8F;&#x4EFB;&#x52A1;&#x65B9;&#x6CD5; <code>macroTimerFunc=()=&gt;{ setImmediate(flushCallbacks) }</code>&#xFF0C;&#x8FD9;&#x6837;&#x5728;&#x89E6;&#x53D1;&#x5B8F;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019; <code>macroTimerFunc()</code> &#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;loop&#x7684;&#x65F6;&#x5019;&#x6D88;&#x8D39;&#x8FD9;&#x4E9B;&#x4FDD;&#x5B58;&#x5728;callbacks&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x4E86;&#xFF0C;&#x5FAE;&#x4EFB;&#x52A1;&#x540C;&#x7406;&#x3002;&#x540C;&#x65F6;&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x4F20;&#x7ED9; <code>nextTick</code> &#x7684;&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x662F;&#x88AB;&#x538B;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x540C;&#x6B65;&#x4EFB;&#x52A1;&#x5728;&#x4E00;&#x4E2A;tick&#x6267;&#x884C;&#x5B8C;&#x7684;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5F00;&#x542F;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#x3002;</p><p>&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x6BD4;&#x8F83;&#x96BE;&#x7406;&#x89E3;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528; <code>nextTick</code> &#x7684;&#x65F6;&#x5019; <code>pending</code> &#x4E3A;false&#xFF0C;&#x6B64;&#x65F6;&#x5DF2;&#x7ECF;push&#x5230;&#x6D4F;&#x89C8;&#x5668;event loop&#x4E2D;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;&#x6216;&#x5FAE;&#x4EFB;&#x52A1;&#x7684;task&#xFF0C;&#x5982;&#x679C;&#x5728;&#x6CA1;&#x6709;flush&#x6389;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x7EE7;&#x7EED;&#x5F80;callbacks&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#xFF0C;&#x90A3;&#x4E48;&#x5728;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x5360;&#x4F4D;queue&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x6267;&#x884C;&#x4E4B;&#x540E;&#x6DFB;&#x52A0;&#x7684;&#x56DE;&#x8C03;&#xFF0C;&#x6240;&#x4EE5; <code>macroTimerFunc</code>&#x3001;<code>microTimerFunc</code> &#x76F8;&#x5F53;&#x4E8E;task queue&#x7684;&#x5360;&#x4F4D;&#xFF0C;&#x4EE5;&#x540E; <code>pending</code> &#x4E3A;true&#x5219;&#x7EE7;&#x7EED;&#x5F80;&#x5360;&#x4F4D;queue&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#xFF0C;event loop&#x8F6E;&#x5230;&#x8FD9;&#x4E2A;task queue&#x7684;&#x65F6;&#x5019;&#x5C06;&#x4E00;&#x5E76;&#x6267;&#x884C;&#x3002;&#x6267;&#x884C; <code>flushCallbacks</code> &#x65F6; <code>pending</code> &#x7F6E;false&#xFF0C;&#x5141;&#x8BB8;&#x4E0B;&#x4E00;&#x8F6E;&#x6267;&#x884C; <code>nextTick</code> &#x65F6;&#x5F80;event loop&#x5360;&#x4F4D;&#x3002;</p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4E0A;&#x9762; <code>macroTimerFunc</code> &#x4E0E; <code>microTimerFunc</code> &#x8FDB;&#x884C;&#x4E86;&#x5728;&#x4E0D;&#x540C;&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x6027;&#x4E0B;&#x7684;&#x5E73;&#x7A33;&#x9000;&#x5316;&#xFF0C;&#x6216;&#x8005;&#x8BF4;<strong>&#x964D;&#x7EA7;&#x7B56;&#x7565;</strong>&#xFF1A;</p><ol><li><code>macroTimerFunc</code> &#xFF1A;<code>setImmediate -&gt; MessageChannel -&gt; setTimeout</code>&#x3002;&#x9996;&#x5148;&#x68C0;&#x6D4B;&#x662F;&#x5426;&#x539F;&#x751F;&#x652F;&#x6301; <code>setImmediate</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x53EA;&#x5728; IE&#x3001;Edge &#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x539F;&#x751F;&#x5B9E;&#x73B0;&#xFF0C;&#x7136;&#x540E;&#x68C0;&#x6D4B;&#x662F;&#x5426;&#x652F;&#x6301; <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel" rel="nofollow noreferrer" target="_blank">MessageChannel</a>&#xFF0C;&#x5982;&#x679C;&#x5BF9; <code>MessageChannel</code> &#x4E0D;&#x4E86;&#x89E3;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x4E00;&#x4E0B;<a href="https://zhuanlan.zhihu.com/p/37589777" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;</a>&#xFF0C;&#x8FD8;&#x4E0D;&#x652F;&#x6301;&#x7684;&#x8BDD;&#x6700;&#x540E;&#x4F7F;&#x7528; <code>setTimeout</code>&#xFF1B;<br>&#x4E3A;&#x4EC0;&#x4E48;&#x4F18;&#x5148;&#x4F7F;&#x7528; <code>setImmediate</code> &#x4E0E; <code>MessageChannel</code> &#x800C;&#x4E0D;&#x76F4;&#x63A5;&#x4F7F;&#x7528; <code>setTimeout</code> &#x5462;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;HTML5&#x89C4;&#x5B9A;<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout" rel="nofollow noreferrer" target="_blank">setTimeout&#x6267;&#x884C;&#x7684;&#x6700;&#x5C0F;&#x5EF6;&#x65F6;&#x4E3A;4ms</a>&#xFF0C;&#x800C;&#x5D4C;&#x5957;&#x7684;timeout&#x8868;&#x73B0;&#x4E3A;10ms&#xFF0C;&#x4E3A;&#x4E86;&#x5C3D;&#x53EF;&#x80FD;&#x5FEB;&#x7684;&#x8BA9;&#x56DE;&#x8C03;&#x6267;&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x6700;&#x5C0F;&#x5EF6;&#x65F6;&#x9650;&#x5236;&#x7684;&#x524D;&#x4E24;&#x8005;&#x663E;&#x7136;&#x8981;&#x4F18;&#x4E8E; <code>setTimeout</code>&#x3002;</li><li><code>microTimerFunc</code>&#xFF1A;<code>Promise.then -&gt; macroTimerFunc</code> &#x3002;&#x9996;&#x5148;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x652F;&#x6301; <code>Promise</code>&#xFF0C;&#x5982;&#x679C;&#x652F;&#x6301;&#x7684;&#x8BDD;&#x901A;&#x8FC7; <code>Promise.then</code> &#x6765;&#x8C03;&#x7528; <code>flushCallbacks</code> &#x65B9;&#x6CD5;&#xFF0C;&#x5426;&#x5219;&#x9000;&#x5316;&#x4E3A; <code>macroTimerFunc</code> &#xFF1B;<br>vue2.5&#x4E4B;&#x540E; <code>nextTick</code> &#x4E2D;&#x56E0;&#x4E3A;&#x517C;&#x5BB9;&#x6027;&#x539F;&#x56E0;&#x5220;&#x9664;&#x4E86;&#x5FAE;&#x4EFB;&#x52A1;&#x5E73;&#x7A33;&#x9000;&#x5316;&#x7684; <code>MutationObserver</code> &#x7684;&#x65B9;&#x5F0F;&#x3002;</li></ol><h3 id="articleHeader3">2.2 nextTick&#x5B9E;&#x73B0;</h3><p>&#x6700;&#x540E;&#x6765;&#x770B;&#x770B;&#x6211;&#x4EEC;&#x5E73;&#x5E38;&#x7528;&#x5230;&#x7684; <code>nextTick</code> &#x65B9;&#x6CD5;&#x5230;&#x5E95;&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/util/next-tick.js

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() =&gt; {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, &apos;nextTick&apos;)
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  if (!cb &amp;&amp; typeof Promise !== &apos;undefined&apos;) {
    return new Promise(resolve =&gt; {
      _resolve = resolve
    })
  }
}

/* &#x5F3A;&#x5236;&#x4F7F;&#x7528;macrotask&#x7684;&#x65B9;&#x6CD5; */
export function withMacroTask(fn: Function): Function {
  return fn._withTask || (fn._withTask = function() {
    useMacroTask = true
    const res = fn.apply(null, arguments)
    useMacroTask = false
    return res
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/util/next-tick.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nextTick</span>(<span class="hljs-params">cb?: Function, ctx?: Object</span>) </span>{
  <span class="hljs-keyword">let</span> _resolve
  callbacks.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (cb) {
      <span class="hljs-keyword">try</span> {
        cb.call(ctx)
      } <span class="hljs-keyword">catch</span> (e) {
        handleError(e, ctx, <span class="hljs-string">&apos;nextTick&apos;</span>)
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (_resolve) {
      _resolve(ctx)
    }
  })
  <span class="hljs-keyword">if</span> (!pending) {
    pending = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">if</span> (useMacroTask) {
      macroTimerFunc()
    } <span class="hljs-keyword">else</span> {
      microTimerFunc()
    }
  }
  <span class="hljs-keyword">if</span> (!cb &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span> !== <span class="hljs-string">&apos;undefined&apos;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      _resolve = resolve
    })
  }
}

<span class="hljs-comment">/* &#x5F3A;&#x5236;&#x4F7F;&#x7528;macrotask&#x7684;&#x65B9;&#x6CD5; */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withMacroTask</span>(<span class="hljs-params">fn: Function</span>): <span class="hljs-title">Function</span> </span>{
  <span class="hljs-keyword">return</span> fn._withTask || (fn._withTask = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    useMacroTask = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">const</span> res = fn.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>)
    useMacroTask = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">return</span> res
  })
}</code></pre><p><code>nextTick</code> &#x5728;&#x8FD9;&#x91CC;&#x5206;&#x4E3A;&#x4E09;&#x4E2A;&#x90E8;&#x5206;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#xFF1B;</p><ol><li>&#x9996;&#x5148; <code>nextTick</code> &#x628A;&#x4F20;&#x5165;&#x7684; <code>cb</code> &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7528; <code>try-catch</code> &#x5305;&#x88F9;&#x540E;&#x653E;&#x5728;&#x4E00;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#x4E2D;&#x63A8;&#x5165;callbacks&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x8FD9;&#x4E48;&#x505A;&#x662F;&#x56E0;&#x4E3A;&#x9632;&#x6B62;&#x5355;&#x4E2A; <code>cb</code> &#x5982;&#x679C;&#x6267;&#x884C;&#x9519;&#x8BEF;&#x4E0D;&#x81F3;&#x4E8E;&#x8BA9;&#x6574;&#x4E2A;JS&#x7EBF;&#x7A0B;&#x6302;&#x6389;&#xFF0C;&#x6BCF;&#x4E2A; <code>cb</code> &#x90FD;&#x5305;&#x88F9;&#x662F;&#x9632;&#x6B62;&#x8FD9;&#x4E9B;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5982;&#x679C;&#x6267;&#x884C;&#x9519;&#x8BEF;&#x4E0D;&#x4F1A;&#x76F8;&#x4E92;&#x5F71;&#x54CD;&#xFF0C;&#x6BD4;&#x5982;&#x524D;&#x4E00;&#x4E2A;&#x629B;&#x9519;&#x4E86;&#x540E;&#x4E00;&#x4E2A;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x6267;&#x884C;&#x3002;</li><li>&#x7136;&#x540E;&#x68C0;&#x67E5; <code>pending</code> &#x72B6;&#x6001;&#xFF0C;&#x8FD9;&#x4E2A;&#x8DDF;&#x4E4B;&#x524D;&#x4ECB;&#x7ECD;&#x7684; <code>queueWatcher</code> &#x4E2D;&#x7684; <code>waiting</code> &#x662F;&#x4E00;&#x4E2A;&#x610F;&#x601D;&#xFF0C;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x6807;&#x8BB0;&#x4F4D;&#xFF0C;&#x4E00;&#x5F00;&#x59CB;&#x662F; <code>false</code> &#x5728;&#x8FDB;&#x5165; <code>macroTimerFunc</code>&#x3001;<code>microTimerFunc</code> &#x65B9;&#x6CD5;&#x524D;&#x88AB;&#x7F6E;&#x4E3A; <code>true</code>&#xFF0C;&#x56E0;&#x6B64;&#x4E0B;&#x6B21;&#x8C03;&#x7528; <code>nextTick</code> &#x5C31;&#x4E0D;&#x4F1A;&#x8FDB;&#x5165; <code>macroTimerFunc</code>&#x3001;<code>microTimerFunc</code> &#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x4E2D;&#x4F1A;&#x5728;&#x4E0B;&#x4E00;&#x4E2A; <code>macro/micro tick</code> &#x65F6;&#x5019; <code>flushCallbacks</code> &#x5F02;&#x6B65;&#x7684;&#x53BB;&#x6267;&#x884C;callbacks&#x961F;&#x5217;&#x4E2D;&#x6536;&#x96C6;&#x7684;&#x4EFB;&#x52A1;&#xFF0C;&#x800C; <code>flushCallbacks</code> &#x65B9;&#x6CD5;&#x5728;&#x6267;&#x884C;&#x4E00;&#x5F00;&#x59CB;&#x4F1A;&#x628A; <code>pending</code> &#x7F6E; <code>false</code>&#xFF0C;&#x56E0;&#x6B64;&#x4E0B;&#x4E00;&#x6B21;&#x8C03;&#x7528; <code>nextTick</code> &#x65F6;&#x5019;&#x53C8;&#x80FD;&#x5F00;&#x542F;&#x65B0;&#x4E00;&#x8F6E;&#x7684; <code>macroTimerFunc</code>&#x3001;<code>microTimerFunc</code>&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x5F62;&#x6210;&#x4E86;vue&#x4E2D;&#x7684; <code>event loop</code>&#x3002;</li><li>&#x6700;&#x540E;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x4F20;&#x5165;&#x4E86; <code>cb</code>&#xFF0C;&#x56E0;&#x4E3A; <code>nextTick</code> &#x8FD8;&#x652F;&#x6301;Promise&#x5316;&#x7684;&#x8C03;&#x7528;&#xFF1A;<code>nextTick().then(() =&gt; {})</code>&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x4F20;&#x5165; <code>cb</code> &#x5C31;&#x76F4;&#x63A5;return&#x4E86;&#x4E00;&#x4E2A;Promise&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x4E14;&#x628A;resolve&#x4F20;&#x9012;&#x7ED9;_resolve&#xFF0C;&#x8FD9;&#x6837;&#x540E;&#x8005;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x8DF3;&#x5230;&#x6211;&#x4EEC;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x4F20;&#x9012;&#x8FDB; <code>then</code> &#x7684;&#x65B9;&#x6CD5;&#x4E2D;&#x3002;</li></ol><p>Vue&#x6E90;&#x7801;&#x4E2D; <code>next-tick.js</code> &#x6587;&#x4EF6;&#x8FD8;&#x6709;&#x4E00;&#x6BB5;&#x91CD;&#x8981;&#x7684;<a href="https://github.com/vuejs/vue/blob/48acf71a01e5665f72696d44aa5a8d8f1d137172/src/core/util/next-tick.js#L20" rel="nofollow noreferrer" target="_blank">&#x6CE8;&#x91CA;</a>&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x7FFB;&#x8BD1;&#x4E00;&#x4E0B;&#xFF1A;</p><blockquote>&#x5728;vue2.5&#x4E4B;&#x524D;&#x7684;&#x7248;&#x672C;&#x4E2D;&#xFF0C;nextTick&#x57FA;&#x672C;&#x4E0A;&#x57FA;&#x4E8E; <code>micro task</code> &#x6765;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x67D0;&#x4E9B;&#x60C5;&#x51B5;&#x4E0B; <code>micro task</code> &#x5177;&#x6709;&#x592A;&#x9AD8;&#x7684;&#x4F18;&#x5148;&#x7EA7;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x80FD;&#x5728;&#x8FDE;&#x7EED;&#x987A;&#x5E8F;&#x4E8B;&#x4EF6;&#x4E4B;&#x95F4;&#xFF08;&#x4F8B;&#x5982;<a href="https://github.com/vuejs/vue/issues/4521" rel="nofollow noreferrer" target="_blank">&#xFF03;4521</a>&#xFF0C;<a href="https://github.com/vuejs/vue/issues/6690" rel="nofollow noreferrer" target="_blank">&#xFF03;6690</a>&#xFF09;&#x6216;&#x8005;&#x751A;&#x81F3;&#x5728;&#x540C;&#x4E00;&#x4E8B;&#x4EF6;&#x7684;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#x8FC7;&#x7A0B;&#x4E2D;&#x4E4B;&#x95F4;&#x89E6;&#x53D1;&#xFF08;<a href="https://github.com/vuejs/vue/issues/6566" rel="nofollow noreferrer" target="_blank">&#xFF03;6566</a>&#xFF09;&#x3002;&#x4F46;&#x662F;&#x5982;&#x679C;&#x5168;&#x90E8;&#x90FD;&#x6539;&#x6210; <code>macro task</code>&#xFF0C;&#x5BF9;&#x4E00;&#x4E9B;&#x6709;&#x91CD;&#x7ED8;&#x548C;&#x52A8;&#x753B;&#x7684;&#x573A;&#x666F;&#x4E5F;&#x4F1A;&#x6709;&#x6027;&#x80FD;&#x5F71;&#x54CD;&#xFF0C;&#x5982; issue <a href="https://github.com/vuejs/vue/issues/6813" rel="nofollow noreferrer" target="_blank">#6813</a>&#x3002;vue2.5&#x4E4B;&#x540E;&#x7248;&#x672C;&#x63D0;&#x4F9B;&#x7684;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x662F;&#x9ED8;&#x8BA4;&#x4F7F;&#x7528; <code>micro task</code>&#xFF0C;&#x4F46;&#x5728;&#x9700;&#x8981;&#x65F6;&#xFF08;&#x4F8B;&#x5982;&#x5728;v-on&#x9644;&#x52A0;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#x4E2D;&#xFF09;&#x5F3A;&#x5236;&#x4F7F;&#x7528; <code>macro task</code>&#x3002;</blockquote><p>&#x4E3A;&#x4EC0;&#x4E48;&#x9ED8;&#x8BA4;&#x4F18;&#x5148;&#x4F7F;&#x7528; <code>micro task</code> &#x5462;&#xFF0C;&#x662F;&#x5229;&#x7528;&#x5176;&#x9AD8;&#x4F18;&#x5148;&#x7EA7;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4FDD;&#x8BC1;&#x961F;&#x5217;&#x4E2D;&#x7684;&#x5FAE;&#x4EFB;&#x52A1;&#x5728;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x5168;&#x90E8;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x3002;</p><p>&#x5F3A;&#x5236; <code>macro task</code> &#x7684;&#x65B9;&#x6CD5;&#x662F;&#x5728;&#x7ED1;&#x5B9A; DOM &#x4E8B;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F1A;&#x7ED9;&#x56DE;&#x8C03;&#x7684; handler &#x51FD;&#x6570;&#x8C03;&#x7528; <code>withMacroTask</code> &#x65B9;&#x6CD5;&#x505A;&#x4E00;&#x5C42;&#x5305;&#x88C5; <code>handler = withMacroTask(handler)</code>&#xFF0C;&#x5B83;&#x4FDD;&#x8BC1;&#x6574;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x9047;&#x5230;&#x6570;&#x636E;&#x72B6;&#x6001;&#x7684;&#x6539;&#x53D8;&#xFF0C;&#x8FD9;&#x4E9B;&#x6539;&#x53D8;&#x90FD;&#x4F1A;&#x88AB;&#x63A8;&#x5230; <code>macro task</code> &#x4E2D;&#x3002;&#x4EE5;&#x4E0A;&#x5B9E;&#x73B0;&#x5728; <a href="https://github.com/SHERlocked93/vue-analysis/blob/12343b07f468bd4b6c2e7c078312b882cd7885ee/vue/src/platforms/web/runtime/modules/events.js#L48" rel="nofollow noreferrer" target="_blank">src/platforms/web/runtime/modules/events.js</a> &#x7684; <code>add</code> &#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x770B;&#x4E00;&#x770B;&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x3002;</p><p>&#x521A;&#x597D;&#x5728;&#x5199;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x65F6;&#x5019;&#x601D;&#x5426;&#x4E0A;&#x6709;&#x4EBA;&#x95EE;&#x4E86;&#x4E2A;&#x95EE;&#x9898; <a href="https://segmentfault.com/q/1010000015663316?_ea=4018873">vue 2.4 &#x548C;2.5 &#x7248;&#x672C;&#x7684;@input&#x4E8B;&#x4EF6;&#x4E0D;&#x4E00;&#x6837;</a> &#xFF0C;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x7684;&#x539F;&#x56E0;&#x4E5F;&#x662F;&#x56E0;&#x4E3A;2.5&#x4E4B;&#x524D;&#x7248;&#x672C;&#x7684;DOM&#x4E8B;&#x4EF6;&#x91C7;&#x7528; <code>micro task</code> &#xFF0C;&#x800C;&#x4E4B;&#x540E;&#x91C7;&#x7528; <code>macro task</code>&#xFF0C;&#x89E3;&#x51B3;&#x7684;&#x9014;&#x5F84;&#x53C2;&#x8003; <a href="https://juejin.im/post/5a1af88f5188254a701ec230" rel="nofollow noreferrer" target="_blank">&lt; Vue.js &#x5347;&#x7EA7;&#x8E29;&#x5751;&#x5C0F;&#x8BB0;&gt;</a> &#x4E2D;&#x4ECB;&#x7ECD;&#x7684;&#x51E0;&#x4E2A;&#x529E;&#x6CD5;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x5728;mounted&#x94A9;&#x5B50;&#x4E2D;&#x7528; <code>addEventListener</code> &#x6DFB;&#x52A0;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x53C2;&#x89C1; <a href="https://codepen.io/SHERlocked93/pen/WKGNKJ" rel="nofollow noreferrer" target="_blank">CodePen</a><button class="btn btn-xs btn-default ml10 preview" data-url="SHERlocked93/pen/WKGNKJ" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>&#x3002;</p><h2 id="articleHeader4">3. &#x4E00;&#x4E2A;&#x4F8B;&#x5B50;</h2><p>&#x8BF4;&#x8FD9;&#x4E48;&#x591A;&#xFF0C;&#x4E0D;&#x5982;&#x6765;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x6267;&#x884C;&#x53C2;&#x89C1; <a href="https://codepen.io/SHERlocked93/pen/PBGaOM" rel="nofollow noreferrer" target="_blank">CodePen</a><button class="btn btn-xs btn-default ml10 preview" data-url="SHERlocked93/pen/PBGaOM" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
  &lt;span id=&apos;name&apos; ref=&apos;name&apos;&gt;"{{" name "}}"&lt;/span&gt;
  &lt;button @click=&apos;change&apos;&gt;change name&lt;/button&gt;
  &lt;div id=&apos;content&apos;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
  new Vue({
    el: &apos;#app&apos;,
    data() {
      return {
        name: &apos;SHERlocked93&apos;
      }
    },
    methods: {
      change() {
        const $name = this.$refs.name
        this.$nextTick(() =&gt; console.log(&apos;setter&#x524D;&#xFF1A;&apos; + $name.innerHTML))
        this.name = &apos; name&#x6539;&#x55BD; &apos;
        console.log(&apos;&#x540C;&#x6B65;&#x65B9;&#x5F0F;&#xFF1A;&apos; + this.$refs.name.innerHTML)
        setTimeout(() =&gt; this.console(&quot;setTimeout&#x65B9;&#x5F0F;&#xFF1A;&quot; + this.$refs.name.innerHTML))
        this.$nextTick(() =&gt; console.log(&apos;setter&#x540E;&#xFF1A;&apos; + $name.innerHTML))
        this.$nextTick().then(() =&gt; console.log(&apos;Promise&#x65B9;&#x5F0F;&#xFF1A;&apos; + $name.innerHTML))
      }
    }
  })
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&apos;name&apos;</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&apos;name&apos;</span>&gt;</span>"{{" name "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&apos;change&apos;</span>&gt;</span>change name<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&apos;content&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;SHERlocked93&apos;</span>
      }
    },
    <span class="hljs-attr">methods</span>: {
      change() {
        <span class="hljs-keyword">const</span> $name = <span class="hljs-keyword">this</span>.$refs.name
        <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;setter&#x524D;&#xFF1A;&apos;</span> + $name.innerHTML))
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos; name&#x6539;&#x55BD; &apos;</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x540C;&#x6B65;&#x65B9;&#x5F0F;&#xFF1A;&apos;</span> + <span class="hljs-keyword">this</span>.$refs.name.innerHTML)
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.console(<span class="hljs-string">&quot;setTimeout&#x65B9;&#x5F0F;&#xFF1A;&quot;</span> + <span class="hljs-keyword">this</span>.$refs.name.innerHTML))
        <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;setter&#x540E;&#xFF1A;&apos;</span> + $name.innerHTML))
        <span class="hljs-keyword">this</span>.$nextTick().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Promise&#x65B9;&#x5F0F;&#xFF1A;&apos;</span> + $name.innerHTML))
      }
    }
  })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x6267;&#x884C;&#x4EE5;&#x4E0B;&#x770B;&#x770B;&#x7ED3;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x540C;&#x6B65;&#x65B9;&#x5F0F;&#xFF1A;SHERlocked93 
setter&#x524D;&#xFF1A;SHERlocked93 
setter&#x540E;&#xFF1A;name&#x6539;&#x55BD; 
Promise&#x65B9;&#x5F0F;&#xFF1A;name&#x6539;&#x55BD; 
setTimeout&#x65B9;&#x5F0F;&#xFF1A;name&#x6539;&#x55BD;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&#x540C;&#x6B65;&#x65B9;&#x5F0F;&#xFF1A;SHERlocked93 
setter&#x524D;&#xFF1A;SHERlocked93 
setter&#x540E;&#xFF1A;<span class="hljs-built_in">name</span>&#x6539;&#x55BD; 
Promise&#x65B9;&#x5F0F;&#xFF1A;<span class="hljs-built_in">name</span>&#x6539;&#x55BD; 
setTimeout&#x65B9;&#x5F0F;&#xFF1A;<span class="hljs-built_in">name</span>&#x6539;&#x55BD;</code></pre><p>&#x4E3A;&#x4EC0;&#x4E48;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x7ED3;&#x679C;&#x5462;&#xFF0C;&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#xFF1A;</p><ol><li><strong>&#x540C;&#x6B65;&#x65B9;&#x5F0F;&#xFF1A;</strong> &#x5F53;&#x628A;data&#x4E2D;&#x7684;name&#x4FEE;&#x6539;&#x4E4B;&#x540E;&#xFF0C;&#x6B64;&#x65F6;&#x4F1A;&#x89E6;&#x53D1;name&#x7684; <code>setter</code> &#x4E2D;&#x7684; <code>dep.notify</code> &#x901A;&#x77E5;&#x4F9D;&#x8D56;&#x672C;data&#x7684;render watcher&#x53BB; <code>update</code>&#xFF0C;<code>update</code> &#x4F1A;&#x628A; <code>flushSchedulerQueue</code> &#x51FD;&#x6570;&#x4F20;&#x9012;&#x7ED9; <code>nextTick</code>&#xFF0C;render watcher&#x5728; <code>flushSchedulerQueue</code> &#x51FD;&#x6570;&#x8FD0;&#x884C;&#x65F6; <code>watcher.run</code> &#x518D;&#x8D70; <code>diff -&gt; patch</code> &#x90A3;&#x4E00;&#x5957;&#x91CD;&#x6E32;&#x67D3; <code>re-render</code> &#x89C6;&#x56FE;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F1A;&#x91CD;&#x65B0;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF1B;&#x6240;&#x4EE5;&#x5F53;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x4E86;name&#x4E4B;&#x540E;&#x6253;&#x5370;&#xFF0C;&#x8FD9;&#x65F6;&#x5F02;&#x6B65;&#x7684;&#x6539;&#x52A8;&#x8FD8;&#x6CA1;&#x6709;&#x88AB; <code>patch</code> &#x5230;&#x89C6;&#x56FE;&#x4E0A;&#xFF0C;&#x6240;&#x4EE5;&#x83B7;&#x53D6;&#x89C6;&#x56FE;&#x4E0A;&#x7684;DOM&#x5143;&#x7D20;&#x8FD8;&#x662F;&#x539F;&#x6765;&#x7684;&#x5185;&#x5BB9;&#x3002;</li><li><strong>setter&#x524D;&#xFF1A;</strong> setter&#x524D;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD8;&#x6253;&#x5370;&#x539F;&#x6765;&#x7684;&#x662F;&#x539F;&#x6765;&#x5185;&#x5BB9;&#x5462;&#xFF0C;&#x662F;&#x56E0;&#x4E3A; <code>nextTick</code> &#x5728;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x628A;&#x56DE;&#x8C03;&#x6328;&#x4E2A;push&#x8FDB;callbacks&#x6570;&#x7EC4;&#xFF0C;&#x4E4B;&#x540E;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x662F; <code>for</code> &#x5FAA;&#x73AF;&#x51FA;&#x6765;&#x6328;&#x4E2A;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x662F;&#x7C7B;&#x4F3C;&#x4E8E;&#x961F;&#x5217;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x5148;&#x5165;&#x5148;&#x51FA;&#xFF1B;&#x5728;&#x4FEE;&#x6539;name&#x4E4B;&#x540E;&#xFF0C;&#x89E6;&#x53D1;&#x628A;render watcher&#x586B;&#x5165; <code>schedulerQueue</code> &#x961F;&#x5217;&#x5E76;&#x628A;&#x4ED6;&#x7684;&#x6267;&#x884C;&#x51FD;&#x6570; <code>flushSchedulerQueue</code> &#x4F20;&#x9012;&#x7ED9; <code>nextTick</code> &#xFF0C;&#x6B64;&#x65F6;callbacks&#x961F;&#x5217;&#x4E2D;&#x5DF2;&#x7ECF;&#x6709;&#x4E86; <code>setter&#x524D;&#x51FD;&#x6570;</code> &#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A; <code>cb</code> &#x662F;&#x5728; <code>setter&#x524D;&#x51FD;&#x6570;</code> &#x4E4B;&#x540E;&#x88AB;push&#x8FDB;callbacks&#x961F;&#x5217;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x5148;&#x5165;&#x5148;&#x51FA;&#x7684;&#x6267;&#x884C;callbacks&#x4E2D;&#x56DE;&#x8C03;&#x7684;&#x65F6;&#x5019;&#x5148;&#x6267;&#x884C; <code>setter&#x524D;&#x51FD;&#x6570;</code>&#xFF0C;&#x8FD9;&#x65F6;&#x5E76;&#x672A;&#x6267;&#x884C;render watcher&#x7684; <code>watcher.run</code>&#xFF0C;&#x6240;&#x4EE5;&#x6253;&#x5370;DOM&#x5143;&#x7D20;&#x4ECD;&#x7136;&#x662F;&#x539F;&#x6765;&#x7684;&#x5185;&#x5BB9;&#x3002;</li><li><strong>setter&#x540E;&#xFF1A;</strong> setter&#x540E;&#x8FD9;&#x65F6;&#x5DF2;&#x7ECF;&#x6267;&#x884C;&#x5B8C; <code>flushSchedulerQueue</code>&#xFF0C;&#x8FD9;&#x65F6;render watcher&#x5DF2;&#x7ECF;&#x628A;&#x6539;&#x52A8; <code>patch</code> &#x5230;&#x89C6;&#x56FE;&#x4E0A;&#xFF0C;&#x6240;&#x4EE5;&#x6B64;&#x65F6;&#x83B7;&#x53D6;DOM&#x662F;&#x6539;&#x8FC7;&#x4E4B;&#x540E;&#x7684;&#x5185;&#x5BB9;&#x3002;</li><li><strong>Promise&#x65B9;&#x5F0F;&#xFF1A;</strong> &#x76F8;&#x5F53;&#x4E8E; <code>Promise.then</code> &#x7684;&#x65B9;&#x5F0F;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x6B64;&#x65F6;DOM&#x5DF2;&#x7ECF;&#x66F4;&#x6539;&#x3002;</li><li><strong>setTimeout&#x65B9;&#x5F0F;&#xFF1A;</strong> &#x6700;&#x540E;&#x6267;&#x884C;macro task&#x7684;&#x4EFB;&#x52A1;&#xFF0C;&#x6B64;&#x65F6;DOM&#x5DF2;&#x7ECF;&#x66F4;&#x6539;&#x3002;</li></ol><p>&#x6CE8;&#x610F;&#xFF0C;&#x5728;&#x6267;&#x884C; <code>setter&#x524D;&#x51FD;&#x6570;</code> &#x8FD9;&#x4E2A;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#x4E4B;&#x524D;&#xFF0C;&#x540C;&#x6B65;&#x7684;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#xFF0C;&#x5F02;&#x6B65;&#x7684;&#x4EFB;&#x52A1;&#x90FD;&#x8FD8;&#x672A;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x6709;&#x7684; <code>$nextTick</code> &#x51FD;&#x6570;&#x4E5F;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#xFF0C;&#x6240;&#x6709;&#x56DE;&#x8C03;&#x90FD;&#x88AB;push&#x8FDB;&#x4E86;callbacks&#x961F;&#x5217;&#x4E2D;&#x7B49;&#x5F85;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x5728;<code>setter&#x524D;&#x51FD;&#x6570;</code> &#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6B64;&#x65F6;callbacks&#x961F;&#x5217;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;[<code>setter&#x524D;&#x51FD;&#x6570;</code>&#xFF0C;<code>flushSchedulerQueue</code>&#xFF0C;<code>setter&#x540E;&#x51FD;&#x6570;</code>&#xFF0C;<code>Promise&#x65B9;&#x5F0F;&#x51FD;&#x6570;</code>]&#xFF0C;&#x5B83;&#x662F;&#x4E00;&#x4E2A;micro task&#x961F;&#x5217;&#xFF0C;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x4E4B;&#x540E;&#x6267;&#x884C;macro task <code>setTimeout</code>&#xFF0C;&#x6240;&#x4EE5;&#x6253;&#x5370;&#x51FA;&#x4E0A;&#x9762;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><p>&#x53E6;&#x5916;&#xFF0C;&#x5982;&#x679C;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x5B8F;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x91CC;&#x9762;&#x6709;<code>setImmediate</code>&#x3001;<code>MessageChannel</code>&#x3001;<code>setTimeout/setInterval</code> &#x5404;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x4EFB;&#x52A1;&#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x6309;&#x7167;&#x4E0A;&#x9762;&#x7684;&#x987A;&#x5E8F;&#x6328;&#x4E2A;&#x6309;&#x7167;&#x6DFB;&#x52A0;&#x8FDB;event loop&#x4E2D;&#x7684;&#x987A;&#x5E8F;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x6D4F;&#x89C8;&#x5668;&#x652F;&#x6301;<code>MessageChannel</code>&#xFF0C; <code>nextTick</code> &#x6267;&#x884C;&#x7684;&#x662F; <code>macroTimerFunc</code>&#xFF0C;&#x90A3;&#x4E48;&#x5982;&#x679C; macrotask queue &#x4E2D;&#x540C;&#x65F6;&#x6709; <code>nextTick</code> &#x6DFB;&#x52A0;&#x7684;&#x4EFB;&#x52A1;&#x548C;&#x7528;&#x6237;&#x81EA;&#x5DF1;&#x6DFB;&#x52A0;&#x7684; <code>setTimeout</code> &#x7C7B;&#x578B;&#x7684;&#x4EFB;&#x52A1;&#xFF0C;&#x4F1A;&#x4F18;&#x5148;&#x6267;&#x884C; <code>nextTick</code> &#x4E2D;&#x7684;&#x4EFB;&#x52A1;&#xFF0C;&#x56E0;&#x4E3A;<code>MessageChannel</code> &#x7684;&#x4F18;&#x5148;&#x7EA7;&#x6BD4; <code>setTimeout</code>&#x7684;&#x9AD8;&#xFF0C;<code>setImmediate</code> &#x540C;&#x7406;&#x3002;</p><hr><p><strong>&#x672C;&#x6587;&#x662F;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#xFF0C;&#x968F;&#x540E;&#x4F1A;&#x66F4;&#x65B0;&#x540E;&#x9762;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5171;&#x540C;&#x8FDB;&#x6B65;~</strong></p><blockquote><ol><li><a href="https://segmentfault.com/a/1190000015440980">Vue&#x6E90;&#x7801;&#x9605;&#x8BFB; - &#x6587;&#x4EF6;&#x7ED3;&#x6784;&#x4E0E;&#x8FD0;&#x884C;&#x673A;&#x5236;</a></li><li><a href="https://segmentfault.com/a/1190000015562213" target="_blank">Vue&#x6E90;&#x7801;&#x9605;&#x8BFB; - &#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x539F;&#x7406;</a></li><li><a href="https://segmentfault.com/a/1190000015698196">Vue&#x6E90;&#x7801;&#x9605;&#x8BFB; - &#x6279;&#x91CF;&#x5F02;&#x6B65;&#x66F4;&#x65B0;&#x4E0E;nextTick&#x539F;&#x7406;</a></li></ol></blockquote><p>&#x7F51;&#x4E0A;&#x7684;&#x5E16;&#x5B50;&#x5927;&#x591A;&#x6DF1;&#x6D45;&#x4E0D;&#x4E00;&#xFF0C;&#x751A;&#x81F3;&#x6709;&#x4E9B;&#x524D;&#x540E;&#x77DB;&#x76FE;&#xFF0C;&#x5728;&#x4E0B;&#x7684;&#x6587;&#x7AE0;&#x90FD;&#x662F;&#x5B66;&#x4E60;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x603B;&#x7ED3;&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x73B0;&#x9519;&#x8BEF;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x6307;&#x51FA;~</p><blockquote><p>&#xA0;&#x53C2;&#x8003;&#xFF1A;</p><ol><li><a href="http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/" rel="nofollow noreferrer" target="_blank">Vue2.1.7&#x6E90;&#x7801;&#x5B66;&#x4E60;</a></li><li><a href="https://ustbhuangyi.github.io/vue-analysis" rel="nofollow noreferrer" target="_blank">Vue.js&#xA0;&#x6280;&#x672F;&#x63ED;&#x79D8;</a></li><li><a href="https://juejin.im/book/5a36661851882538e2259c0f/" rel="nofollow noreferrer" target="_blank">&#x5256;&#x6790;&#xA0;Vue.js&#xA0;&#x5185;&#x90E8;&#x8FD0;&#x884C;&#x673A;&#x5236;</a></li><li><a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue.js&#xA0;&#x6587;&#x6863;</a></li><li><a href="https://zhuanlan.zhihu.com/p/37589777" rel="nofollow noreferrer" target="_blank">&#x8BB0;&#x5F55;&#xFF1A;window.MessageChannel&#x90A3;&#x4E9B;&#x4E8B;</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel" rel="nofollow noreferrer" target="_blank">MDN - MessageChannel</a></li><li><a href="https://segmentfault.com/a/1190000012362096#articleHeader6">JS&#x4E0E;Node.js&#x4E2D;&#x7684;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;</a></li><li><a href="https://juejin.im/post/5a1af88f5188254a701ec230" rel="nofollow noreferrer" target="_blank">&#x9EC4;&#x8F76; - Vue.js &#x5347;&#x7EA7;&#x8E29;&#x5751;&#x5C0F;&#x8BB0;</a></li><li><a href="https://juejin.im/post/5ae3f0956fb9a07ac90cf43e" rel="nofollow noreferrer" target="_blank">Vue nextTick &#x673A;&#x5236;</a></li></ol></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue源码阅读 - 批量异步更新与nextTick原理

## 原文链接
[https://segmentfault.com/a/1190000015698196](https://segmentfault.com/a/1190000015698196)


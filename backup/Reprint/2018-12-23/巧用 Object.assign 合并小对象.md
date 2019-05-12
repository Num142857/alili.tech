---
title: '巧用 Object.assign 合并小对象' 
date: 2018-12-23 2:30:07
hidden: true
slug: iozb3q7048h
categories: [reprint]
---

{{< raw >}}

                    
<p>之前遇到过这样一个问题，把下面一段服务器返回的文本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          Server: 192.168.31.92:2181
          zk_outstanding_requests   0
         zk_approximate_data_size   145237
                   zk_max_latency   417
                   zk_avg_latency   0
                       zk_version   3.4.8--1, built on 02/06/2016 03:18 GMT
                   zk_watch_count   22
         zk_num_alive_connections   12
    zk_open_file_descriptor_count   41
                  zk_server_state   follower
                  zk_packets_sent   87679
              zk_packets_received   79118
                   zk_min_latency   0
              zk_ephemerals_count   17
                   zk_znode_count   2193
     zk_max_file_descriptor_count   4096" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code><span class="hljs-symbol">          Server:</span> <span class="hljs-number">192.168</span><span class="hljs-meta">.31</span><span class="hljs-meta">.92</span>:<span class="hljs-number">2181</span>
          zk_outstanding_requests   <span class="hljs-number">0</span>
         zk_approximate_data_size   <span class="hljs-number">145237</span>
                   zk_max_latency   <span class="hljs-number">417</span>
                   zk_avg_latency   <span class="hljs-number">0</span>
                       zk_version   <span class="hljs-number">3.4</span><span class="hljs-meta">.8</span>--<span class="hljs-number">1</span>, built on <span class="hljs-number">02</span>/<span class="hljs-number">06</span>/<span class="hljs-number">2016</span> <span class="hljs-number">03</span>:<span class="hljs-number">18</span> GMT
                   zk_watch_count   <span class="hljs-number">22</span>
         zk_num_alive_connections   <span class="hljs-number">12</span>
    zk_open_file_descriptor_count   <span class="hljs-number">41</span>
                  zk_server_state   follower
                  zk_packets_sent   <span class="hljs-number">87679</span>
              zk_packets_received   <span class="hljs-number">79118</span>
                   zk_min_latency   <span class="hljs-number">0</span>
              zk_ephemerals_count   <span class="hljs-number">17</span>
                   zk_znode_count   <span class="hljs-number">2193</span>
     zk_max_file_descriptor_count   <span class="hljs-number">4096</span></code></pre>
<p>转换为对象的形式。</p>
<p>这是一整段字符串，当然首先要按行分割为多段。设原始字符串为 <code>str</code>，则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let result = str.split('\n');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> result = str.split(<span class="hljs-string">'\n'</span>);</code></pre>
<p>就获得了一个字符串数组。每个字符串头部都有空格，需要去除空格。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = result.map(x => x.trim());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">result = result.map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.trim());</code></pre>
<p><code>key</code> 和 <code>value</code> 是放在同一段字符串里的，需要拆分开</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = result.map(x => x.split(/ {3}| :/)); // 这里取巧了，实际代码还是把第一行拆出来特殊处理比较好" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">result = result.map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.split(<span class="hljs-regexp">/ {3}| :/</span>)); <span class="hljs-comment">// 这里取巧了，实际代码还是把第一行拆出来特殊处理比较好</span></code></pre>
<p>这样就得到了一个类似</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  [ &quot;key1&quot;, &quot;value1&quot; ],
  [ &quot;key2&quot;, &quot;value2&quot; ],
  [ &quot;key3&quot;, &quot;value3&quot; ],
  // ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">[
  [ <span class="hljs-string">"key1"</span>, <span class="hljs-string">"value1"</span> ],
  [ <span class="hljs-string">"key2"</span>, <span class="hljs-string">"value2"</span> ],
  [ <span class="hljs-string">"key3"</span>, <span class="hljs-string">"value3"</span> ],
  // ...
]</code></pre>
<p>的嵌套数组，可以看到，它正好是某对象 <code>Object.entries</code> 的结果。然而 JS 标准并没有提供 <code>Object.entries</code> 的反函数。</p>
<p>手写的话，很容易想到循环遍历赋值，这里有更简单的方法。首先把它转换为对象数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = result.map(([ key, value ]) => ({ [key]: value })); // 注意箭头后面的括号是必须的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">result = result.map(<span class="hljs-function">(<span class="hljs-params">[ key, value ]</span>) =&gt;</span> ({ [key]: value })); <span class="hljs-comment">// 注意箭头后面的括号是必须的</span></code></pre>
<p>得到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  { &quot;key1&quot;: &quot;value1&quot; },
  { &quot;key2&quot;: &quot;value2&quot; },
  { &quot;key3&quot;: &quot;value3&quot; },
  // ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">[
  { <span class="hljs-attr">"key1"</span>: <span class="hljs-string">"value1"</span> },
  { <span class="hljs-attr">"key2"</span>: <span class="hljs-string">"value2"</span> },
  { <span class="hljs-attr">"key3"</span>: <span class="hljs-string">"value3"</span> },
  // ...
]</code></pre>
<p>把他们合并起来。记得怎样用 <code>Array.object.concat</code> 扁平化数组么？技巧类似</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = Object.assign(...result);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">result = <span class="hljs-built_in">Object</span>.assign(...result);</code></pre>
<p>完整代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign(...str.split('\n').map(x => x.trim().split(/ {3}|: /)).map(([ key, value ]) => ({ [key]: value })))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Object</span>.assign(...str.split(<span class="hljs-string">'\n'</span>).map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.trim().split(<span class="hljs-regexp">/ {3}|: /</span>)).map(<span class="hljs-function">(<span class="hljs-params">[ key, value ]</span>) =&gt;</span> ({ [key]: value })))</code></pre>
<p>PS: 我发现越短的文章看的人越多，每周积累一些小技巧也是很好的?</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
巧用 Object.assign 合并小对象

## 原文链接
[https://segmentfault.com/a/1190000012264295](https://segmentfault.com/a/1190000012264295)


---
title: '[微信音频播放器] html5 audio 制作的微信播放器' 
date: 2019-02-06 2:30:09
hidden: true
slug: qie6pkitf7p
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">weixinAudio.js</h2>
<h4>一个简单的微信样式播放器</h4>
<p>播放器DOM及CSS是微信里内置的音频播放器的样式，重新创建了控制层js，方便在在公众号，APP等场景使用。</p>
<h3 id="articleHeader1">例子</h3>
<p><a href="http://warpcgd.github.io/webchataudio/src/demo.html" rel="nofollow noreferrer" target="_blank">demo</a></p>
<h3 id="articleHeader2">地址</h3>
<p><a href="https://github.com/warpcgd/webchataudio" rel="nofollow noreferrer" target="_blank">github</a></p>
<h3 id="articleHeader3">如何使用</h3>
<p>通过以下demo来实现</p>
<h3 id="articleHeader4">HTML模板</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p class=&quot;weixinAudo&quot;>
    <audio src=&quot;../sound/sound.mp3&quot; id=&quot;media&quot; width=&quot;1&quot; height=&quot;1&quot; preload></audio>
    <span id=&quot;audio_area&quot; class=&quot;db audio_area&quot;>
        <span class=&quot;audio_wrp db&quot;>
            <span class=&quot;audio_play_area&quot;>
                <i class=&quot;icon_audio_default&quot;></i>
                <i class=&quot;icon_audio_playing&quot;></i>
            </span>
            <span id=&quot;audio_length&quot; class=&quot;audio_length tips_global&quot;>3:07</span>
            <span class=&quot;db audio_info_area&quot;>
                <strong class=&quot;db audio_title&quot;>标题</strong>
                <span class=&quot;audio_source tips_global&quot;>来源</span>
            </span>
            <span id=&quot;audio_progress&quot; class=&quot;progress_bar&quot; style=&quot;width: 0%;&quot;></span>
         </span>
    </span>
</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weixinAudo"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../sound/sound.mp3"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"media"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">preload</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">audio</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"audio_area"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"db audio_area"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"audio_wrp db"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"audio_play_area"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon_audio_default"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon_audio_playing"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"audio_length"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"audio_length tips_global"</span>&gt;</span>3:07<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"db audio_info_area"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">strong</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"db audio_title"</span>&gt;</span>标题<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"audio_source tips_global"</span>&gt;</span>来源<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"audio_progress"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"progress_bar"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 0%;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
         <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<h3 id="articleHeader5">Js调用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//你需要先引入一个jQuery
<script src=&quot;http://libs.baidu.com/jquery/2.0.0/jquery.min.js&quot;></script>
<script src=&quot;js/weixinAudip.js&quot;></script>
<script>
   $('.weixinAudo').weixinAudio(options);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">//你需要先引入一个jQuery
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://libs.baidu.com/jquery/2.0.0/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/weixinAudip.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
   $(<span class="hljs-string">'.weixinAudo'</span>).weixinAudio(options);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader6">options/初始化参数</h3>
<table width="100%">
<thead><tr>
<th width="20%">Option</th>
    <th width="20%">Type</th>
    <th width="20%">Default</th>
    <th width="40%">Description</th>
  </tr></thead>
<tbody>
<tr>
<td><code>autoplay</code></td>
    <td>Boolean</td>
    <td>false</td>
    <td>播放器是否在初始化时自动播放</td>
  </tr>
<tr>
<td><code>src</code></td>
    <td>String</td>
    <td>—</td>
    <td>如果audio标签上没设定src属性，可在初始化时设置</td>
  </tr>
</tbody>
</table>
<h3 id="articleHeader7">API/执行方法</h3>
<table width="100%" align="center">
<thead><tr>
<th width="12.5%">Method</th>
    <th width="12.5%">Parameters</th>
    <th width="75%">Description</th>
  </tr></thead>
<tbody>
<tr>
<td><code>play()</code></td>
    <td>—</td>
    <td>播放方法</td>
  </tr>
<tr>
<td><code>pause()</code></td>
    <td>—</td>
    <td>暂停方法</td>
  </tr>
<tr>
<td><code>changsrc()</code></td>
    <td><code>src,callback</code></td>
    <td>
<code>src</code>:播放的地址;<code>callback</code>:回调函数</td>
  </tr>
</tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[微信音频播放器] html5 audio 制作的微信播放器

## 原文链接
[https://segmentfault.com/a/1190000006121846](https://segmentfault.com/a/1190000006121846)


---
title: 'angular4 上传本地图片，将拿到的files转化为url地址，提示sanitizing unsafe URL value' 
date: 2018-12-22 2:30:10
hidden: true
slug: p5cuvws574o
categories: [reprint]
---

{{< raw >}}

                    
<p>  最近用angular4做项目，上传图片时在onchange里面拿到files文件，将files文件转化为url地址显示的时候，发现console里面报错，同时angular4提示WARNING: sanitizing unsafe URL value，最后在谷歌找到解决办法。下面附上我的代码截图。</p>
<p>  html中使用input标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input #file2 type=&quot;file&quot; id=&quot;logo&quot; value=&quot;&quot; name=&quot;file&quot; accept=&quot;image/*&quot; multiple [disabled]=&quot;isInput&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> #<span class="hljs-attr">file2</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"logo"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/*"</span> <span class="hljs-attr">multiple</span> [<span class="hljs-attr">disabled</span>]=<span class="hljs-string">"isInput"</span> /&gt;</span></code></pre>
<p>  在onchange里面拿到files文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取图片文件
let files = this.files;
// 转化为url
let imgurl = window.URL.createObjectURL(files[0]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取图片文件</span>
<span class="hljs-keyword">let</span> files = <span class="hljs-keyword">this</span>.files;
<span class="hljs-comment">// 转化为url</span>
<span class="hljs-keyword">let</span> imgurl = <span class="hljs-built_in">window</span>.URL.createObjectURL(files[<span class="hljs-number">0</span>]);</code></pre>
<p>  这时按照我以前用angular1的做法直接把这个地址绑定到img标签上就可以预览本地上传的图片，但是，angular4却报了WARNING: sanitizing unsafe URL value，还好找到了解决办法。</p>
<p>1：在组件里面引入angular内置的StampComponent模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {StampComponent} from &quot;../base/stamp/stamp.component&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {StampComponent} <span class="hljs-keyword">from</span> <span class="hljs-string">"../base/stamp/stamp.component"</span>;</code></pre>
<p>2：我喜欢在构造器里面定义属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(private sanitizer:DomSanitizer) { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">constructor</span>(private sanitizer:DomSanitizer) { }</code></pre>
<p>3：将地址转化为安全地址</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let sanitizerUrl = self.sanitizer.bypassSecurityTrustUrl(imgurl);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> sanitizerUrl = self.sanitizer.bypassSecurityTrustUrl(imgurl);</code></pre>
<p>  最后就可以把地址放入img的src上面了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
angular4 上传本地图片，将拿到的files转化为url地址，提示sanitizing unsafe URL value

## 原文链接
[https://segmentfault.com/a/1190000012427603](https://segmentfault.com/a/1190000012427603)


---
title: '解决input[type=file]打开时慢、卡顿问题' 
date: 2019-01-06 2:30:10
hidden: true
slug: ezg0zqbfpmc
categories: [reprint]
---

{{< raw >}}

                    
<p>昨天临下班测试给我问我为什么图片上传插件打开文件夹的速度这么慢，让我想办法优化一下<br>然后我就努力的搞了起来_(:з」∠)_</p>
<p>由于我们内部系统不兼容ie，所以我就没有管ie，在浏览器里面玩了起来</p>
<p>经过测试发现，在mac里面safari、Firefox、Chrome(opera不知道为啥老闪退)都没有卡顿问题</p>
<p>在windows里面，Firefox不卡顿，只有Chrome卡顿。</p>
<p>然而，这个插件是从另一个项目里面借用过来，再加上了限定图片类型的功能而已。<br>原组件并没有这个卡顿问题，那么问题只可能是在限定图片类型这点上了。</p>
<p>先贴上我的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input
    accpet=&quot;image/*&quot;
    style={inputStyle}
    ref={c=> this._imgFile = c}
    onChange={this.handleChange.bind(this)}
    type=&quot;file&quot; name=&quot;image&quot; disabled={disabled}
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;input
    accpet=<span class="hljs-string">"image/*"</span>
    style={inputStyle}
    ref={c=&gt; <span class="hljs-keyword">this</span>._imgFile = c}
    onChange={<span class="hljs-keyword">this</span>.handleChange.bind(<span class="hljs-keyword">this</span>)}
    type=<span class="hljs-string">"file"</span> name=<span class="hljs-string">"image"</span> disabled={disabled}
/&gt;</code></pre>
<p>于是我决定先去掉<code>accpet</code>试试……<br>果然就没有了卡顿的问题。<br>那么本包在试试<code>accpet="image/jpg"</code>果然也不卡卡的了！！<br>看来问题的所在就是<code>"image/*"</code></p>
<p>但是写<code>accpet</code>的原意是要想要筛选出所有图片_(:з」∠)_<br>那么为了实现这个需求，同时提高用户体验，只能采取枚举了</p>
<p>修改后的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input
    style={inputStyle}
    ref={c=> this._imgFile = c}
    onChange={this.handleChange.bind(this)}
    type=&quot;file&quot; name=&quot;image&quot; disabled={disabled}
    accpet=&quot;image/gif,image/png,image/jpeg,image/jpg,image/bmp&quot;
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;input
    style={inputStyle}
    ref={c=&gt; <span class="hljs-keyword">this</span>._imgFile = c}
    onChange={<span class="hljs-keyword">this</span>.handleChange.bind(<span class="hljs-keyword">this</span>)}
    type=<span class="hljs-string">"file"</span> name=<span class="hljs-string">"image"</span> disabled={disabled}
    accpet=<span class="hljs-string">"image/gif,image/png,image/jpeg,image/jpg,image/bmp"</span>
/&gt;</code></pre>
<p>再试试，果然妥妥的了！</p>
<p>但是到底是为什么会这么卡呢？？我查了查万能的Stack Overflow→_→</p>
<p>原来是因为Chrome的<a href="http://safebrowsing.google.com/" rel="nofollow noreferrer" target="_blank">SafeBrowsing</a>功能会在上传或保存时检查文件，<br>如果网络连接到google的速度比较快呢，就没有什么问题。<br>但是如果连接比较慢，或者干脆跪掉了，那SafeBrowsing就会让Chrome挂起一段时间，直到文件检查结束或者超时</p>
<p>使用<code>accept="image/png, image/jpeg, image/gif"</code>就可以解决这个问题，因为这些MIME类型在SafeBrowsing的白名单里面，不需要检查。<br>但是如果用像是<code>accept="image/*"</code>这样的呢，就不行了，就有可能变得卡卡的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决input[type=file]打开时慢、卡顿问题

## 原文链接
[https://segmentfault.com/a/1190000010397414](https://segmentfault.com/a/1190000010397414)


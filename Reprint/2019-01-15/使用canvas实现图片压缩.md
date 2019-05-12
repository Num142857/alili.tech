---
title: '使用canvas实现图片压缩' 
date: 2019-01-15 2:30:12
hidden: true
slug: xu7b71hriwd
categories: [reprint]
---

{{< raw >}}

                    
<p>那，首先通过<code>URL.createObjectURL(file)</code>从file对象直接取得了图片的地址</p>
<p>前面就不详细说了，开始压缩咯 ( ´ ▽ ` )ﾉ</p>
<p>噢，有个注意点:</p>
<p>每次调用<code>createObjectURL</code>的时候，一个新的URL对象就被创建了，即使是同一个file对象，也会创建一个新对URL对象，所以，为了最佳性能和内存使用，当不再需要这个对象的时候要<code>URL.revokeObjectURL()</code>释放它。</p>
<p>开始压缩</p>
<p>创建一个compressImage函数，将之图片的地址url作参数传入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compressImage (url) {
  let cvs = document.createElement('canvas')
  let ctx = cvs.getContext('2d')
  let img = new window.Image()
  img.src = url
  img.onload = () => {
    cvs.width = img.width
    cvs.height = img.height
    setTimeout(() => {
      ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
      this.newImageData = cvs.toDataURL('image/jpeg', 0.1)
    }, 0)
    this.showPreviewer = true
  }
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>compressImage (url) {
  let cvs = document.createElement(<span class="hljs-string">'canvas'</span>)
  let ctx = cvs.getContext(<span class="hljs-string">'2d'</span>)
  let <span class="hljs-selector-tag">img</span> = new window.Image()
  <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.src</span> = url
  <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.onload</span> = () =&gt; {
    cvs<span class="hljs-selector-class">.width</span> = <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.width</span>
    cvs<span class="hljs-selector-class">.height</span> = <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.height</span>
    setTimeout(() =&gt; {
      ctx.drawImage(<span class="hljs-selector-tag">img</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, cvs<span class="hljs-selector-class">.width</span>, cvs.<span class="hljs-attribute">height</span>)
      this<span class="hljs-selector-class">.newImageData</span> = cvs.toDataURL(<span class="hljs-string">'image/jpeg'</span>, <span class="hljs-number">0.1</span>)
    }, <span class="hljs-number">0</span>)
    this<span class="hljs-selector-class">.showPreviewer</span> = true
  }
},
</code></pre>
<p>这里说说</p>
<p><code>canvas.toDataURL(type, encoderOptions)</code><br><code>HTMLCanvasElement.toDataURL()</code> 方法接受两个参数，type和encoderOptions</p>
<p>type是可选的，图片格式，默认是 image/png，encoderOptions表示图片质量， 在type为image/jpeg 或 image/webp时可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。</p>
<p><code>toDataURL()</code>返回的是base64字符串，如果要转成2进制</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convertToBinary (dataURI) {
  let byteString = window.atob(dataURI.split(',')[1])
  let ab = new ArrayBuffer(byteString.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  let bb = new window.Blob([ ab ])
  return bb
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>convertToBinary (dataURI) {
  <span class="hljs-keyword">let</span> byteString = <span class="hljs-built_in">window</span>.atob(dataURI.split(<span class="hljs-string">','</span>)[<span class="hljs-number">1</span>])
  <span class="hljs-keyword">let</span> ab = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(byteString.length)
  <span class="hljs-keyword">let</span> ia = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(ab)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  <span class="hljs-keyword">let</span> bb = <span class="hljs-keyword">new</span> <span class="hljs-built_in">window</span>.Blob([ ab ])
  <span class="hljs-keyword">return</span> bb
}
</code></pre>
<p>测试结果：由iphone6所拍摄的图片上传，由平均1.9M左右压缩至170k</p>
<p>*･゜ﾟ･*:.｡..｡.:*･'(*ﾟ▽ﾟ*)'･*:.｡. .｡.:*･゜ﾟ･*</p>
<p>再见</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用canvas实现图片压缩

## 原文链接
[https://segmentfault.com/a/1190000009308553](https://segmentfault.com/a/1190000009308553)


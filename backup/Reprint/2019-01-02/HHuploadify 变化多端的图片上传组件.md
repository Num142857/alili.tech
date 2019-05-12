---
title: 'HHuploadify 变化多端的图片上传组件' 
date: 2019-01-02 2:30:09
hidden: true
slug: tmu9lqa93n9
categories: [reprint]
---

{{< raw >}}

                    
<p>你可以在<a href="https://segmentfault.com/a/1190000004328080">这里</a>读到我第一次发布HHuploadify的内容，那个时候HHuploadify只是作为一个jquery插件发布，但是现在不同了我希望把它独立出来，不依赖jquery，虽然在浏览器的兼容性上不再支持IE8及以下（之前应该也不支持，没测试过），但是因为不依赖jquery所以在可扩展性上就更进了一步。</p>
<p>升级的目标是让它的使用和配置更加简洁。之前必须按jquery的插件的方式去使用，而现在只需要实例化一个类即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;dist/HHuploadify.css&quot;>
<script src=&quot;dist/HHuploadify.js&quot;></script>
<script>
let uploader = new HHuploadify({
  container: '#upload',
  url: 'http://localhost/uploadImage',
})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"dist/HHuploadify.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/HHuploadify.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">let</span> uploader = <span class="hljs-keyword">new</span> HHuploadify({
  <span class="hljs-attr">container</span>: <span class="hljs-string">'#upload'</span>,
  <span class="hljs-attr">url</span>: <span class="hljs-string">'http://localhost/uploadImage'</span>,
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>有没有一种超级简单的感觉。来看看升级后的效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVTZ6N?w=978&amp;h=592" src="https://static.alili.tech/img/bVTZ6N?w=978&amp;h=592" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>最初级的配置，选择图片（多选）后点击上传按钮进行上传</p>
<p><span class="img-wrap"><img data-src="/img/bVTZ7D?w=978&amp;h=592" src="https://static.alili.tech/img/bVTZ7D?w=978&amp;h=592" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>添加一个auto的配置，选择图片（多选）之后自动上传图片</p>
<p><span class="img-wrap"><img data-src="/img/bVTZ78?w=978&amp;h=592" src="https://static.alili.tech/img/bVTZ78?w=978&amp;h=592" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>默认情况下，点击选择图片按钮后，打开的选择器可以一次性选择多张图片。如果是用户头像，那么只能选一张图片，只需要配置一个single选项即可。配置之后，这个实例只能上传一张图片。开始上传之后，选择按钮就会消失。</p>
<p><span class="img-wrap"><img data-src="/img/bVTZ9t?w=978&amp;h=565" src="https://static.alili.tech/img/bVTZ9t?w=978&amp;h=565" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>上传成功之后，用server端返回的url字段中的url作为新的预览图片。在一些需要裁剪的情况下可能会用到，只需要把showPreview设置为2即可。</p>
<p><span class="img-wrap"><img data-src="/img/bVTZ9z?w=978&amp;h=565" src="https://static.alili.tech/img/bVTZ9z?w=978&amp;h=565" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>通过showUploadProcess的配置，采用不同的上传进度展示效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVTZ9P?w=978&amp;h=565" src="https://static.alili.tech/img/bVTZ9P?w=978&amp;h=565" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>假如你想默认就有几张图片，也是可以的，使用reset方法即可。</p>
<p><span class="img-wrap"><img data-src="/img/bVT0ap?w=978&amp;h=565" src="https://static.alili.tech/img/bVT0ap?w=978&amp;h=565" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>对HHuplodify进行扩展也超级简单，上图演示的就是利用jquery.dragsort插件扩展HHuploadify，对上传之后的图片列表可以拖拽的效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVT0aC?w=978&amp;h=565" src="https://static.alili.tech/img/bVT0aC?w=978&amp;h=565" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>利用single选项，进行简单扩展之后，就可以实现一组固定的上传。</p>
<p><span class="img-wrap"><img data-src="/img/bVT0bo?w=978&amp;h=565" src="https://static.alili.tech/img/bVT0bo?w=978&amp;h=565" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>通过钩子函数，对上传的最大张数进行控制。上面图片演示中，最多只能上传4张图片。</p>
<p>通过这些演示，有没有觉得想要实现自己的上传效果很方便呢？通过<a href="https://github.com/tangshuang/HHuploadify" rel="nofollow noreferrer" target="_blank">github</a>了解怎么安装和使用吧。</p>
<p>如果你觉得组件还不错，打个赏呀~<br><span class="img-wrap"><img data-src="/img/bVT0b3?w=150&amp;h=150" src="https://static.alili.tech/img/bVT0b3?w=150&amp;h=150" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HHuploadify 变化多端的图片上传组件

## 原文链接
[https://segmentfault.com/a/1190000010924778](https://segmentfault.com/a/1190000010924778)


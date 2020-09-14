---
title: '开源自己写的图片转Ascii码图工具' 
date: 2019-01-09 2:30:12
hidden: true
slug: 518e3202r6v
categories: [reprint]
---

{{< raw >}}

                    
<p>GitHub地址：<a href="https://github.com/qiangzi7723/img2Ascii" rel="nofollow noreferrer" target="_blank">https://github.com/qiangzi772...</a></p>
<p>如果觉得不错可以给个<code>star</code>或者提出你的建议</p>
<hr>
<p>img2Ascii，基于JS的图片转ASCII示意图。</p>
<h3 id="articleHeader0">效果</h3>
<p>转码前图片</p>
<p><span class="img-wrap"><img data-src="/img/bVQCGP?w=886&amp;h=1012" src="https://static.alili.tech/img/bVQCGP?w=886&amp;h=1012" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>转码后图片</p>
<p><span class="img-wrap"><img data-src="/img/bVQCGW?w=1440&amp;h=1596" src="https://static.alili.tech/img/bVQCGW?w=1440&amp;h=1596" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">构建</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install 或者 yarn install
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> 或者 yarn <span class="hljs-keyword">install</span>
</code></pre>
<p>之后通过</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span></code></pre>
<p>即可打开项目</p>
<h3 id="articleHeader2">使用</h3>
<p>以下代码在<code>main.js</code>中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Img2Ascii=require('./index');
const img=require('./assets/av.png');

new Img2Ascii(img,(nSrc,img)=>{
    const nImg = new Image();
    nImg.src = nSrc;
    nImg.style.width = img.width + 'px';
    nImg.style.height = img.height + 'px';
    nImg.onload = () => {
        document.body.appendChild(nImg);
        document.getElementById('tip').style.display='none';
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> Img2Ascii=<span class="hljs-built_in">require</span>(<span class="hljs-string">'./index'</span>);
<span class="hljs-keyword">const</span> img=<span class="hljs-built_in">require</span>(<span class="hljs-string">'./assets/av.png'</span>);

<span class="hljs-keyword">new</span> Img2Ascii(img,<span class="hljs-function">(<span class="hljs-params">nSrc,img</span>)=&gt;</span>{
    <span class="hljs-keyword">const</span> nImg = <span class="hljs-keyword">new</span> Image();
    nImg.src = nSrc;
    nImg.style.width = img.width + <span class="hljs-string">'px'</span>;
    nImg.style.height = img.height + <span class="hljs-string">'px'</span>;
    nImg.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">document</span>.body.appendChild(nImg);
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'tip'</span>).style.display=<span class="hljs-string">'none'</span>;
    }
});
</code></pre>
<p>Img2Ascii方法需要传入两个参数，第一个参数是图片路径，第二个参数是图片转换完毕后的回调函数，需要自己在回调函数中注入新生成的图片节点，否则看不到效果。</p>
<h3 id="articleHeader3">实现思路</h3>
<p>把图片在<code>canvas</code>中绘制后，利用<code>getImageData</code>接口获取图片的<code>rgba</code>，计算<code>rgba</code>值转换为对应的<code>ASCII</code>码，在适当的位置进行换行，然后整体转换便完成。</p>
<h3 id="articleHeader4">瓶颈</h3>
<p>目前项目的瓶颈存在于<code>html2canvas</code>这个插件，把图片转成ASCII码在浏览器中输出是十分快速的，但是后期将输出的ASCII码转换成图片时，使用了<code>html2canvas</code>插件，这个插件在转换图片的过程中十分缓慢，导致最后的输出缓慢。接下来会把<code>html2canvas</code>这个插件换成使用别的插件实现，忘广大网友提供一些转图片的插件。</p>
<hr>
<p>除此之外我还写有<code>draggable</code>拖拽库以及<code>ant-template</code>模板引擎，如果觉得不错可以给个<code>star</code>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
开源自己写的图片转Ascii码图工具

## 原文链接
[https://segmentfault.com/a/1190000010119453](https://segmentfault.com/a/1190000010119453)


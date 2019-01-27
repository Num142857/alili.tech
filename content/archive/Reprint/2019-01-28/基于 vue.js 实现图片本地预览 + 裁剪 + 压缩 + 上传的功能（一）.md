---
title: '基于 vue.js 实现图片本地预览 + 裁剪 + 压缩 + 上传的功能（一）' 
date: 2019-01-28 2:30:09
hidden: true
slug: s0n8x1hd1l
categories: [reprint]
---

{{< raw >}}

                    
<p>以下代码涉及 Vue 2.0 及 ES6 语法。</p>
<h2 id="articleHeader0">目标</h2>
<p>纯 javascrpit 实现，兼容ie9及以上浏览器，在本地做好文件格式、长宽、大小的检测，减少浏览器交互。</p>
<blockquote><p>现实是残酷的，为了兼容Ie9 还是用上了 flash，第二篇来解释解释。</p></blockquote>
<h2 id="articleHeader1">代码结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;wrap&quot;>
    <label>
        点我上传图片
        <input type='file' @change=&quot;change&quot; ref=&quot;input&quot;>
    </label>
    <img :src=&quot;src&quot; ref=&quot;img&quot;>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
        点我上传图片
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'file'</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"change"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"input"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"src"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"img"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#wrap',
    data: {
        // 一张透明的图片
        src:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 
        elInput: null
    },
    methods: {
        change(e){
            // ...
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#wrap'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-comment">// 一张透明的图片</span>
        src:<span class="hljs-string">'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'</span>, 
        <span class="hljs-attr">elInput</span>: <span class="hljs-literal">null</span>
    },
    <span class="hljs-attr">methods</span>: {
        change(e){
            <span class="hljs-comment">// ...</span>
        }
    }
})</code></pre>
<h2 id="articleHeader2">如何获取图片大小</h2>
<p>现代浏览器中十分简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getSize(e){
    return e.target.files[0].size;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSize</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-keyword">return</span> e.target.files[<span class="hljs-number">0</span>].size;
}</code></pre>
<blockquote><p>但 ie9 下暂时没有找到纯 JS 的方案。<br>因此，在需要判断大小时，遇到 ie9 直接绕过不去判断</p></blockquote>
<h2 id="articleHeader3">如何预览本地图片</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const refs = this.$refs
const elInput = refs.input
const elImg = refs.img" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> refs = <span class="hljs-keyword">this</span>.$refs
<span class="hljs-keyword">const</span> elInput = refs.input
<span class="hljs-keyword">const</span> elImg = refs.img</code></pre>
<p>现代浏览器中，通过调用 FileReader 读取本地图片，将图片地址转成 Base64 格式实现预览。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getSrc(){
    const reader = new FileReader();
    reader.onload = (e) => {
        const src = e.target.result;
        elImg.src = src;
    };
    if (elInput.files &amp;&amp; elInput.files[0]) {
        reader.readAsDataURL(elInput.files[0]);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSrc</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">const</span> reader = <span class="hljs-keyword">new</span> FileReader();
    reader.onload = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> src = e.target.result;
        elImg.src = src;
    };
    <span class="hljs-keyword">if</span> (elInput.files &amp;&amp; elInput.files[<span class="hljs-number">0</span>]) {
        reader.readAsDataURL(elInput.files[<span class="hljs-number">0</span>]);
    }
}</code></pre>
<p>但是问题又来了，ie9 并不支持 FileReader，但可以通过 ie 滤镜显示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getSrc(){
    elInput.select();
    elInput.blur();
    const src = document.selection.createRange().text;
    document.selection.empty();
    elImg.style.filter = `progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='${src}')`;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSrc</span>(<span class="hljs-params"></span>)</span>{
    elInput.select();
    elInput.blur();
    <span class="hljs-keyword">const</span> src = <span class="hljs-built_in">document</span>.selection.createRange().text;
    <span class="hljs-built_in">document</span>.selection.empty();
    elImg.style.filter = <span class="hljs-string">`progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='<span class="hljs-subst">${src}</span>')`</span>;
}</code></pre>
<p>滤镜中 <code>sizingMethod='scale'</code> 的写法是为了图片能适应内容缩放。</p>
<p>由于 IE9 对安全限制有所增强，实践中会遇到以下两个问题：</p>
<ul>
<li><p>如果 file 控件获得焦点，则 <code>document.selection.createRange()</code> 拒绝访问，因此需要在 <code>elInput.select()</code> 后面加一句 <code>elInput.blur()</code> 即可。</p></li>
<li><p>为了让上传按钮更美观，默认给 input[type=file] 的设置了样式 <code>visible:hidden</code> ，这样会导致 ie9 下报错。应该会被浏览器认为欺骗用户点击，只好曲线救国。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="label{
    overflow:hidden;
}

label input[type='file']{
    position:absolute;
    top:9999px;
    left:9999px;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">label</span>{
    <span class="hljs-attribute">overflow</span>:hidden;
}

<span class="hljs-selector-tag">label</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='file']</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">9999px</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">9999px</span>;
}
</code></pre>
<h2 id="articleHeader4">如何获取图片长宽</h2>
<p>同理，利用 ie 滤镜和 FileReader 的方案对 ie9 和非 ie9 分别实现。</p>
<h3 id="articleHeader5">ie9 的方案</h3>
<p>参数 <code>src</code> 接受的是本地图片路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let tempEl;
const getSizeIncompatible = (src, callback) => {
    if (!tempEl) {
        tempEl = document.createElement('div');
        tempEl.style.position = 'absolute';
        tempEl.style.width = '1px';
        tempEl.style.height = '1px';
        tempEl.style.left = '-9999px';
        tempEl.style.top = '-9999px';
        tempEl.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)';
        document.body.insertBefore(tempEl, document.body.firstChild);
    }
    tempEl.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;

    callback(tempEl.offsetWidth, tempEl.offsetHeight);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> tempEl;
<span class="hljs-keyword">const</span> getSizeIncompatible = <span class="hljs-function">(<span class="hljs-params">src, callback</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!tempEl) {
        tempEl = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
        tempEl.style.position = <span class="hljs-string">'absolute'</span>;
        tempEl.style.width = <span class="hljs-string">'1px'</span>;
        tempEl.style.height = <span class="hljs-string">'1px'</span>;
        tempEl.style.left = <span class="hljs-string">'-9999px'</span>;
        tempEl.style.top = <span class="hljs-string">'-9999px'</span>;
        tempEl.style.filter = <span class="hljs-string">'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)'</span>;
        <span class="hljs-built_in">document</span>.body.insertBefore(tempEl, <span class="hljs-built_in">document</span>.body.firstChild);
    }
    tempEl.filters.item(<span class="hljs-string">'DXImageTransform.Microsoft.AlphaImageLoader'</span>).src = src;

    callback(tempEl.offsetWidth, tempEl.offsetHeight);
};</code></pre>
<p>其中 <code>sizingMethod='image'</code> 是为了图片显示原始大小。</p>
<h3 id="articleHeader6">非 ie9 方案</h3>
<p>参数 <code>src</code> 接受的是 base64 编码后的图片路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getSize = (src, callback) => {
    const image = new Image();
    image.onload = () => {
        callback(image.width, image.height);
    };
    image.src = src;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getSize = <span class="hljs-function">(<span class="hljs-params">src, callback</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> image = <span class="hljs-keyword">new</span> Image();
    image.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        callback(image.width, image.height);
    };
    image.src = src;
};</code></pre>
<h2 id="articleHeader7">参考</h2>
<ul><li><p><a href="https://elemefe.github.io/image-cropper/" rel="nofollow noreferrer" target="_blank">https://elemefe.github.io/ima...</a></p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 vue.js 实现图片本地预览 + 裁剪 + 压缩 + 上传的功能（一）

## 原文链接
[https://segmentfault.com/a/1190000008019773](https://segmentfault.com/a/1190000008019773)


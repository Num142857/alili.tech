---
title: '前端js压缩图片并上传' 
date: 2018-12-25 2:30:11
hidden: true
slug: 1zj70htq813
categories: [reprint]
---

{{< raw >}}

                    
<p>公司最近有需要压缩上传图片功能，查找了些资料并实现了一把。</p>
<p>主要用到的原生组件：FileReader、Canvas、Blob、FormData</p>
<p>逻辑步骤：</p>
<ol>
<li>FileReader.readAsDataURL将上传的图片文件转为Base64格式</li>
<li>将img绘制到canvas上，canvas.toDataURL压缩图片</li>
<li>new Blob将压缩后的Base64转为Blob格式</li>
<li>FormData.append将图片文件数据存入formdata</li>
</ol>
<p>Code:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.compressImage(files[0], (file)=>{
    console.log(file);
    const formData = new FormData();
    formData.append('file', file, file.name || '上传图片.jpeg');
}, $.noop);
//压缩图片
compressImage = (file, success, error) => {
    // 图片小于1M不压缩
    if (file.size < Math.pow(1024, 2)) {
        return success(file);
    }

    const name = file.name; //文件名
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        const src = e.target.result;
        
        const img = new Image();
        img.src = src;
        img.onload = (e) => {
            const w = img.width;
            const h = img.height;
            const quality = 0.8;  // 默认图片质量为0.92
            //生成canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // 创建属性节点
            const anw = document.createAttribute(&quot;width&quot;);
            anw.nodeValue = w;
            const anh = document.createAttribute(&quot;height&quot;);
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);

            //铺底色 PNG转JPEG时透明区域会变黑色
            ctx.fillStyle = &quot;#fff&quot;;
            ctx.fillRect(0, 0, w, h);

            ctx.drawImage(img, 0, 0, w, h);
            // quality值越小，所绘制出的图像越模糊
            const base64 = canvas.toDataURL('image/jpeg', quality); //图片格式jpeg或webp可以选0-1质量区间

            // 返回base64转blob的值
            console.log(`原图${(src.length/1024).toFixed(2)}kb`, `新图${(base64.length/1024).toFixed(2)}kb`);
            //去掉url的头，并转换为byte
            const bytes = window.atob(base64.split(',')[1]);
            //处理异常,将ascii码小于0的转换为大于0
            const ab = new ArrayBuffer(bytes.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            file = new Blob( [ab] , {type : 'image/jpeg'});
            file.name = name;

            success(file);
        }
        img.onerror = (e) => {
            error(e);
        }
    }
    reader.onerror = (e) => {
        error(e);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">this</span>.compressImage(files[<span class="hljs-number">0</span>], <span class="hljs-function">(<span class="hljs-params">file</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(file);
    <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> FormData();
    formData.append(<span class="hljs-string">'file'</span>, file, file.name || <span class="hljs-string">'上传图片.jpeg'</span>);
}, $.noop);
<span class="hljs-comment">//压缩图片</span>
compressImage = <span class="hljs-function">(<span class="hljs-params">file, success, error</span>) =&gt;</span> {
    <span class="hljs-comment">// 图片小于1M不压缩</span>
    <span class="hljs-keyword">if</span> (file.size &lt; <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">1024</span>, <span class="hljs-number">2</span>)) {
        <span class="hljs-keyword">return</span> success(file);
    }

    <span class="hljs-keyword">const</span> name = file.name; <span class="hljs-comment">//文件名</span>
    <span class="hljs-keyword">const</span> reader = <span class="hljs-keyword">new</span> FileReader();
    reader.readAsDataURL(file);
    reader.onload = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> src = e.target.result;
        
        <span class="hljs-keyword">const</span> img = <span class="hljs-keyword">new</span> Image();
        img.src = src;
        img.onload = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
            <span class="hljs-keyword">const</span> w = img.width;
            <span class="hljs-keyword">const</span> h = img.height;
            <span class="hljs-keyword">const</span> quality = <span class="hljs-number">0.8</span>;  <span class="hljs-comment">// 默认图片质量为0.92</span>
            <span class="hljs-comment">//生成canvas</span>
            <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>);
            <span class="hljs-keyword">const</span> ctx = canvas.getContext(<span class="hljs-string">'2d'</span>);
            <span class="hljs-comment">// 创建属性节点</span>
            <span class="hljs-keyword">const</span> anw = <span class="hljs-built_in">document</span>.createAttribute(<span class="hljs-string">"width"</span>);
            anw.nodeValue = w;
            <span class="hljs-keyword">const</span> anh = <span class="hljs-built_in">document</span>.createAttribute(<span class="hljs-string">"height"</span>);
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);

            <span class="hljs-comment">//铺底色 PNG转JPEG时透明区域会变黑色</span>
            ctx.fillStyle = <span class="hljs-string">"#fff"</span>;
            ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, w, h);

            ctx.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, w, h);
            <span class="hljs-comment">// quality值越小，所绘制出的图像越模糊</span>
            <span class="hljs-keyword">const</span> base64 = canvas.toDataURL(<span class="hljs-string">'image/jpeg'</span>, quality); <span class="hljs-comment">//图片格式jpeg或webp可以选0-1质量区间</span>

            <span class="hljs-comment">// 返回base64转blob的值</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`原图<span class="hljs-subst">${(src.length/1024).toFixed(2)}</span>kb`</span>, <span class="hljs-string">`新图<span class="hljs-subst">${(base64.length/1024).toFixed(2)}</span>kb`</span>);
            <span class="hljs-comment">//去掉url的头，并转换为byte</span>
            <span class="hljs-keyword">const</span> bytes = <span class="hljs-built_in">window</span>.atob(base64.split(<span class="hljs-string">','</span>)[<span class="hljs-number">1</span>]);
            <span class="hljs-comment">//处理异常,将ascii码小于0的转换为大于0</span>
            <span class="hljs-keyword">const</span> ab = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(bytes.length);
            <span class="hljs-keyword">const</span> ia = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(ab);
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            file = <span class="hljs-keyword">new</span> Blob( [ab] , {<span class="hljs-keyword">type</span> : <span class="hljs-string">'image/jpeg'</span>});
            file.name = name;

            success(file);
        }
        img.onerror = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
            error(e);
        }
    }
    reader.onerror = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
        error(e);
    }
}
</code></pre>
<p>遇到的一些坑：</p>
<ol>
<li>PNG转JPEG时PNG格式的透明区域会变黑色，需要先手动铺底色</li>
<li>toDataURL参数为PNG时不支持传图片质量，所以需要写死image/jpeg或image/webp，具体可以参考toDataURL的api</li>
<li>formData.append第三个参数filename是有浏览器兼容性问题的，如果不传就是filename=blob，后端校验文件名可能过不去</li>
<li>ajax的contentType和processData需要传false，这和本文关系不大直接带过</li>
<li>网上说的ios中canvas绘制图片大小限制我在iphone6上测试没遇到，可能和机型或系统有关系，如果有可以在下面留言</li>
</ol>
<p>结语，压缩功能比较适合移动端，毕竟PC端带宽比较好而且不能兼容IE老版本。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端js压缩图片并上传

## 原文链接
[https://segmentfault.com/a/1190000012037041](https://segmentfault.com/a/1190000012037041)


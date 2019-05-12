---
title: 'Element el-upload上传组件详解' 
date: 2018-12-10 2:30:07
hidden: true
slug: nuzlwwjjtom
categories: [reprint]
---

{{< raw >}}

                    
<p>upload上传是前端开发很常用的一个功能，在Vue开发中常用的Element组件库也提供了非常好用的upload组件。</p>
<h3 id="articleHeader0">基本用法</h3>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-upload :action=&quot;uploadActionUrl&quot;>
    <el-button size=&quot;small&quot; type=&quot;primary&quot;>点击上传</el-button>
</el-upload>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>&lt;<span class="hljs-keyword">el</span>-upload :action=<span class="hljs-string">"uploadActionUrl"</span>&gt;
    &lt;<span class="hljs-keyword">el</span>-button size=<span class="hljs-string">"small"</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"primary"</span>&gt;点击上传&lt;/<span class="hljs-keyword">el</span>-button&gt;
&lt;/<span class="hljs-keyword">el</span>-upload&gt;</code></pre>
<p>这个基本不用说，:action是执行上传动作的后台接口，el-button是触发上传的按钮。</p>
<h3 id="articleHeader1">上传文件数量</h3>
<p>首先是设置是否可以同时选中多个文件上传，这个也是&lt;input type='file'&gt;的属性，添加multiple即可。另外el-upload组件提供了:limit属性来设置最多可以上传的文件数量，超出此数量后选择的文件是不会被上传的。:on-exceed绑定的方法则是处理超出数量后的动作。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-upload 
    :action=&quot;uploadActionUrl&quot;
    multiple
    :limit=&quot;3&quot;
    :on-exceed=&quot;handleExceed&quot;>
    <el-button size=&quot;small&quot; type=&quot;primary&quot;>点击上传</el-button>
</el-upload>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>&lt;<span class="hljs-keyword">el</span>-upload 
    :action=<span class="hljs-string">"uploadActionUrl"</span>
    multiple
    :limit=<span class="hljs-string">"3"</span>
    :<span class="hljs-keyword">on</span>-exceed=<span class="hljs-string">"handleExceed"</span>&gt;
    &lt;<span class="hljs-keyword">el</span>-button size=<span class="hljs-string">"small"</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"primary"</span>&gt;点击上传&lt;/<span class="hljs-keyword">el</span>-button&gt;
&lt;/<span class="hljs-keyword">el</span>-upload&gt;</code></pre>
<h3 id="articleHeader2">上传格式及大小限制</h3>
<p>如果需要限制上传文件的格式，需要添加accept属性，这个是直接使用&lt;input type='file'&gt;一样的属性了，accept属性的值可以是accept="image/gif, image/jpeg, text/plain, application/pdf"等等。文件格式的提示，则可以使用slot。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-upload 
    :action=&quot;uploadActionUrl&quot;
    accept=&quot;image/jpeg,image/gif,image/png&quot;
    multiple
    :limit=&quot;3&quot;
    :on-exceed=&quot;handleExceed&quot;>
    <el-button size=&quot;small&quot; type=&quot;primary&quot;>点击上传</el-button>
    <div slot=&quot;tip&quot; class=&quot;el-upload__tip&quot;>请上传图片格式文件</div>
</el-upload>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">el-upload</span> 
    <span class="hljs-attr">:action</span>=<span class="hljs-string">"uploadActionUrl"</span>
    <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/jpeg,image/gif,image/png"</span>
    <span class="hljs-attr">multiple</span>
    <span class="hljs-attr">:limit</span>=<span class="hljs-string">"3"</span>
    <span class="hljs-attr">:on-exceed</span>=<span class="hljs-string">"handleExceed"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span>点击上传<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"tip"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-upload__tip"</span>&gt;</span>请上传图片格式文件<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-upload</span>&gt;</span></code></pre>
<p>注意这里只是选择文件时限制格式，其实用户还是可以点选“所有文件”选项，上传其他格式。如果需要在在上传时再次校验，择需要在:before-upload这个钩子绑定相应的方法来校验，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-upload 
    :action=&quot;uploadActionUrl&quot;
    accept=&quot;image/jpeg,image/gif,image/png&quot;
    :before-upload=&quot;onBeforeUpload&quot;
    multiple
    :limit=&quot;3&quot;
    :on-exceed=&quot;handleExceed&quot;>
    <el-button size=&quot;small&quot; type=&quot;primary&quot;>点击上传</el-button>
    <div slot=&quot;tip&quot; class=&quot;el-upload__tip&quot;>请上传图片格式文件</div>
</el-upload>
...
    onBeforeUpload(file)
    {
      const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png';
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!');
      }
      return isIMAGE &amp;&amp; isLt1M;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;el-upload 
    :action=<span class="hljs-string">"uploadActionUrl"</span>
    accept=<span class="hljs-string">"image/jpeg,image/gif,image/png"</span>
    :before-upload=<span class="hljs-string">"onBeforeUpload"</span>
    multiple
    :limit=<span class="hljs-string">"3"</span>
    :<span class="hljs-keyword">on</span>-exceed=<span class="hljs-string">"handleExceed"</span>&gt;
    &lt;el-button size=<span class="hljs-string">"small"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"primary"</span>&gt;点击上传&lt;/el-button&gt;
    &lt;div slot=<span class="hljs-string">"tip"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"el-upload__tip"</span>&gt;请上传图片格式文件&lt;/div&gt;
&lt;/el-upload&gt;
...
    onBeforeUpload(<span class="hljs-keyword">file</span>)
    {
      <span class="hljs-keyword">const</span> isIMAGE = <span class="hljs-keyword">file</span>.<span class="hljs-keyword">type</span> === 'image/jpeg'||'image/gif'||'image/png';
      <span class="hljs-keyword">const</span> isLt1M = <span class="hljs-keyword">file</span>.size / 1024 / 1024 &lt; 1;

      <span class="hljs-keyword">if</span> (!isIMAGE) {
        this.<span class="hljs-variable">$message</span>.<span class="hljs-keyword">error</span>('上传文件只能是图片格式!');
      }
      <span class="hljs-keyword">if</span> (!isLt1M) {
        this.<span class="hljs-variable">$message</span>.<span class="hljs-keyword">error</span>('上传文件大小不能超过 1MB!');
      }
      <span class="hljs-keyword">return</span> isIMAGE &amp;&amp; isLt1M;
    }</code></pre>
<p>这里在限制文件格式的同时，也做了文件大小的校验。</p>
<h3 id="articleHeader3">上传过程中的各种钩子</h3>
<p>这里直接搬运官网的说明了，如图：<br><span class="img-wrap"><img data-src="/img/bV52Oc?w=640&amp;h=570" src="https://static.alili.tech/img/bV52Oc?w=640&amp;h=570" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">显示已上传文件列表</h3>
<p>这个功能可以说很强大了，可以很清晰的显示已上传的文件列表，并且可以方便的删除，以便上传新的文件。<br>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-upload 
    :action=&quot;uploadActionUrl&quot;
    accept=&quot;image/jpeg,image/gif,image/png&quot;
    multiple
    :limit=&quot;3&quot;
    :on-exceed=&quot;handleExceed&quot;    
    :on-error=&quot;uploadError&quot;
    :on-success=&quot;uploadSuccess&quot;
    :on-remove=&quot;onRemoveTxt&quot;
    :before-upload=&quot;onBeforeUpload&quot;
    :file-list=&quot;files&quot;>
    <el-button size=&quot;small&quot; type=&quot;primary&quot;>点击上传</el-button>
    <div slot=&quot;tip&quot; class=&quot;el-upload__tip&quot;>请上传图片格式文件</div>
</el-upload>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;el-upload 
    :action=<span class="hljs-string">"uploadActionUrl"</span>
    accept=<span class="hljs-string">"image/jpeg,image/gif,image/png"</span>
    multiple
    :limit=<span class="hljs-string">"3"</span>
    :<span class="hljs-keyword">on</span>-exceed=<span class="hljs-string">"handleExceed"</span>    
    :<span class="hljs-keyword">on</span>-<span class="hljs-keyword">error</span>=<span class="hljs-string">"uploadError"</span>
    :<span class="hljs-keyword">on</span>-success=<span class="hljs-string">"uploadSuccess"</span>
    :<span class="hljs-keyword">on</span>-remove=<span class="hljs-string">"onRemoveTxt"</span>
    :<span class="hljs-keyword">before</span>-upload=<span class="hljs-string">"onBeforeUpload"</span>
    :<span class="hljs-built_in">file</span>-<span class="hljs-built_in">list</span>=<span class="hljs-string">"files"</span>&gt;
    &lt;el-button size=<span class="hljs-string">"small"</span> type=<span class="hljs-string">"primary"</span>&gt;点击上传&lt;/el-button&gt;
    &lt;<span class="hljs-keyword">div</span> slot=<span class="hljs-string">"tip"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"el-upload__tip"</span>&gt;请上传图片格式文件&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/el-upload&gt;</code></pre>
<p>实现方法就是:file-list="files"这个属性的添加，其中files是绑定的数组对象，初始为空。<br>效果如下图：<br><span class="img-wrap"><img data-src="/img/bV52SX?w=346&amp;h=171" src="https://static.alili.tech/img/bV52SX?w=346&amp;h=171" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">上传时提交数据</h3>
<p>上传文件同时需要提交数据给后台接口，这时就要用到:data属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-upload 
    :action=&quot;uploadActionUrl&quot;
    accept=&quot;image/jpeg,image/gif,image/png&quot;
    :data=&quot;uploadData&quot;
    multiple
    :limit=&quot;3&quot;
    :on-exceed=&quot;handleExceed&quot;    
    :on-error=&quot;uploadError&quot;
    :on-success=&quot;uploadSuccess&quot;
    :on-remove=&quot;onRemoveTxt&quot;
    :before-upload=&quot;onBeforeUpload&quot;
    :file-list=&quot;files&quot;>
    <el-button size=&quot;small&quot; type=&quot;primary&quot;>点击上传</el-button>
    <div slot=&quot;tip&quot; class=&quot;el-upload__tip&quot;>请上传图片格式文件</div>
</el-upload>
...
uploadData: {
    dataType: &quot;0&quot;,
    oldFilePath:&quot;&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;el-upload 
    :action=<span class="hljs-string">"uploadActionUrl"</span>
    accept=<span class="hljs-string">"image/jpeg,image/gif,image/png"</span>
    :data=<span class="hljs-string">"uploadData"</span>
    multiple
    :limit=<span class="hljs-string">"3"</span>
    :<span class="hljs-keyword">on</span>-exceed=<span class="hljs-string">"handleExceed"</span>    
    :<span class="hljs-keyword">on</span>-<span class="hljs-keyword">error</span>=<span class="hljs-string">"uploadError"</span>
    :<span class="hljs-keyword">on</span>-success=<span class="hljs-string">"uploadSuccess"</span>
    :<span class="hljs-keyword">on</span>-remove=<span class="hljs-string">"onRemoveTxt"</span>
    :<span class="hljs-keyword">before</span>-upload=<span class="hljs-string">"onBeforeUpload"</span>
    :<span class="hljs-built_in">file</span>-<span class="hljs-built_in">list</span>=<span class="hljs-string">"files"</span>&gt;
    &lt;el-button size=<span class="hljs-string">"small"</span> type=<span class="hljs-string">"primary"</span>&gt;点击上传&lt;/el-button&gt;
    &lt;<span class="hljs-keyword">div</span> slot=<span class="hljs-string">"tip"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"el-upload__tip"</span>&gt;请上传图片格式文件&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/el-upload&gt;
...
uploadData: {
    dataType: <span class="hljs-string">"0"</span>,
    oldFilePath:<span class="hljs-string">""</span>
}</code></pre>
<h3 id="articleHeader6">选取和上传分开处理</h3>
<p>有时我们需要把选取和上传分开处理，比如上传图片，先选取文件提交到前端，图片处理后再把base64内容提交到后台。<br>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-upload
  action=&quot;&quot;
  accept=&quot;image/jpeg,image/png&quot;
  :on-change=&quot;onUploadChange&quot;
  :auto-upload=&quot;false&quot;
  :show-file-list=&quot;false&quot;>
    <el-button slot=&quot;trigger&quot; size=&quot;small&quot; type=&quot;primary&quot;>选取</el-button>
    <el-button style=&quot;margin-left: 10px;&quot; size=&quot;small&quot; type=&quot;success&quot; @click=&quot;submitUpload&quot;>上传</el-button>
    <div slot=&quot;tip&quot; class=&quot;el-upload__tip&quot;>只能上传jpg/png文件，且不能超过1m</div>
</el-upload>
...
  submitUpload()
  {
    console.log(&quot;submit&quot;)
  },
  onUploadChange(file)
  {
    const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
    const isLt1M = file.size / 1024 / 1024 < 1;

    if (!isIMAGE) {
      this.$message.error('只能上传jpg/png图片!');
      return false;
    }
    if (!isLt1M) {
      this.$message.error('上传文件大小不能超过 1MB!');
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file.raw);
    reader.onload = function(e){
        console.log(this.result)//图片的base64数据
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;el-upload
  action=<span class="hljs-string">""</span>
  accept=<span class="hljs-string">"image/jpeg,image/png"</span>
  :<span class="hljs-keyword">on</span>-change=<span class="hljs-string">"onUploadChange"</span>
  :auto-upload=<span class="hljs-string">"false"</span>
  :show-<span class="hljs-keyword">file</span>-<span class="hljs-keyword">list</span>=<span class="hljs-string">"false"</span>&gt;
    &lt;el-button slot=<span class="hljs-string">"trigger"</span> size=<span class="hljs-string">"small"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"primary"</span>&gt;选取&lt;/el-button&gt;
    &lt;el-button style=<span class="hljs-string">"margin-left: 10px;"</span> size=<span class="hljs-string">"small"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"success"</span> @click=<span class="hljs-string">"submitUpload"</span>&gt;上传&lt;/el-button&gt;
    &lt;div slot=<span class="hljs-string">"tip"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"el-upload__tip"</span>&gt;只能上传jpg/png文件，且不能超过1m&lt;/div&gt;
&lt;/el-upload&gt;
...
  submitUpload()
  {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"submit"</span>)
  },
  onUploadChange(<span class="hljs-keyword">file</span>)
  {
    <span class="hljs-keyword">const</span> isIMAGE = (<span class="hljs-keyword">file</span>.raw.<span class="hljs-keyword">type</span> === 'image/jpeg' || <span class="hljs-keyword">file</span>.raw.<span class="hljs-keyword">type</span> === 'image/png');
    <span class="hljs-keyword">const</span> isLt1M = <span class="hljs-keyword">file</span>.size / 1024 / 1024 &lt; 1;

    <span class="hljs-keyword">if</span> (!isIMAGE) {
      this.<span class="hljs-variable">$message</span>.<span class="hljs-keyword">error</span>('只能上传jpg/png图片!');
      <span class="hljs-keyword">return</span> false;
    }
    <span class="hljs-keyword">if</span> (!isLt1M) {
      this.<span class="hljs-variable">$message</span>.<span class="hljs-keyword">error</span>('上传文件大小不能超过 1MB!');
      <span class="hljs-keyword">return</span> false;
    }
    <span class="hljs-keyword">var</span> reader = new FileReader();
    reader.readAsDataURL(<span class="hljs-keyword">file</span>.raw);
    reader.onload = function(<span class="hljs-keyword">e</span>){
        console.<span class="hljs-built_in">log</span>(this.result)<span class="hljs-comment">//图片的base64数据</span>
    }
  }</code></pre>
<p>效果如图：<br><span class="img-wrap"><img data-src="/img/bV591z?w=574&amp;h=142" src="https://static.alili.tech/img/bV591z?w=574&amp;h=142" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Element el-upload上传组件详解

## 原文链接
[https://segmentfault.com/a/1190000013796215](https://segmentfault.com/a/1190000013796215)


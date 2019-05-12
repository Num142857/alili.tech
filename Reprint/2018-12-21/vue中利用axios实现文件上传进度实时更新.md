---
title: 'vue中利用axios实现文件上传进度实时更新' 
date: 2018-12-21 2:30:11
hidden: true
slug: it7g3fa8jbn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>XHR二级增加了progress事件,我们可以据此在浏览器接收新数据期间添加实时数据进度条,从而使得交互更加友好</blockquote>
<h2 id="articleHeader0">vue模板</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;progress&quot; @click=&quot;upload&quot;
         :style=&quot;{backgroundImage:'linear-gradient(to right,#C0C7CB 0%,#C0C7CB '+progress+',#E1E6E9 '+progress+',#E1E6E9 100%)'}&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"progress"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"upload"</span>
         <span class="hljs-attr">:style</span>=<span class="hljs-string">"{backgroundImage:'linear-gradient(to right,#C0C7CB 0%,#C0C7CB '+progress+',#E1E6E9 '+progress+',#E1E6E9 100%)'}"</span>&gt;</span></code></pre>
<h2 id="articleHeader1">vue-js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var form = new FormData()
    form.append('file', vm.$refs.upload.files[0])
    form.append('id', id)
    form.append('type', type)
    var config = {
        onUploadProgress: progressEvent => {
            var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
            this.progress = complete
        }
    }
    axios.post(`api/uploadFile`,
        form, config).then((res) => {
        if (res.data.status === 'success') {
            console.log('上传成功')
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">var</span> form = <span class="hljs-keyword">new</span> FormData()
    form.append(<span class="hljs-string">'file'</span>, vm.$refs.upload.files[<span class="hljs-number">0</span>])
    form.append(<span class="hljs-string">'id'</span>, id)
    form.append(<span class="hljs-string">'type'</span>, type)
    <span class="hljs-keyword">var</span> config = {
        <span class="hljs-attr">onUploadProgress</span>: <span class="hljs-function"><span class="hljs-params">progressEvent</span> =&gt;</span> {
            <span class="hljs-keyword">var</span> complete = (progressEvent.loaded / progressEvent.total * <span class="hljs-number">100</span> | <span class="hljs-number">0</span>) + <span class="hljs-string">'%'</span>
            <span class="hljs-keyword">this</span>.progress = complete
        }
    }
    axios.post(<span class="hljs-string">`api/uploadFile`</span>,
        form, config).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (res.data.status === <span class="hljs-string">'success'</span>) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'上传成功'</span>)
        }
    })</code></pre>
<p>关键点在于progress事件,而axios对ajax封装之后需要在axios的config参数里面写好事件处理函数(具体参数写法可查看axios文档)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中利用axios实现文件上传进度实时更新

## 原文链接
[https://segmentfault.com/a/1190000012487177](https://segmentfault.com/a/1190000012487177)


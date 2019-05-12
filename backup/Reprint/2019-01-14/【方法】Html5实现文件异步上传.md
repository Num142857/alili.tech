---
title: '【方法】Html5实现文件异步上传' 
date: 2019-01-14 2:30:07
hidden: true
slug: hgdbkkaeyyg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1 简介</h2>
<p>开发文件上传功能从来不是一件愉快的事，异步上传更是如此，使用过iframe和Flash的上传方案，也都感觉十分的别扭。本文简要简绍利用Html5的FormData实现文件的异步上传，还可以实现上传进度条和文件大小验证等。服务端使用springMVC的方案进行处理。</p>
<h2 id="articleHeader1">2 Html代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form id=&quot;myForm&quot;>
    <input type=&quot;file&quot; id=&quot;u_photo&quot; name=&quot;u_photo&quot; />
    <input type=&quot;button&quot; id=&quot;submit-btn&quot; value=&quot;上传&quot; />
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myForm"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"u_photo"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"u_photo"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"submit-btn"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"上传"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<h2 id="articleHeader2">3 JQuery上传</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#submit-btn&quot;).on('click', function() {
    $.ajax({
        url:&quot;/test/upload&quot;,
        type:&quot;post&quot;,
        data:new FormData($(&quot;#myForm&quot;).get(0)),
        //十分重要，不能省略
        cache: false,
        processData: false,
        contentType: false,
        success: function () {
            alert(&quot;上传成功！&quot;);
        }
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">"#submit-btn"</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $.ajax({
        <span class="hljs-attr">url</span>:<span class="hljs-string">"/test/upload"</span>,
        <span class="hljs-attr">type</span>:<span class="hljs-string">"post"</span>,
        <span class="hljs-attr">data</span>:<span class="hljs-keyword">new</span> FormData($(<span class="hljs-string">"#myForm"</span>).get(<span class="hljs-number">0</span>)),
        <span class="hljs-comment">//十分重要，不能省略</span>
        cache: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">processData</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">contentType</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            alert(<span class="hljs-string">"上传成功！"</span>);
        }
    });
});</code></pre>
<h2 id="articleHeader3">4 JQuery文件大小验证</h2>
<p>文件大小的及相应行为的控制，需根据需要自行处理，本方法只是示例方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#u_photo').on('change', function() {
    var file = this.files[0];
    if (file.size > 1024*1000) {
        alert('文件最大1M！')
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">'#u_photo'</span>).on(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> file = <span class="hljs-keyword">this</span>.files[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">if</span> (file.size &gt; <span class="hljs-number">1024</span>*<span class="hljs-number">1000</span>) {
        alert(<span class="hljs-string">'文件最大1M！'</span>)
    }
});</code></pre>
<h2 id="articleHeader4">5 JQuery进度条</h2>
<p>在ajax方法中加入xhr即可控制上传进度，进度条可以使用html5的<code>progress</code>也可使用其它的进度条。显示及隐藏进度条需要自行处理，本方法只是简单介绍了进度条的基本控制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr: function() {
    var myXhr = $.ajaxSettings.xhr();
    if (myXhr.upload) {
        myXhr.upload.addEventListener('progress', function(e) {
            if (e.lengthComputable) {
                $('progress').attr({
                    value: e.loaded,
                    max: e.total,
                });
            }
        } , false);
    }
    return myXhr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">xhr: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> myXhr = $.ajaxSettings.xhr();
    <span class="hljs-keyword">if</span> (myXhr.upload) {
        myXhr.upload.addEventListener(<span class="hljs-string">'progress'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">if</span> (e.lengthComputable) {
                $(<span class="hljs-string">'progress'</span>).attr({
                    <span class="hljs-attr">value</span>: e.loaded,
                    <span class="hljs-attr">max</span>: e.total,
                });
            }
        } , <span class="hljs-literal">false</span>);
    }
    <span class="hljs-keyword">return</span> myXhr;
}</code></pre>
<h2 id="articleHeader5">6 springMVC服务端</h2>
<h4>6.1 maven依赖</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.5</version>
</dependency>
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.2</version>
</dependency>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>commons-io<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>commons-io<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.5<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>commons-fileupload<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>commons-fileupload<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.3.2<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span></code></pre>
<h4>6.2 servlet-context.xml</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<bean id=&quot;multipartResolver&quot; class=&quot;org.springframework.web.multipart.commons.CommonsMultipartResolver&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">bean</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"multipartResolver"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"org.springframework.web.multipart.commons.CommonsMultipartResolver"</span> /&gt;</span></code></pre>
<h4>6.3 Controller</h4>
<p>示例程序，并未给出文件验证，存储及处理的相应代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@RequestMapping(value=&quot;/test/upload&quot;,method = RequestMethod.POST)
@ResponseBody
public String upload(@RequestParam(&quot;u_photo&quot;) MultipartFile u_photo) {
    System.out.println(&quot;u_photo=&quot;+u_photo.getSize());
    return &quot;ok&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-meta">@RequestMapping</span>(value=<span class="hljs-string">"/test/upload"</span>,method = RequestMethod.POST)
<span class="hljs-meta">@ResponseBody</span>
<span class="hljs-function"><span class="hljs-keyword">public</span> String <span class="hljs-title">upload</span><span class="hljs-params">(@RequestParam(<span class="hljs-string">"u_photo"</span>)</span> MultipartFile u_photo) </span>{
    System.out.println(<span class="hljs-string">"u_photo="</span>+u_photo.getSize());
    <span class="hljs-keyword">return</span> <span class="hljs-string">"ok"</span>;
}</code></pre>
<h2 id="articleHeader6">7 兼容性</h2>
<p>IE 10+, Firefox 4.0+, Chrome 7+, Safari 5+, Opera 12+</p>
<h2 id="articleHeader7">8 推荐阅读</h2>
<p>如果对上述方案不满意，推荐使用如下的解决方案：</p>
<p><a href="https://github.com/danielm/uploader/" rel="nofollow noreferrer" target="_blank">JQuery File Uploader</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【方法】Html5实现文件异步上传

## 原文链接
[https://segmentfault.com/a/1190000009474627](https://segmentfault.com/a/1190000009474627)


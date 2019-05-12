---
title: 'new FormData() - FormData对象的作用及用法' 
date: 2018-12-23 2:30:07
hidden: true
slug: 6kok36925
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、概述</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FormData 对象的使用：
1.用一些键值对来模拟一系列表单控件：即把form中所有表单元素的name与value组装成
一个queryString
2. 异步上传二进制文件。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>FormData 对象的使用：
<span class="hljs-number">1.</span>用一些键值对来模拟一系列表单控件：即把<span class="hljs-keyword">form</span>中所有表单元素的<span class="hljs-keyword">name</span>与<span class="hljs-keyword">value</span>组装成
一个queryString
<span class="hljs-number">2.</span> 异步上传二进制文件。
</code></pre>
<h2 id="articleHeader1">二、使用</h2>
<p><strong>1.FormData对象的操作方法，全部在原型中，自己本身没任何的属性及方法。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVZS3q?w=303&amp;h=258" src="https://static.alili.tech/img/bVZS3q?w=303&amp;h=258" alt="FormData对象的操作方法" title="FormData对象的操作方法" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let formData = new FormData()
formData.append('user', 'zhang')
获取 formData.get('user')  //zhang
删除 formData.delete('user')
....." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">let</span> formData = <span class="hljs-keyword">new</span> FormData()
formData.<span class="hljs-keyword">append</span>(<span class="hljs-string">'user'</span>, <span class="hljs-string">'zhang'</span>)
获取 formData.<span class="hljs-built_in">get</span>(<span class="hljs-string">'user'</span>)  //zhang
删除 formData.<span class="hljs-keyword">delete</span>(<span class="hljs-string">'user'</span>)
.....</code></pre>
<p><strong>2.使用FormData对象发送文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTML部分
<form action=&quot;&quot;>
        <label for=&quot;&quot;>
            姓名: <input type=&quot;text&quot; name=&quot;name&quot;>
        </label>
        <label for=&quot;&quot;>
            文件：<input id=&quot;file&quot; type=&quot;file&quot; name=&quot;file&quot;>
        </label>
        <label for=&quot;&quot;>
            <input type=&quot;button&quot; value=&quot;保存&quot;>
        </label>
</form>
JS部分
var btn = document.querySelector('[type=button]');
btn.onclick = function () {
    // 文件元素
    var file = document.querySelector('[type=file]');
    // 通过FormData将文件转成二进制数据
    var formData = new FormData();
    // 将文件转二进制
    *****注意2******
    formData.append('upload', file.files[0]);
    *****注意1******
    var xhr = new XMLHttpRequest;
    xhr.open('post', 'file.php');
    // 监听上传进度
    xhr.upload.onprogress = function (ev) {
    // 事件对象
    // console.log(ev);

        var percent = (ev.loaded / ev.total) * 100 + '%';

        console.log(percent);

        progress.style.width = percent;
    }

    xhr.send(formData);

    xhr.onreadystatechange = function () {
            if(xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
                    //
            }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>HTML部分
&lt;<span class="hljs-keyword">form</span> action=<span class="hljs-string">""</span>&gt;
        &lt;<span class="hljs-keyword">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">""</span>&gt;
            姓名: &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span> name=<span class="hljs-string">"name"</span>&gt;
        &lt;/<span class="hljs-keyword">label</span>&gt;
        &lt;<span class="hljs-keyword">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">""</span>&gt;
            文件：&lt;<span class="hljs-keyword">input</span> id=<span class="hljs-string">"file"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"file"</span> name=<span class="hljs-string">"file"</span>&gt;
        &lt;/<span class="hljs-keyword">label</span>&gt;
        &lt;<span class="hljs-keyword">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">""</span>&gt;
            &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"保存"</span>&gt;
        &lt;/<span class="hljs-keyword">label</span>&gt;
&lt;/<span class="hljs-keyword">form</span>&gt;
JS部分
<span class="hljs-keyword">var</span> btn = document.querySelector('[<span class="hljs-keyword">type</span>=button]');
btn.onclick = function () {
    <span class="hljs-comment">// 文件元素</span>
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">file</span> = document.querySelector('[<span class="hljs-keyword">type</span>=<span class="hljs-keyword">file</span>]');
    <span class="hljs-comment">// 通过FormData将文件转成二进制数据</span>
    <span class="hljs-keyword">var</span> formData = new FormData();
    <span class="hljs-comment">// 将文件转二进制</span>
<span class="hljs-comment">    *****注意2******</span>
    formData.<span class="hljs-keyword">append</span>('upload', <span class="hljs-keyword">file</span>.files[0]);
<span class="hljs-comment">    *****注意1******</span>
    <span class="hljs-keyword">var</span> xhr = new XMLHttpRequest;
    xhr.<span class="hljs-keyword">open</span>('<span class="hljs-keyword">post</span>', '<span class="hljs-keyword">file</span>.php');
    <span class="hljs-comment">// 监听上传进度</span>
    xhr.upload.onprogress = function (ev) {
    <span class="hljs-comment">// 事件对象</span>
    <span class="hljs-comment">// console.log(ev);</span>

        <span class="hljs-keyword">var</span> percent = (ev.loaded / ev.<span class="hljs-keyword">total</span>) * 100 + '%';

        console.<span class="hljs-built_in">log</span>(percent);

        progress.style.width = percent;
    }

    xhr.send(formData);

    xhr.onreadystatechange = function () {
            <span class="hljs-keyword">if</span>(xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
                    <span class="hljs-comment">//</span>
            }
    }
}
</code></pre>
<p><strong>注意1：使用jQuery</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" $.ajax({
    url: 'file.php',
    type: 'POST',
    data: formdata,                    // 上传formdata封装的数据
    dataType: 'JSON',
    cache: false,                      // 不缓存
    processData: false,                // jQuery不要去处理发送的数据
    contentType: false,                // jQuery不要去设置Content-Type请求头
    success:function (data) {           //成功回调
        console.log(data);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code> $.ajax({
    url: <span class="hljs-string">'file.php'</span>,
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'POST'</span>,
    <span class="hljs-built_in">data</span>: formdata,                    <span class="hljs-comment">// 上传formdata封装的数据</span>
    dataType: <span class="hljs-string">'JSON'</span>,
    <span class="hljs-keyword">cache</span>: <span class="hljs-literal">false</span>,                      <span class="hljs-comment">// 不缓存</span>
    processData: <span class="hljs-literal">false</span>,                <span class="hljs-comment">// jQuery不要去处理发送的数据</span>
    contentType: <span class="hljs-literal">false</span>,                <span class="hljs-comment">// jQuery不要去设置Content-Type请求头</span>
    success:function (<span class="hljs-built_in">data</span>) {           <span class="hljs-comment">//成功回调</span>
        console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">data</span>);
    }
});</code></pre>
<p><strong>注意2：参数</strong><br>new FormData的参数是一个DOM对象，而非jQuery对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var formData = new FormData($(&quot;#file&quot;)[0]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> <span class="hljs-type">FormData</span>($(<span class="hljs-string">"#file"</span>)[<span class="hljs-number">0</span>]);
</code></pre>
<h2 id="articleHeader2">三、jQuery的参数序列化方法serialize()</h2>
<p>序列表表格内容为字符串，用于 Ajax 请求。 <br>$("form").serialize()</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
new FormData() - FormData对象的作用及用法

## 原文链接
[https://segmentfault.com/a/1190000012327982](https://segmentfault.com/a/1190000012327982)


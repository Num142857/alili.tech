---
title: '浅谈contentType = false' 
date: 2019-02-02 2:30:10
hidden: true
slug: qub91npq1
categories: [reprint]
---

{{< raw >}}

                    
<p>在刚接触 JQuery 中的 ajax 时，对其 contentType 并没有很在意，只是知晓它是代表发送信息至服务器时内容编码类型,通俗点说就是告诉服务器从浏览器提交过来的数据格式。</p>
<p>默认值为<code>contentType = "application/x-www-form-urlencoded"</code>.在默认情况下，内容编码类型满足大多数情况。<br>在这里，我们主要谈谈contentType = false.<br>在使用ajax上传文件时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var formData = new FormData();
    formData.append('headPic', $(&quot;#upfile&quot;)[0].files[0]);
             $.ajax({
                    url: '/web/headPic',
                    type: 'post',
                    dataType: 'json',
                    cache: false,
                    data:formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(data) {    //上传成功
                    if(data.status == true){
                        console.log(&quot;success&quot;); 
                    }else{
                        console.log(data.errMsg);
                    }
                })
                .fail(function() {
                    console.log(&quot;GG,failed&quot;);
                })
                .always(function() {
                    console.log(&quot;complete&quot;);
                });
         " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData();
    formData.append(<span class="hljs-string">'headPic'</span>, $(<span class="hljs-string">"#upfile"</span>)[<span class="hljs-number">0</span>].files[<span class="hljs-number">0</span>]);
             $.ajax({
                    <span class="hljs-attr">url</span>: <span class="hljs-string">'/web/headPic'</span>,
                    <span class="hljs-attr">type</span>: <span class="hljs-string">'post'</span>,
                    <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
                    <span class="hljs-attr">cache</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">data</span>:formData,
                    <span class="hljs-attr">processData</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">contentType</span>: <span class="hljs-literal">false</span>,
                })
                .done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{    <span class="hljs-comment">//上传成功</span>
                    <span class="hljs-keyword">if</span>(data.status == <span class="hljs-literal">true</span>){
                        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"success"</span>); 
                    }<span class="hljs-keyword">else</span>{
                        <span class="hljs-built_in">console</span>.log(data.errMsg);
                    }
                })
                .fail(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"GG,failed"</span>);
                })
                .always(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"complete"</span>);
                });
         </code></pre>
<p>在其中先封装了一个 formData 对象，然后使用 post 方法将文件传给服务器。</p>
<p>这里我们就要先说说在 http 中传输文件的问题。起初，http 协议中没有上传文件方面的功能，直到 rfc1867 为 http 协议添加了这个功能。当然在 rfc1867 中限定 form 的 method 必须为 POST ， <code>enctype = “multipart/form-data”</code> 以及<code>&lt;input type = "file"&gt;</code>.</p>
<p>当我们使用表单上传文件时，我们来查看他的Request headers：<br><span class="img-wrap"><img data-src="/img/bVEoYA?w=1188&amp;h=72" src="https://static.alili.tech/img/bVEoYA?w=1188&amp;h=72" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>发现在 multipart/form-data 后面有boundary以及一串字符，这是分界符，后面的一堆字符串是随机生成的，目的是防止上传文件中出现分界符导致服务器无法正确识别文件起始位置。说到这肯定就要说说这分界符有啥作用呢？</p>
<p>因为对于上传文件，我们没有在使用原有的 http 协议，所以 multipart/form-data 请求是基于 http 原有的请求方式 post 而来的.那么来说说这个全新的请求方式与 post 的区别</p>
<ol>
<li><p>请求头的不同，对于上传文件的请求，<code>contentType = multipart/form-data</code>是必须的，而 post 则不是，毕竟 post 又不是只上传文件～。</p></li>
<li><p>请求体不同。这里的不同也就是指前者在发送的每个字段内容之间必须要使用分界符来隔开，比如文件的内容和文本的内容就需要分隔开，不然服务器就没有办法正常的解析文件，而后者 post 当然就没有分界符直接以 name = "value"的形似发送。</p></li>
</ol>
<p>说到这，我们发现在 JQuery ajax() 方法中我们使<code>contentType = false</code>,这不是冲突了吗？这当然没有，因为当我们查看这时的 Request headers，会发现还是有分界符。这就是因为当我们在 form 标签中设置了<code>enctype = “multipart/form-data”</code>,这样请求中的 contentType 就会默认为 multipart/form-data 。而我们在 ajax 中 contentType 设置为 false 是为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。</p>
<p>说真的，起初我只是想查查为啥使用 ajax 上传文件时要将 <code>contentType = false</code>，结果莫名其妙了解到了 http 协议的一些知识～～有意思&gt;_&lt;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈contentType = false

## 原文链接
[https://segmentfault.com/a/1190000007207128](https://segmentfault.com/a/1190000007207128)


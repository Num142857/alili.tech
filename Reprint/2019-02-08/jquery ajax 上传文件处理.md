---
title: 'jquery ajax 上传文件处理' 
date: 2019-02-08 2:30:40
hidden: true
slug: 0lhk9jqgtkc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">FormData对象</h2>
<p>XMLHttpRequest Level 2添加了一个新的接口FormData.利用FormData对象,我们可以通过JavaScript用一些键值对来模拟一系列表单控件,我们还可以使用XMLHttpRequest的send()方法来异步的提交这个"表单".比起普通的ajax,使用FormData的最大优点就是我们可以异步上传一个二进制文件. </p>
<p>所有主流浏览器的较新版本都已经支持这个对象了，比如Chrome 7+、Firefox 4+、IE 10+、Opera 12+、Safari 5+。<br>之前都是用原生js的XMLHttpRequest写的请求</p>
<h2 id="articleHeader1">XMLHttpRequest方式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.open(&quot;POST&quot;, uri, true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
        // Handle response.
        alert(xhr.responseText); // handle response.
    }
};
fd.append('myFile', file);
// Initiate a multipart/form-data upload
xhr.send(fd);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>xhr.open(<span class="hljs-string">"<span class="hljs-keyword">POST</span>"</span>, uri, true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span>) {
        // Handle response.
        alert(xhr.responseText); // handle response.
    }
};
fd.append('myFile', file);
// Initiate a multipart/form-data upload
xhr.send(fd);</code></pre>
<p>其实jquery的ajax也可以支持到的，关键是设置：processData 和 contentType 。</p>
<h2 id="articleHeader2">ajax方式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var formData = new FormData();
var name = $(&quot;input&quot;).val();
formData.append(&quot;file&quot;,$(&quot;#upload&quot;)[0].files[0]);
formData.append(&quot;name&quot;,name);
$.ajax({  
        url : Url,  
        type : 'POST',  
        data : formData,  
        // 告诉jQuery不要去处理发送的数据
        processData : false, 
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        beforeSend:function(){
               console.log(&quot;正在进行，请稍候&quot;);
                },
        success : function(responseStr) { 
            if(responseStr.status===0){
                console.log(&quot;成功&quot;+responseStr);
            }else{
                console.log(&quot;失败&quot;);
            }
        },  
        error : function(responseStr) { 
            console.log(&quot;error&quot;);
        }  
    }); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData();
<span class="hljs-keyword">var</span> name = $(<span class="hljs-string">"input"</span>).val();
formData.append(<span class="hljs-string">"file"</span>,$(<span class="hljs-string">"#upload"</span>)[<span class="hljs-number">0</span>].files[<span class="hljs-number">0</span>]);
formData.append(<span class="hljs-string">"name"</span>,name);
$.ajax({  
        <span class="hljs-attr">url</span> : Url,  
        <span class="hljs-attr">type</span> : <span class="hljs-string">'POST'</span>,  
        <span class="hljs-attr">data</span> : formData,  
        <span class="hljs-comment">// 告诉jQuery不要去处理发送的数据</span>
        processData : <span class="hljs-literal">false</span>, 
        <span class="hljs-comment">// 告诉jQuery不要去设置Content-Type请求头</span>
        contentType : <span class="hljs-literal">false</span>,
        <span class="hljs-attr">beforeSend</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"正在进行，请稍候"</span>);
                },
        <span class="hljs-attr">success</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">responseStr</span>) </span>{ 
            <span class="hljs-keyword">if</span>(responseStr.status===<span class="hljs-number">0</span>){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"成功"</span>+responseStr);
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"失败"</span>);
            }
        },  
        <span class="hljs-attr">error</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">responseStr</span>) </span>{ 
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"error"</span>);
        }  
    }); </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jquery ajax 上传文件处理

## 原文链接
[https://segmentfault.com/a/1190000005831232](https://segmentfault.com/a/1190000005831232)


---
title: '表单提交时编码类型enctype详解' 
date: 2019-02-11 2:30:49
hidden: true
slug: 5jurbek4a8d
categories: [reprint]
---

{{< raw >}}

                    
<p>很早以前，当还没有前端这个概念的时候，我在写表单提交完全不去理会表单数据的编码，在<code>action</code>属性里写好目标URL，剩下的啊交给浏览器吧~但是现在，更多时候我们都采用Ajax方式提交数据，这种原始的方式仅仅被当成优雅降级的产物。</p>
<p>当我们用异步方式提交表单，就需要稍微关注一下表单数据的编码问题了。回想一下，在写回调函数时是不是有根据过请求的<code>Content-Type</code>写不同业务逻辑的经历，那这个<code>Content-Type</code>和表单的编码有什么联系吗？有没有在明明前端已经发数据给后端了，后端的小伙伴死活取不到数据的情况？这些纠结的问题背后的原因真是困扰了我好久，今天在篇文章里就要把它们掰扯清楚！</p>
<h2 id="articleHeader0">是什么决定了表单的编码？</h2>
<p>熟悉表单元素<code>&lt;form&gt;</code>的小伙伴，对其中的属性<code>enctype</code>一定不会陌生，就是它规定了对表单提交给服务器时表单数据编码的内容类型(Content Type)。以下引用，摘自<a href="http://www.w3.org/TR/1999/REC-html401-19991224/interact/forms.html#adef-enctype" rel="nofollow noreferrer" target="_blank">HTML 4.01规范的Form章节</a>：</p>
<blockquote><p>enctype = content-type [CI]<br>This attribute specifies the <em>content type</em> used to submit the form to the server</p></blockquote>
<p>content type？这不就是我们在回调函数里判断返回数据的类型，并且是在请求头中的那个玩意儿吗？！没错！就是它！根据<a href="http://www.w3.org/TR/1999/REC-html401-19991224/types.html#type-content-type" rel="nofollow noreferrer" target="_blank">HTML 4.01规范的基础数据类型</a>的说明，这个content type<strong>指定了连接资源的属性</strong>，同时也是MIME type的那些媒体类型。</p>
<h2 id="articleHeader1">表单编码类型</h2>
<p>知道了表单编码由<code>enctype</code>决定的，那么它究竟有多少可选的取值呢？是不是所有的MIME类型它都能用呢？<br>实际上，根据<a href="http://www.w3.org/TR/2014/REC-html5-20141028/forms.html#attr-fs-enctype" rel="nofollow noreferrer" target="_blank">HTML5 规范</a>中所叙述的，<code>enctype</code>具有以下三种选项，其中最后一项<code>text/plain</code>是相比4.01新增的。</p>
<ul>
<li><p>application/x-www-form-urlencoded</p></li>
<li><p>multipart/form-data</p></li>
<li><p>text/plain</p></li>
</ul>
<h3 id="articleHeader2">application/x-www-form-urlencoded</h3>
<p>这是<strong>默认的编码类型</strong>，使用该类型时，会将表单数据中<em>非字母数字的字符转换成转义字符</em>，如"%HH"，然后组合成这种形式<code>key1=value1&amp;key2=value2</code>；所以后端在取数据后，<em>要进行解码</em>。</p>
<p><strong>注意：</strong></p>
<ul><li><p>若表单中有文件，则只留文件名；</p></li></ul>
<h3 id="articleHeader3">multipart/form-data</h3>
<p>该类型用于<strong>高效传输文件、非ASCII数据和二进制数据</strong>，将表单数据逐项地分成不同的部分，用指定的分割符分割每一部分。每一部分都拥有<code>Content-Disposition</code>头部，指定了该表单项的键名和一些其他信息；并且每一部分都有可选的<code>Content-Type</code>，不特殊指定就为<code>text/plain</code>。下面给出一个采用<code>multipart/form-data</code>编码类型的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Content-Type: multipart/form-data; boundary=AaB03x   
--AaB03x   
Content-Disposition: form-data; name=&quot;submit-name&quot;   
Larry   
--AaB03x   
Content-Disposition: form-data; name=&quot;files&quot;; filename=&quot;file1.txt&quot;   
Content-Type: text/plain   
... contents of file1.txt ...       
--AaB03x--
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>Content-Type: multipart/form-data; boundary=AaB03x   
<span class="hljs-comment">--AaB03x   </span>
Content-Disposition: form-data; <span class="hljs-built_in">name</span>=<span class="hljs-string">"submit-name"</span>   
Larry   
<span class="hljs-comment">--AaB03x   </span>
Content-Disposition: form-data; <span class="hljs-built_in">name</span>=<span class="hljs-string">"files"</span>; filename=<span class="hljs-string">"file1.txt"</span>   
Content-Type: <span class="hljs-built_in">text</span>/plain   
... <span class="hljs-built_in">contents</span> <span class="hljs-keyword">of</span> file1.txt ...       
<span class="hljs-comment">--AaB03x--</span>
</code></pre>
<p><strong>注意：</strong></p>
<ul>
<li><p>一般来说，<code>method</code>和<code>enctype</code>是两个不同的互不影响的属性，但在传文件时，<code>method</code>必须要指定为<code>POST</code>，否则文件只剩下filename了；</p></li>
<li><p>当没有传文件时，<code>enctype</code>会改回默认的<code>application/x-www-form-urlencoded</code>。</p></li>
</ul>
<h3 id="articleHeader4">text/plain</h3>
<p>按照键值对排列表单数据<code>key1=value1\r\nkey2=value2</code>，不进行转义。</p>
<p><strong>注意：</strong></p>
<ul><li><p>若表单中有文件，则只留文件名；</p></li></ul>
<h3 id="articleHeader5">application/json及其他MIME类型</h3>
<p>另外，还需要说明表单数据编码类型<code>application/json</code>，已经被W3C遗弃（详见<a href="http://www.w3.org/TR/2015/NOTE-html-json-forms-20150929/#the-application-json-encoding-algorithm" rel="nofollow noreferrer" target="_blank">HTML JSON Form Submission</a>），建议不要在<code>&lt;form enctype="..."&gt;</code>中使用了，即使用了如果浏览器不支持，也会替换成<code>application/x-www-form-urlencoded</code>。<br>同理，其余的MIME类型，也不支持，均会替换成默认编码<code>application/x-www-form-urlencoded</code>。</p>
<p><em>PS：貌似现在浏览器都不支持了，我先用了下面几个浏览器：</em></p>
<ul>
<li><p><em>FF43：Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0</em></p></li>
<li><p><em>Chrome49, Safari9.1：Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36</em></p></li>
<li><p><em>IE6, 8</em></p></li>
</ul>
<h2 id="articleHeader6">后记</h2>
<p>所以，<code>enctype</code>可以认为就是表单数据的<code>content type(MIME type)</code>，只不过其取值不能用除了上面提到的三个，否则会转换成默认的编码。</p>
<p>今天掰扯完了表单提交时的编码类型<code>enctype</code>，以及它和<code>content type</code>、<code>MIME type</code>的关系。下次再总结一下Ajax提交表单的类型吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
表单提交时编码类型enctype详解

## 原文链接
[https://segmentfault.com/a/1190000004955798](https://segmentfault.com/a/1190000004955798)


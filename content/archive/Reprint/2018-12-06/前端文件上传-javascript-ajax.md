---
title: '前端文件上传-javascript-ajax' 
date: 2018-12-06 2:30:09
hidden: true
slug: kv2eu84qg5m
categories: [reprint]
---

{{< raw >}}

                    
<p>书写是为了更好的记忆。</p>
<h3 id="articleHeader0">方案一：form表单上传</h3>
<p>该方案优点是支持好，缺点刷新页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form action=&quot;url&quot;  method=&quot;post&quot; enctype=&quot;multipart/form-data&quot;>
    <input type=&quot;file&quot; name=&quot;file&quot;><input type=&quot;submit&quot; value=&quot;提交&quot;>
</form>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">form</span> action=<span class="hljs-string">"url"</span>  method=<span class="hljs-string">"post"</span> enctype=<span class="hljs-string">"multipart/form-data"</span>&gt;
    &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"file"</span> name=<span class="hljs-string">"file"</span>&gt;&lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"submit"</span> value=<span class="hljs-string">"提交"</span>&gt;
&lt;/<span class="hljs-keyword">form</span>&gt;  </code></pre>
<p>原理：<code>enctype</code>就是form上传文件的重点。</p>
<table>
<thead><tr>
<th>值</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>application/x-www-form-urlencoded</code></td>
<td align="left">默认。在发送前对所有字符进行编码（将空格转换为 "+" 符号，特殊字符转换为 ASCII HEX 值）</td>
</tr>
<tr>
<td><code>multipart/form-data</code></td>
<td align="left">不对字符编码。当使用有文件上传控件的表单时，该值是必需的</td>
</tr>
<tr>
<td><code>text/plain</code></td>
<td align="left">将空格转换为 "+" 符号，但不编码特殊字符</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader1">方案二：form表单上传-优化方案一缺点</h3>
<p>该方案的优点也是支持好，缺点是不支持跨域。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form action=&quot;url&quot;  method=&quot;post&quot; enctype=&quot;multipart/form-data&quot; target=&quot;iframe&quot;>
    <input type=&quot;file&quot; name=&quot;file&quot;><input type=&quot;submit&quot; value=&quot;提交&quot;>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">form</span> action=<span class="hljs-string">"url"</span>  method=<span class="hljs-string">"post"</span> enctype=<span class="hljs-string">"multipart/form-data"</span> target=<span class="hljs-string">"iframe"</span>&gt;
    &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"file"</span> name=<span class="hljs-string">"file"</span>&gt;&lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"submit"</span> value=<span class="hljs-string">"提交"</span>&gt;
&lt;/<span class="hljs-keyword">form</span>&gt;</code></pre>
<p>原理：通过<code>target</code>把响应指向一个<code>iframe</code>页面，之后拿到返回数据。</p>
<table>
<thead><tr>
<th>值</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>_blank</code></td>
<td align="left">在新窗口/选项卡中打开</td>
</tr>
<tr>
<td><code>_self</code></td>
<td align="left">默认，    在同一框架中打开</td>
</tr>
<tr>
<td><code>_parent</code></td>
<td align="left">在父框架中打开。</td>
</tr>
<tr>
<td><code>_top</code></td>
<td align="left">在整个窗口中打开</td>
</tr>
<tr>
<td><code>framename</code></td>
<td align="left">在指定的 iframe 中打开</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader2">方案三：ajax上传-优化方案二缺点</h3>
<p>该方案的缺点<a href="https://caniuse.com/#search=FormData" rel="nofollow noreferrer" target="_blank">兼容问题-caniuse</a>，兼容有两个方向一是低版本<code>ie</code>不支持<code>CORS</code>跨域，一个就是<code>input</code>新加的<code>Files</code>。优点就是异步，进度条，判断大小，处理，跨域。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var file = input.files[0];
var xhr = new XMLHttpRequest();
if (xhr.upload) {
    xhr.upload.addEventListener(&quot;progress&quot;, function(e) {
        console.log(file, e.loaded, e.total);
    }, false);
    // 文件上传成功或是失败
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log('成功', xhr.responseText)
            } else {
                console.log('失败')    
            }
        }
    }
    // 开始上传
    xhr.open(&quot;POST&quot;, 'url', true);
    xhr.send(file);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> file = input.files[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
<span class="hljs-keyword">if</span> (xhr.upload) {
    xhr.upload.addEventListener(<span class="hljs-string">"progress"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-built_in">console</span>.log(file, e.loaded, e.total);
    }, <span class="hljs-literal">false</span>);
    <span class="hljs-comment">// 文件上传成功或是失败</span>
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span>) {
            <span class="hljs-keyword">if</span> (xhr.status == <span class="hljs-number">200</span>) {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'成功'</span>, xhr.responseText)
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'失败'</span>)    
            }
        }
    }
    <span class="hljs-comment">// 开始上传</span>
    xhr.open(<span class="hljs-string">"POST"</span>, <span class="hljs-string">'url'</span>, <span class="hljs-literal">true</span>);
    xhr.send(file);
}</code></pre>
<h3 id="articleHeader3">方案四：ajax-formData上传-多字段多文件；</h3>
<p>该方案基本同上，只不过使用了<code>FormData</code>，缺点就是<code>formData</code>的兼容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var formData = new FormData();
formData.append('file', input.files[0]);
xhr.send(formData);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> formData = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">FormData</span>();
<span class="hljs-title">formData</span>.<span class="hljs-title">append</span>('file', input.files[<span class="hljs-number">0</span>]);
<span class="hljs-title">xhr</span>.<span class="hljs-title">send</span>(formData);
</span></code></pre>
<h3 id="articleHeader4">其他方案：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. SWFupload Flash上传
2. jquery.form.js 其他插件上传
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>. SWFupload Flash上传
<span class="hljs-number">2</span>. jquery<span class="hljs-selector-class">.form</span><span class="hljs-selector-class">.js</span> 其他插件上传
</code></pre>
<h3 id="articleHeader5">需求一：拖拽上传</h3>
<p>使用<code>drop</code>事件，获取<code>e.dataTransfer</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.querySelector('body').addEventListener(&quot;drop&quot;, (e)=>{
    e.preventDefault();//不写的话，就打开了
    console.log(e.dataTransfer.files[0])
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'body'</span>).addEventListener(<span class="hljs-string">"drop"</span>, <span class="hljs-function"><span class="hljs-params">(e)</span>=&gt;</span>{
    e.preventDefault();<span class="hljs-regexp">//</span>不写的话，就打开了
    <span class="hljs-built_in">console</span>.log(e.dataTransfer.files[<span class="hljs-number">0</span>])
});
</code></pre>
<h3 id="articleHeader6">需求二：<a href="http://jsrun.net/ZCqKp" rel="nofollow noreferrer" target="_blank">截图-粘贴-上传</a>
</h3>
<p>使用<code>paste</code>事件，获取<code>e.clipboardData</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.querySelector('body').addEventListener(&quot;paste&quot;, (e)=>{
    e.preventDefault();//不写的话，就打开了
    console.log(e.clipboardData.files[0])
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'body'</span>).addEventListener(<span class="hljs-string">"paste"</span>, <span class="hljs-function"><span class="hljs-params">(e)</span>=&gt;</span>{
    e.preventDefault();<span class="hljs-regexp">//</span>不写的话，就打开了
    <span class="hljs-built_in">console</span>.log(e.clipboardData.files[<span class="hljs-number">0</span>])
});</code></pre>
<h3 id="articleHeader7">需求三：base64转换上传</h3>
<p>场景发生在，一个和客户端交互的情况下，客户端选择的图片之后返给我了一个base64，让我上传这个，而且接口那边还不改，就要文件。代码写的比较啰嗦，其实也用不了这么多东西，当时也是第一次接触<code>atob</code>、<code>Blob</code>、<code>ArrayBuffer</code>这些东西，就写成这样了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function(data){
    var _str = atob(data.base64Str)
    var _filePath = ((data.filePath.match(/.(jpg|jpeg|png|bmp)$/) || [])[1] || 'png').toLowerCase();
    var _filePathHash = {
        jpg:'image/jpeg',jpeg:'image/jpeg',png: 'image/png',bmp:'application/x-bmp',
    }
    var pre = '--------------------------1\r\nContent-Disposition: form-data; name=&quot;file&quot;; filename=&quot;1.png&quot;\r\nContent-Type: '+_filePathHash[_filePath]+'\r\n\r\n';
    var end = '\r\n--------------------------1--';
    var buffer = new ArrayBuffer(_str.length);
    var uint8 = new Uint8Array(buffer);
    for(var i in _str){
        uint8[i] = _str.charCodeAt(i);
    }
    var blob = new Blob([pre, uint8, end], {type: _filePathHash[_filePath]});
    var oReq = new XMLHttpRequest();
    oReq.open(&quot;POST&quot;, &quot;url&quot;, true);
    oReq.setRequestHeader(&quot;Content-Type&quot;, &quot;multipart/form-data; boundary=------------------------1&quot;)
    oReq.onreadystatechange=function(){if (oReq.readyState==4 &amp;&amp; oReq.status==200){console.log(oReq.responseText); }
    oReq.send(blob);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-keyword">var</span> _str = atob(data.base64Str)
    <span class="hljs-keyword">var</span> _filePath = ((data.filePath.match(<span class="hljs-regexp">/.(jpg|jpeg|png|bmp)$/</span>) || [])[<span class="hljs-number">1</span>] || <span class="hljs-string">'png'</span>).toLowerCase();
    <span class="hljs-keyword">var</span> _filePathHash = {
        <span class="hljs-attr">jpg</span>:<span class="hljs-string">'image/jpeg'</span>,<span class="hljs-attr">jpeg</span>:<span class="hljs-string">'image/jpeg'</span>,<span class="hljs-attr">png</span>: <span class="hljs-string">'image/png'</span>,<span class="hljs-attr">bmp</span>:<span class="hljs-string">'application/x-bmp'</span>,
    }
    <span class="hljs-keyword">var</span> pre = <span class="hljs-string">'--------------------------1\r\nContent-Disposition: form-data; name="file"; filename="1.png"\r\nContent-Type: '</span>+_filePathHash[_filePath]+<span class="hljs-string">'\r\n\r\n'</span>;
    <span class="hljs-keyword">var</span> end = <span class="hljs-string">'\r\n--------------------------1--'</span>;
    <span class="hljs-keyword">var</span> buffer = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(_str.length);
    <span class="hljs-keyword">var</span> uint8 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(buffer);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> _str){
        uint8[i] = _str.charCodeAt(i);
    }
    <span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">new</span> Blob([pre, uint8, end], {<span class="hljs-attr">type</span>: _filePathHash[_filePath]});
    <span class="hljs-keyword">var</span> oReq = <span class="hljs-keyword">new</span> XMLHttpRequest();
    oReq.open(<span class="hljs-string">"POST"</span>, <span class="hljs-string">"url"</span>, <span class="hljs-literal">true</span>);
    oReq.setRequestHeader(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"multipart/form-data; boundary=------------------------1"</span>)
    oReq.onreadystatechange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">if</span> (oReq.readyState==<span class="hljs-number">4</span> &amp;&amp; oReq.status==<span class="hljs-number">200</span>){<span class="hljs-built_in">console</span>.log(oReq.responseText); }
    oReq.send(blob);
</code></pre>
<h3 id="articleHeader8">需求四</h3>
<p>上传一般来说都是要写样式的，不能说光是默认的input样式就ok，但是呢，样式又不是那么太好写，我们怎么办呢？</p>
<h4>方案一</h4>
<p><code>label</code>标签的<code>for</code>去触发<code>input</code>的单击，这样不就好了吗？input的样式不好写，那我们把他藏起来，给<code>label</code>写样式。</p>
<h4>方案二</h4>
<p><code>input[type=file]</code>左边是一个input右边是个按钮，其实是按钮的样式不好改，那么我们外面包裹一层<code>overlfow:hidden</code>，然后给input设置成一个极大，让他所有不一样的东西，都超出去，这样就是在能改动的区域改动了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端文件上传-javascript-ajax

## 原文链接
[https://segmentfault.com/a/1190000014234901](https://segmentfault.com/a/1190000014234901)


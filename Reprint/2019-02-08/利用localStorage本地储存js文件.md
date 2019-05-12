---
title: '利用localStorage本地储存js文件' 
date: 2019-02-08 2:30:41
hidden: true
slug: mo16qg273ab
categories: [reprint]
---

{{< raw >}}

                    
<p>利用localStorage储存js文件，只有在第一次访问该页面的时候加载js文件，以后在访问的时候加载本地localStorage执行</p>
<p>封装lsFile类   有url、filename（key前缀）、lname（key）、filetext（值）属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var lstorage = window.localStorage

function lsFile(url){
    this.url = url
    this.filename = url.substring(url.lastIndexOf(&quot;/&quot;)+1,url.lastIndexOf(&quot;.&quot;))
    //this.filename  = document.location.pathname
    this.lname     = 'Lsf_'+this.filename+'_'+url.substring(url.lastIndexOf(&quot;?&quot;)+1)
    this.filetext    = lstorage.getItem(this.lname)
    this.init()
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> lstorage = <span class="hljs-built_in">window</span>.localStorage

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">lsFile</span>(<span class="hljs-params">url</span>)</span>{
    <span class="hljs-keyword">this</span>.url = <span class="hljs-built_in">url</span>
    <span class="hljs-keyword">this</span>.filename = <span class="hljs-built_in">url</span>.substring(<span class="hljs-built_in">url</span>.lastIndexOf(<span class="hljs-string">"/"</span>)+<span class="hljs-number">1</span>,<span class="hljs-built_in">url</span>.lastIndexOf(<span class="hljs-string">"."</span>))
    <span class="hljs-comment">//this.filename  = document.location.pathname</span>
    <span class="hljs-keyword">this</span>.lname     = <span class="hljs-string">'Lsf_'</span>+<span class="hljs-keyword">this</span>.filename+<span class="hljs-string">'_'</span>+<span class="hljs-built_in">url</span>.substring(<span class="hljs-built_in">url</span>.lastIndexOf(<span class="hljs-string">"?"</span>)+<span class="hljs-number">1</span>)
    <span class="hljs-keyword">this</span>.filetext    = lstorage.getItem(<span class="hljs-keyword">this</span>.lname)
    <span class="hljs-keyword">this</span>.init()
}
</code></pre>
<p>首先判断本地localStorage有没有缓存文件，有的话直接getItem获取，通过eval执行，没有话通过执行ajax获取js文件内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lsFile.prototype.init = function(){
    if (this.filetext){
        this.eval(this.filetext)
    }else{
        this.xhr(this.url,this.runstr)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>lsFile.prototype.init = function(){
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.filetext){
        <span class="hljs-keyword">this</span>.eval(<span class="hljs-keyword">this</span>.filetext)
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.xhr(<span class="hljs-keyword">this</span>.url,<span class="hljs-keyword">this</span>.runstr)
    }
}
</code></pre>
<p>通过ajax采用同步的形式获取js内容，取得内容后，eval执行js文件的内容，setItem设置保存到localStorage中，再删除localStorage中上个版本的文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lsFile.prototype.runstr = function(filetext){
    this.eval(filetext)
    lstorage.setItem(this.lname,filetext)   
    this.removels()
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>lsFile.prototype.runstr = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(filetext)</span></span>{
    <span class="hljs-keyword">this</span>.eval(filetext)
    lstorage.setItem(<span class="hljs-keyword">this</span>.lname,filetext)   
    <span class="hljs-keyword">this</span>.removels()
}
</code></pre>
<p>ajax同步获取js文件内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lsFile.prototype.xhr = function(url,callback){
    var _this = this
    var version = url.substring(url.lastIndexOf(&quot;?&quot;))
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        switch(xhr.readyState){
            case 4:
                if(xhr.status==200){
                    var filetext = xhr.responseText
                    if(callback){
                        callback.call(_this,filetext)
                    }
                }else{
                    alert('加载失败')
                }
                break;
            default:
                break;
        }
    }
    xhr.open('GET',url,false);
    xhr.send();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>lsFile.prototype.xhr = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(url,<span class="hljs-keyword">callback</span>){
    <span class="hljs-keyword">var</span> _this = <span class="hljs-built_in">this</span>
    <span class="hljs-keyword">var</span> version = url.substring(url.lastIndexOf(<span class="hljs-string">"?"</span>))
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(){
        <span class="hljs-keyword">switch</span>(xhr.readyState){
            <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:<span class="hljs-type"></span>
                <span class="hljs-keyword">if</span>(xhr.status==<span class="hljs-number">200</span>){
                    <span class="hljs-keyword">var</span> filetext = xhr.responseText
                    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">callback</span>){
                        <span class="hljs-keyword">callback</span>.call(_this,filetext)
                    }
                }<span class="hljs-keyword">else</span>{
                    alert(<span class="hljs-string">'加载失败'</span>)
                }
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">default</span>:<span class="hljs-type"></span>
                <span class="hljs-keyword">break</span>;
        }
    }
    xhr.open(<span class="hljs-string">'GET'</span>,url,<span class="hljs-literal">false</span>);
    xhr.send();
}
</code></pre>
<p>删除localStorage中上个版本的文件方法，通过名字规则查找，除了当前设置的名字的之外有相同前缀的，通过removeItem删除。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lsFile.prototype.removels = function(){
    var arr = []
    for(var i=0;i<lstorage.length;i++){
        var name = lstorage.key(i);
        if(name.indexOf(this.filename) > -1 &amp;&amp; name != this.lname){
            arr.push(name)
        }
    }
    for(var i in arr){
        localStorage.removeItem(arr[i]);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>lsFile.prototype.removels = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> arr = []
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;lstorage.length;i++){
        <span class="hljs-keyword">var</span> name = lstorage.key(i);
        <span class="hljs-keyword">if</span>(name.indexOf(<span class="hljs-keyword">this</span>.filename) &gt; <span class="hljs-number">-1</span> &amp;&amp; name != <span class="hljs-keyword">this</span>.lname){
            arr.push(name)
        }
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> arr){
        localStorage.removeItem(arr[i]);
    }
}
</code></pre>
<p>使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lsFile('/demo/lsfile/zepto.js?20150620')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">lsFile</span><span class="hljs-params">(<span class="hljs-string">'/demo/lsfile/zepto.js?20150620'</span>)</span></span>
</code></pre>
<p>移动端webapp使用<br>兼容性好<br>网速慢，LS读取+eval大多数情况下快于304<br>浏览器缓存经常会被清理，localStorage被清理的几率低一些</p>
<p>以下是完整代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!function(w){
    'use strict'

    var lstorage = window.localStorage
    
    function lsFile(url){
        this.url = url
        this.filename = url.substring(url.lastIndexOf(&quot;/&quot;)+1,url.lastIndexOf(&quot;.&quot;))
        //this.filename  = document.location.pathname
        this.lname     = 'Lsf_'+this.filename+'_'+url.substring(url.lastIndexOf(&quot;?&quot;)+1)
        this.filetext    = lstorage.getItem(this.lname)
        this.init()
    }

    lsFile.prototype.init = function(){
        if (this.filetext){
            this.eval(this.filetext)
        }else{
            this.xhr(this.url,this.runstr)
        }
    }

    lsFile.prototype.xhr = function(url,callback){
        var _this = this
        var version = url.substring(url.lastIndexOf(&quot;?&quot;))
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            switch(xhr.readyState){
                case 4:
                    if(xhr.status==200){
                        var filetext = xhr.responseText
                        if(callback){
                            callback.call(_this,filetext)
                        }
                    }else{
                        alert('加载失败')
                    }
                    break;
                default:
                    break;
            }
        }
        xhr.open('GET',url,false);
        xhr.send();
    }

    lsFile.prototype.runstr = function(filetext){
        this.eval(filetext)
        lstorage.setItem(this.lname,filetext);
        this.removels()
    }

    lsFile.prototype.removels = function(){
        var arr = []
        for(var i=0;i<lstorage.length;i++){
            var name = lstorage.key(i);
            if(name.indexOf(this.filename) > -1 &amp;&amp; name != this.lname){
                arr.push(name)
            }
        }
        for(var i in arr){
            localStorage.removeItem(arr[i]);
        }
    }
    
    lsFile.prototype.eval = function(filetext){
        window.eval(filetext)
    }

    w.lsFile = function (url){
        return new lsFile(url)
    }
}(window)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>!<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">w</span>)</span>{
<span class="hljs-meta">    'use strict'</span>

    <span class="hljs-keyword">var</span> lstorage = <span class="hljs-built_in">window</span>.localStorage
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">lsFile</span>(<span class="hljs-params">url</span>)</span>{
        <span class="hljs-keyword">this</span>.url = url
        <span class="hljs-keyword">this</span>.filename = url.substring(url.lastIndexOf(<span class="hljs-string">"/"</span>)+<span class="hljs-number">1</span>,url.lastIndexOf(<span class="hljs-string">"."</span>))
        <span class="hljs-comment">//this.filename  = document.location.pathname</span>
        <span class="hljs-keyword">this</span>.lname     = <span class="hljs-string">'Lsf_'</span>+<span class="hljs-keyword">this</span>.filename+<span class="hljs-string">'_'</span>+url.substring(url.lastIndexOf(<span class="hljs-string">"?"</span>)+<span class="hljs-number">1</span>)
        <span class="hljs-keyword">this</span>.filetext    = lstorage.getItem(<span class="hljs-keyword">this</span>.lname)
        <span class="hljs-keyword">this</span>.init()
    }

    lsFile.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.filetext){
            <span class="hljs-keyword">this</span>.eval(<span class="hljs-keyword">this</span>.filetext)
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">this</span>.xhr(<span class="hljs-keyword">this</span>.url,<span class="hljs-keyword">this</span>.runstr)
        }
    }

    lsFile.prototype.xhr = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url,callback</span>)</span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>
        <span class="hljs-keyword">var</span> version = url.substring(url.lastIndexOf(<span class="hljs-string">"?"</span>))
        <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
        xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">switch</span>(xhr.readyState){
                <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
                    <span class="hljs-keyword">if</span>(xhr.status==<span class="hljs-number">200</span>){
                        <span class="hljs-keyword">var</span> filetext = xhr.responseText
                        <span class="hljs-keyword">if</span>(callback){
                            callback.call(_this,filetext)
                        }
                    }<span class="hljs-keyword">else</span>{
                        alert(<span class="hljs-string">'加载失败'</span>)
                    }
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">default</span>:
                    <span class="hljs-keyword">break</span>;
            }
        }
        xhr.open(<span class="hljs-string">'GET'</span>,url,<span class="hljs-literal">false</span>);
        xhr.send();
    }

    lsFile.prototype.runstr = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">filetext</span>)</span>{
        <span class="hljs-keyword">this</span>.eval(filetext)
        lstorage.setItem(<span class="hljs-keyword">this</span>.lname,filetext);
        <span class="hljs-keyword">this</span>.removels()
    }

    lsFile.prototype.removels = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> arr = []
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;lstorage.length;i++){
            <span class="hljs-keyword">var</span> name = lstorage.key(i);
            <span class="hljs-keyword">if</span>(name.indexOf(<span class="hljs-keyword">this</span>.filename) &gt; <span class="hljs-number">-1</span> &amp;&amp; name != <span class="hljs-keyword">this</span>.lname){
                arr.push(name)
            }
        }
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> arr){
            localStorage.removeItem(arr[i]);
        }
    }
    
    lsFile.prototype.eval = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">filetext</span>)</span>{
        <span class="hljs-built_in">window</span>.eval(filetext)
    }

    w.lsFile = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">url</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> lsFile(url)
    }
}(<span class="hljs-built_in">window</span>)
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用localStorage本地储存js文件

## 原文链接
[https://segmentfault.com/a/1190000005770330](https://segmentfault.com/a/1190000005770330)


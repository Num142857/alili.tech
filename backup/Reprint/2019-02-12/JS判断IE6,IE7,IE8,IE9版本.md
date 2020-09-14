---
title: 'JS判断IE6,IE7,IE8,IE9版本' 
date: 2019-02-12 2:30:12
hidden: true
slug: r2lmphjeb1g
categories: [reprint]
---

{{< raw >}}

                    
<p>参考：<br><a href="http://www.5ycode.com/article/353.html" rel="nofollow noreferrer" target="_blank">用 Javascript 判断 IE 版本号支持IE6,IE7,IE8,IE9,IE10,IE11 </a><br><a href="https://github.com/nioteam/jquery-plugins/issues/12" rel="nofollow noreferrer" target="_blank">JavaScript判断IE各版本最完美解决方案</a><br><a href="http://www.jb51.net/article/40263.htm" rel="nofollow noreferrer" target="_blank">JS代码判断IE6,IE7,IE8,IE9的函数代码</a></p>
<p>判断是否为IE：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        function isIe() {
            return window.ActiveXObject ? true : false;
        }

        if (isIe()) {
            //do something

        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>        <span class="hljs-keyword">function</span> <span class="hljs-title">isIe</span>() {
            <span class="hljs-keyword">return</span> <span class="hljs-type">window.ActiveXObject</span> ? <span class="hljs-literal">true</span> : <span class="hljs-type">false</span>;
        }

        <span class="hljs-keyword">if</span> (isIe()) {
            //<span class="hljs-keyword">do</span> something

        }</code></pre>
<p>检测IE版本号:<br>将版本号提取成参数，就能生成一个通用的检测IE版本,代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        var is_IE = function (ver) {
            var b = document.createElement('b')
            b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
            return b.getElementsByTagName('i').length === 1
        }


        if(isIE(6)){
            // IE 6
        }
        // ...
        if(isIE(9)){
            // IE 9
        }

        if (is_IE(5) || is_IE(6) || is_IE(7) || is_IE(8)) {
            //do something
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>        var <span class="hljs-keyword">is</span><span class="hljs-number">_</span>IE = <span class="hljs-keyword">function</span> (ver) {
            var b = document.createElement(<span class="hljs-string">'b'</span>)
            b.innerHTML = <span class="hljs-string">'&lt;!--[if IE '</span> + ver + <span class="hljs-string">']&gt;&lt;i&gt;&lt;/i&gt;&lt;![endif]--&gt;'</span>
            <span class="hljs-keyword">return</span> b.getElementsByTagName(<span class="hljs-string">'i'</span>).length === <span class="hljs-number">1</span>
        }


        <span class="hljs-keyword">if</span>(isIE(<span class="hljs-number">6</span>)){
            <span class="hljs-comment">// IE 6</span>
        }
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">if</span>(isIE(<span class="hljs-number">9</span>)){
            <span class="hljs-comment">// IE 9</span>
        }

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">is</span><span class="hljs-number">_</span>IE(<span class="hljs-number">5</span>) || <span class="hljs-keyword">is</span><span class="hljs-number">_</span>IE(<span class="hljs-number">6</span>) || <span class="hljs-keyword">is</span><span class="hljs-number">_</span>IE(<span class="hljs-number">7</span>) || <span class="hljs-keyword">is</span><span class="hljs-number">_</span>IE(<span class="hljs-number">8</span>)) {
            <span class="hljs-comment">//do something</span>
        }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS判断IE6,IE7,IE8,IE9版本

## 原文链接
[https://segmentfault.com/a/1190000004869393](https://segmentfault.com/a/1190000004869393)


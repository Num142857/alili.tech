---
title: 'web安全三，XSS攻击' 
date: 2018-12-12 2:30:10
hidden: true
slug: q3nc82slxqp
categories: [reprint]
---

{{< raw >}}

                    
<p>上文说完了CSRF攻击，本文继续研究它的兄弟XSS攻击。</p>
<h2 id="articleHeader0">什么是XSS攻击</h2>
<p>XSS攻击全名（Cross-Site-Script）跨域脚本攻击，为了跟CSS（Cascading-Style-Sheet）区分开来，所以缩写是XSS。</p>
<h2 id="articleHeader1">XSS攻击的原理</h2>
<p>上一节说道的CSRF攻击是利用的是“伪请求”，这一节的XSS的原理是利用脚本注入的方式。<br>主要是依靠一切可能的手段，将浏览器中可以执行的脚本(javascript)植入到页面代码中，从而获取用户cookie甚至账号密码等敏感数据使用户造成的一定的损失。<br>通常利用的是目标网站的发帖、发布产品等需要用户输入的地方，将脚本混淆到html输入中，上传到服务器，再诱导别的用户打开此页面，执行脚本的一个过程。</p>
<h2 id="articleHeader2">XSS攻击的方法</h2>
<p>xss漏洞是对web客户端（浏览器）的攻击，所以说植入的代码基本上以javascript和html标签(有时也有结合css样式的xss向量)为主。<br>一般有四种方法：</p>
<ol>
<li>页面标签附带脚本</li>
<li>Dom 属性附带脚本</li>
<li>请求地址附带脚本</li>
<li>回车空格突破过滤限制</li>
</ol>
<p>举两个小李子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>alert('xss')</script>

<img scr=1 onerror=alert('xss')>

<a href=javascrip:alert('xss')>s</a>

<iframe src=javascript:alert('xss');height=0 width=0 />

<img src=x onerror=appendChild(createElement('script')).src='js_url' />

<img src = “#”/**/onerror = alert(/XSS/)>
<img src = j
ava script :a ler t(/xss/)>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">alert(<span class="hljs-string">'xss'</span>)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">scr</span>=<span class="hljs-string">1</span> <span class="hljs-attr">onerror</span>=<span class="hljs-string">alert(</span>'<span class="hljs-attr">xss</span>')&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">javascrip:alert(</span>'<span class="hljs-attr">xss</span>')&gt;</span>s<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">src</span>=<span class="hljs-string">javascript:alert(</span>'<span class="hljs-attr">xss</span>');<span class="hljs-attr">height</span>=<span class="hljs-string">0</span> <span class="hljs-attr">width</span>=<span class="hljs-string">0</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">x</span> <span class="hljs-attr">onerror</span>=<span class="hljs-string">appendChild(createElement(</span>'<span class="hljs-attr">script</span>'))<span class="hljs-attr">.src</span>=<span class="hljs-string">'js_url'</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span> = <span class="hljs-string">“#”/**/onerror</span> = <span class="hljs-string">alert(/XSS/)</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span> = <span class="hljs-string">j</span>
<span class="hljs-attr">ava</span> <span class="hljs-attr">script</span> <span class="hljs-attr">:a</span> <span class="hljs-attr">ler</span> <span class="hljs-attr">t</span>(/<span class="hljs-attr">xss</span>/)&gt;</span></code></pre>
<h2 id="articleHeader3">XSS攻击防御的手段</h2>
<p>因为XSS的根本就是向网站插入脚本代码，并使它运行的一种手段。防御方法分为两种，服务端防御和客户端防御。<br>服务端防御：<br><strong>1. HttpOnly</strong><br>可以限制javascript不能读取cookie，防止会话ID泄露<br><strong>2.处理富文本</strong><br>过滤掉富文本中的敏感标签如（script、iframe、form），还有敏感词（javascript:） 等等<br>客户端防御：<br><strong>1. 输入检查</strong><br>防止输入敏感字段，如<code>javascript、cookie</code>等等<br><strong>2. 检查输出</strong><br>脚本都是通过混淆在HTML当中，被当成html代码的一部分才得到执行。<br>可以通过编码转义的办法，使得混淆在其中的脚本被当成文本处理，不会被执行。<br>编码转义的话，有三种方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*1.  HTML encode*
    将字符转换成HTMLEntities，一般会转（&amp;、<、>、&quot;、'、/）这6个字符。一般是在html标签属性输出的时候使用
*2.  JavaScriptEncode*
    使用”\“对特殊字符进行转义。
    一般在script标签输出、事件输出、CSS输出
*3.  URL Encode*
    使用URLEncode的方法。
    

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-strong">*1.  HTML encode*</span>
<span class="hljs-code">    将字符转换成HTMLEntities，一般会转（&amp;、&lt;、&gt;、"、'、/）这6个字符。一般是在html标签属性输出的时候使用</span>
<span class="hljs-strong">*2.  JavaScriptEncode*</span>
<span class="hljs-code">    使用”\“对特殊字符进行转义。</span>
<span class="hljs-code">    一般在script标签输出、事件输出、CSS输出</span>
<span class="hljs-strong">*3.  URL Encode*</span>
<span class="hljs-code">    使用URLEncode的方法。</span>
<span class="hljs-code">    </span>

</code></pre>
<p>参考：<br><a href="http://www.freebuf.com/articles/web/40520.html" rel="nofollow noreferrer" target="_blank">XSS的原理分析与解剖</a><br><a href="http://blog.csdn.net/guugle2010/article/details/51108789" rel="nofollow noreferrer" target="_blank">跨站脚本攻击（XSS）——常见网站攻击手段原理与防御</a><br><a href="http://blog.csdn.net/ghsau/article/details/17027893" rel="nofollow noreferrer" target="_blank">XSS攻击及防御</a><br><a href="http://www.cnblogs.com/lovesong/p/5223989.html" rel="nofollow noreferrer" target="_blank">XSS攻击的解决方法</a></p>
<p><strong>【相关】</strong><br>web安全，是一个很重要的技能，也是一个领域的知识。我把这个领域的东西写成了一个系列，以后还会继续完善下去：<br><a href="https://segmentfault.com/a/1190000013440449">web安全一：同源策略与跨域</a><br><a href="https://segmentfault.com/a/1190000013440532" target="_blank">web安全二：CSRF 攻击</a><br><a href="https://segmentfault.com/a/1190000013440764">web安全三：XSS 攻击</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
web安全三，XSS攻击

## 原文链接
[https://segmentfault.com/a/1190000013440764](https://segmentfault.com/a/1190000013440764)


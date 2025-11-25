---
title: '如何防范XSS和CSRF？' 
date: 2019-01-30 2:30:23
hidden: true
slug: fwwyzh4zy2
categories: [reprint]
---

{{< raw >}}

                    
<p>距离上一次介绍XSS与CSRF已经过去了漫长了两个月，工作较忙，文章姗姗来迟。<br>小小回顾一下究竟什么是XSS和CSRF：<a href="https://segmentfault.com/a/1190000007059639">https://segmentfault.com/a/11...</a> 《用大白话谈谈XSS与CSRF》。</p>
<p>那么，我们来谈谈如何防范它。<br>CSRF依赖于XSS，防住XSS基本也就防住了CSRF让我们明确我们的目的，其实就是不让用户踏入XSS的坑，那我们有两个方法防止用户入坑，一个是对外部输入进行彻彻底底的敏感字符过滤，一个是在显示的时候做一些特殊处理不让敏感代码顺利执行。<br>前者主要由前端与后端合力完成，后者的话通常就是由前端单独去完成的。</p>
<p>理论上只要有输入数据入口的地方，XSS漏洞就会存在，js代码可以由各种各样的模式注入到数据库中（明文或者编码），所以在中小项目中我们先明确一个意识即可，我们开发人员要有安全处理的意识，不求百分百的过滤掉非法字符，但是基本的，常见的过滤掉即可，剩下的就交给安全工程师去做吧。</p>
<p>中心思想：一切的一切外部来源数据，毕竟经过我们服务端代码的过滤，才能让他展示到页面上，也就是说，一切外部数据都是非法的，一定要做好过滤，尤其是WEB端。（毕竟各种js防不胜防）。<br>所以像以下这种直接把页面掌控权交给了用户的代码，是绝对不能写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
$name = $_GET[&quot;name&quot;];
$name = htmlspecialchars($name);
?>
<input type='text' value='<?php echo $name?>'>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
$name = $_GET[<span class="hljs-string">"name"</span>];
$name = htmlspecialchars($name);
<span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'&lt;?php echo $name?&gt;'</span>&gt;</span>
</code></pre>
<p>下面的案例用世界上最好的语言来演示：</p>
<p>非法字符有两类，明文：&lt;script&gt;alert('我是xss，你有麻烦了')&lt;/script&gt;，这样的明文传到服务端，如果让他就这么入库的话，我们的数据库就被XSS注入了，所以我们需要对明文的很好过滤，htmlspecialchars后即可把script标签过滤成安全字符 &lt;script&gt; ，那么明文的可以简单的就过滤掉了。</p>
<p>明文易档，编码难防，</p>
<p>编码：<code>u0026u006cu0074u003bu0073u0063u0072u0069u0070u0074u0026u0067u0074u003bu0061u006cu0065u0072u0074u0028u0026u0023u0033u0039u003bu6211u662fu0078u0073u0073uff0cu4f60u6709u9ebbu70e6u4e86u0026u0023u0033u0039u003bu0029u0026u006cu0074u003bu002fu0073u0063u0072u0069u0070u0074u0026u0067u0074u003b</code></p>
<p>如果不怀好意的人不用明文，却用这种unicode方式，那么轻而易举就可以越过htmlspecialchars的防守，然后入库，然后展示的时候html编码会将这种unicode自动转回明文（也就是变成真实的注入代码），危害就来了！</p>
<p>同比类推，既然unicode可以充当注入的工具，那么其他编码我相信也是可以的。所以在这里也强调一下尽量将页面的字符编码设置为unicode（utf-8），然后我们统一处理unicode编码注入和明文注入的情况就好<br>以上注入代码只是简单的注入并不会有实质危害，但是如果是类似于document.cookie这类获取隐私cookie，然后把这段cookie发送到外部服务器存储起来，那么在这段cookie的有效期内，我可以直接拿这份cookie去登录账号了！</p>
<p>如何防范以上这些恐怖的事情呢？回来开头我说的，输入过滤，输出过滤：<br> 看到了在 <a href="/u/moonlord">@月之领主LM</a> 在他的问题中已经总结了，那我就直接站在巨人的肩膀上吧！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="PHP直接输出html的，可以采用以下的方法进行过滤：

1.htmlspecialchars函数
2.htmlentities函数
3.HTMLPurifier.auto.php插件
4.RemoveXss函数（百度可以查到）

PHP输出到JS代码中，或者开发Json API的，则需要前端在JS中进行过滤：

1.尽量使用innerText(IE)和textContent(Firefox),也就是jQuery的text()来输出文本内容
2.必须要用innerHTML等等函数，则需要做类似php的htmlspecialchars的过滤（参照@eechen的答案）

其它的通用的补充性防御手段

1.在输出html时，加上Content Security Policy的Http Header
（作用：可以防止页面被XSS攻击时，嵌入第三方的脚本文件等）
（缺陷：IE或低版本的浏览器可能不支持）
2.在设置Cookie时，加上HttpOnly参数
（作用：可以防止页面被XSS攻击时，Cookie信息被盗取，可兼容至IE6）
（缺陷：网站本身的JS代码也无法操作Cookie，而且作用有限，只能保证Cookie的安全）
3.在开发API时，检验请求的Referer参数
（作用：可以在一定程度上防止CSRF攻击）
（缺陷：IE或低版本的浏览器中，Referer参数可以被伪造）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>PHP直接输出html的，可以采用以下的方法进行过滤：

<span class="hljs-number">1.</span>htmlspecialchars函数
<span class="hljs-number">2.</span>htmlentities函数
<span class="hljs-number">3.</span>HTMLPurifier.auto.php插件
<span class="hljs-number">4.</span>RemoveXss函数（百度可以查到）

PHP输出到JS代码中，或者开发Json API的，则需要前端在JS中进行过滤：

<span class="hljs-number">1.</span>尽量使用innerText(IE)和textContent(Firefox),也就是jQuery的text()来输出文本内容
<span class="hljs-number">2.</span>必须要用innerHTML等等函数，则需要做类似php的htmlspecialchars的过滤（参照@eechen的答案）

其它的通用的补充性防御手段

<span class="hljs-number">1.</span>在输出html时，加上Content Security Policy的Http Header
（作用：可以防止页面被XSS攻击时，嵌入第三方的脚本文件等）
（缺陷：IE或低版本的浏览器可能不支持）
<span class="hljs-number">2.</span>在设置Cookie时，加上HttpOnly参数
（作用：可以防止页面被XSS攻击时，Cookie信息被盗取，可兼容至IE6）
（缺陷：网站本身的JS代码也无法操作Cookie，而且作用有限，只能保证Cookie的安全）
<span class="hljs-number">3.</span>在开发API时，检验请求的Referer参数
（作用：可以在一定程度上防止CSRF攻击）
（缺陷：IE或低版本的浏览器中，Referer参数可以被伪造）
</code></pre>
<p>当然，这一块的安全处理也只能处理冰山一角，我相信还是有其他方式可以进行xss注入攻击的，但是实际上作为开发人员我认为，我们只要拦截了大部分常见攻击即可了。</p>
<p>日常开发中需要带有安全意识，WEB端或者APP服务端都不信任外部的任何输入，任何！</p>
<p>参考文章 ：</p>
<p><a href="https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet" rel="nofollow noreferrer" target="_blank">https://www.owasp.org/index.p...</a>《XSS (Cross Site Scripting) Prevention Cheat Sheet 》</p>
<p><a href="http://www.cnblogs.com/yangxiaolan/p/5784266.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/yangxi...</a>《【前端安全】JavaScript防http劫持与XSS》<br><a href="https://segmentfault.com/q/1010000004067521">https://segmentfault.com/q/10...</a>《PHP的防御XSS注入的终极解决方案【信息安全】【Hack】》</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何防范XSS和CSRF？

## 原文链接
[https://segmentfault.com/a/1190000007766732](https://segmentfault.com/a/1190000007766732)


---
title: '浏览器唤起qq进行聊天的一些坑和解决方案 - 小裂变' 
date: 2019-02-03 2:30:39
hidden: true
slug: 7a09vdir0qo
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="小裂变-微信生态用户裂变增长专家
小裂变官网：www.xiaoliebian.com
首创微信生态一体化裂变运营，公众号裂变、小程序裂变、社群裂变、个人号裂变" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>小裂变-微信生态用户裂变增长专家
小裂变官网：www<span class="hljs-selector-class">.xiaoliebian</span><span class="hljs-selector-class">.com</span>
首创微信生态一体化裂变运营，公众号裂变、小程序裂变、社群裂变、个人号裂变</code></pre>
<h4><strong>说明</strong></h4>
<p>从浏览器唤起QQ进行聊天，是很多公司或者企业会用到的一种客服方式，然而很多时候，一些手机端浏览器并不支持直接跳转到QQ，或者不支持从App内嵌的网页中跳转到QQ页面。</p>
<h4><strong>正文</strong></h4>
<p>针对跳转唤起QQ，QQ推广的官方网站<a href="http://shang.qq.com/v3/index.html%E4%B8%BA%E4%BB%8E%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%AD%E5%94%A4%E8%B5%B7qq%E6%8F%90%E4%BE%9B%E4%BA%86%E6%94%AF%E6%8C%81" rel="nofollow noreferrer" target="_blank">http://shang.qq.com/v3/index....</a>，只需要扫描登录需要被唤起的QQ号，就可以生成一段代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a target=&quot;_blank&quot; href=&quot;http://wpa.qq.com/msgrd?v=3&amp;uin=123456789&amp;site=qq&amp;menu=yes&quot;>
<img border=&quot;0&quot; src=&quot;http://wpa.qq.com/pa?p=2:123456789:52&quot; alt=&quot;点击这里给我发消息&quot; title=&quot;点击这里给我发消息&quot;/>
</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">a</span> target=<span class="hljs-string">"_blank"</span> href=<span class="hljs-string">"http://wpa.qq.com/msgrd?v=3&amp;uin=123456789&amp;site=qq&amp;menu=yes"</span>&gt;
&lt;<span class="hljs-selector-tag">img</span> <span class="hljs-attribute">border</span>=<span class="hljs-string">"0"</span> src=<span class="hljs-string">"http://wpa.qq.com/pa?p=2:123456789:52"</span> alt=<span class="hljs-string">"点击这里给我发消息"</span> title=<span class="hljs-string">"点击这里给我发消息"</span>/&gt;
&lt;/a&gt;</code></pre>
<p>这里的数字“123456789”就是需要被唤起的QQ号码。</p>
<p>应用这种方式，可以在大部分的浏览器中唤起QQ客户端，并定位到聊天页面，只是以下几种情况中这种方式会失效：</p>
<ol>
<li>苹果手机自带的 Safari 浏览器会提示是否在AppStore中打开链接，如果选择是就会直接跳转到App Store 中，然后才能跳转到QQ，但是两次跳转会丢失参数，导致不能打开需要聊天的对象。</li>
<li>在手机端Google浏览器中也会存在类似于 1 中的情况</li>
<li>网页内嵌到自开发的App中，需要唤起QQ时也会出现类似与 1 的情况。</li>
</ol>
<p>由于Safari浏览器在苹果手机端使用率很高，应业务需求，就不得不为它找一种另外的方式。</p>
<p>通过了解，发现app之间的联系可以通过一种叫做深度链接的技术解决，所谓的深度链接就是绕过网站的首页直接链接道分页的一种链接技术，具体想要了解的可以看看LinkedMe上的一片博文<a href="https://www.linkedme.cc/blog/square/57b2aa9f7bb8224e4c3f140a" rel="nofollow noreferrer" target="_blank">https://www.linkedme.cc/blog/...</a>。</p>
<p>深度链接中的一个解决方案就是定义一个新的URL Scheme ,这个URL Scheme可以通过特定的URI方式传递参数给另一个APP，从而改变App之间独立不通信的局面。</p>
<p>单独说倒唤起QQ，或者解决Safari浏览器不能唤起QQ的问题，可以使用如下的URI：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mqqwpa://im/chat？chat_type=wpa&amp;uin=123456789&amp;version=1&amp;src_type=web&amp;web_src=oicqzone.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">mqqwp<span class="hljs-variable">a:</span>//<span class="hljs-keyword">im</span>/chat？chat_type=wpa&amp;uin=<span class="hljs-number">123456789</span>&amp;<span class="hljs-keyword">version</span>=<span class="hljs-number">1</span>&amp;src_type=web&amp;web_src=oicqzone.<span class="hljs-keyword">com</span></code></pre>
<p>其中数字“123456789”同样的是需要被唤起的QQ。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a target=&quot;_blank&quot; href=&quot;mqqwpa://im/chat?chat_type=wpa&amp;uin=123456789&amp;version=1&amp;src_type=web&amp;web_src=oicqzone.com&quot;>
 123456789
</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;a target="_blank" href="mqqwpa://im/chat?chat_type=wpa<span class="hljs-variable">&amp;uin</span>=<span class="hljs-number">123456789</span><span class="hljs-variable">&amp;version</span>=<span class="hljs-number">1</span><span class="hljs-variable">&amp;src_type</span>=web<span class="hljs-variable">&amp;web_src</span>=oicqzone.com"&gt;</span>
 <span class="hljs-number">123456789</span>
<span class="hljs-params">&lt;/a&gt;</span></code></pre>
<p>通过多次测试，我整理出如下手机端浏览器唤起QQ的各种不同情况（其中no代表测试不成功，ok代表测试成功）：</p>
<p><span class="img-wrap"><img data-src="/img/bVDwx4?w=874&amp;h=454" src="https://static.alili.tech/img/bVDwx4?w=874&amp;h=454" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这里需要提到一点，将URL Scheme 的方案用于电脑的各种浏览器从而去唤起QQ是不起任何效果，因为URL Scheme是专门为解决APP之间孤立的情况而提出来的，并不适用于电脑应用，但是在电脑端可以使用QQ推广给出的的方案。</p>
<p>知道了如何解决App跳转到QQ的方法，但是很多时候我们希望有一种通用的办法可以解决上述几种情况，保证在大多数浏览器（包括电脑浏览器）只需要一套代码就可以解决问题。</p>
<p>我个人通过判断浏览器的userAgent区分手机端浏览器还是电脑端浏览器，然后为它们分别提供不同的方案：</p>
<p><code>HTML代码</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;javascript:void(0)&quot; data-qq='qq'>111111111111</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span> <span class="hljs-attr">data-qq</span>=<span class="hljs-string">'qq'</span>&gt;</span>111111111111<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p><code>JavaScript代码</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function () {

    var as = document.getElementsByTagName('a');

    var kefu101 = &quot;http://wpa.qq.com/msgrd?v=3&amp;uin=381232999&amp;site=oicqzone.com&amp;menu=yes&quot;;
    var kefu102 = &quot;mqqwpa://im/chat?chat_type=wpa&amp;uin=381232999&amp;version=1&amp;src_type=web&amp;web_src=oicqzone.com&quot;;

    for (var i = 0, len = a.length; i < len; i++) {

        if (as[i].hasAttribute('data-qq')) {

            as[i].onclick = (function (i) {

                return function (e) {

                    var kefu = e.target ? e.target.getAttribute('data-qq') : e.srcElement.getAttribute('data-qq');

                    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {

                        window.open(kefu102);
                    }else {
window.open(kefu101);
                    }
                }
            })(i);
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

    <span class="hljs-keyword">var</span> <span class="hljs-keyword">as</span> = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'a'</span>);

    <span class="hljs-keyword">var</span> kefu101 = <span class="hljs-string">"http://wpa.qq.com/msgrd?v=3&amp;uin=381232999&amp;site=oicqzone.com&amp;menu=yes"</span>;
    <span class="hljs-keyword">var</span> kefu102 = <span class="hljs-string">"mqqwpa://im/chat?chat_type=wpa&amp;uin=381232999&amp;version=1&amp;src_type=web&amp;web_src=oicqzone.com"</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = a.length; i &lt; len; i++) {

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">as</span>[i].hasAttribute(<span class="hljs-string">'data-qq'</span>)) {

            <span class="hljs-keyword">as</span>[i].onclick = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i</span>) </span>{

                <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{

                    <span class="hljs-keyword">var</span> kefu = e.target ? e.target.getAttribute(<span class="hljs-string">'data-qq'</span>) : e.srcElement.getAttribute(<span class="hljs-string">'data-qq'</span>);

                    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/(iPhone|iPad|iPod|iOS)/i</span>.test(navigator.userAgent) || <span class="hljs-regexp">/(Android)/i</span>.test(navigator.userAgent)) {

                        <span class="hljs-built_in">window</span>.open(kefu102);
                    }<span class="hljs-keyword">else</span> {
<span class="hljs-built_in">window</span>.open(kefu101);
                    }
                }
            })(i);
        }
    }
};</code></pre>
<p>这套方案中，手机端使用URL Scheme，电脑端使用QQ推广的方案。</p>
<p>个人微信：zmx119966（欢迎来交流）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浏览器唤起qq进行聊天的一些坑和解决方案 - 小裂变

## 原文链接
[https://segmentfault.com/a/1190000006997572](https://segmentfault.com/a/1190000006997572)


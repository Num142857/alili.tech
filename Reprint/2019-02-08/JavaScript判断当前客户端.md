---
title: 'JavaScript判断当前客户端' 
date: 2019-02-08 2:30:41
hidden: true
slug: dn63hqg0orn
categories: [reprint]
---

{{< raw >}}

                    
<p>javascript文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <script type=&quot;text/javascript&quot;>
        //判断访问终端
        var browser={
            versions:function(){
                var u = navigator.userAgent, app = navigator.appVersion;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 &amp;&amp; u.indexOf('KHTML') == -1,//火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                    weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                    qq: u.match(/\sQQ/i) == &quot; qq&quot; //是否QQ
                };
            }(),
            language:(navigator.browserLanguage || navigator.language).toLowerCase()
        }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    &lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;
        <span class="hljs-comment">//判断访问终端</span>
        <span class="hljs-keyword">var</span> browser={
            <span class="hljs-attr">versions</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">var</span> u = navigator.userAgent, app = navigator.appVersion;
                <span class="hljs-keyword">return</span> {
                    <span class="hljs-attr">trident</span>: u.indexOf(<span class="hljs-string">'Trident'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//IE内核</span>
                    presto: u.indexOf(<span class="hljs-string">'Presto'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//opera内核</span>
                    webKit: u.indexOf(<span class="hljs-string">'AppleWebKit'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//苹果、谷歌内核</span>
                    gecko: u.indexOf(<span class="hljs-string">'Gecko'</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; u.indexOf(<span class="hljs-string">'KHTML'</span>) == <span class="hljs-number">-1</span>,<span class="hljs-comment">//火狐内核</span>
                    mobile: !!u.match(<span class="hljs-regexp">/AppleWebKit.*Mobile.*/</span>), <span class="hljs-comment">//是否为移动终端</span>
                    ios: !!u.match(<span class="hljs-regexp">/\(i[^;]+;( U;)? CPU.+Mac OS X/</span>), <span class="hljs-comment">//ios终端</span>
                    android: u.indexOf(<span class="hljs-string">'Android'</span>) &gt; <span class="hljs-number">-1</span> || u.indexOf(<span class="hljs-string">'Linux'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//android终端或者uc浏览器</span>
                    iPhone: u.indexOf(<span class="hljs-string">'iPhone'</span>) &gt; <span class="hljs-number">-1</span> , <span class="hljs-comment">//是否为iPhone或者QQHD浏览器</span>
                    iPad: u.indexOf(<span class="hljs-string">'iPad'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否iPad</span>
                    webApp: u.indexOf(<span class="hljs-string">'Safari'</span>) == <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否web应该程序，没有头部与底部</span>
                    weixin: u.indexOf(<span class="hljs-string">'MicroMessenger'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否微信 （2015-01-22新增）</span>
                    qq: u.match(<span class="hljs-regexp">/\sQQ/i</span>) == <span class="hljs-string">" qq"</span> <span class="hljs-comment">//是否QQ</span>
                };
            }(),
            <span class="hljs-attr">language</span>:(navigator.browserLanguage || navigator.language).toLowerCase()
        }
    &lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>使用方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//判断是否IE内核
if(browser.versions.trident){ alert(&quot;is IE&quot;); }
//判断是否webKit内核
if(browser.versions.webKit){ alert(&quot;is webKit&quot;); }
//判断是否移动端
if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ alert(&quot;移动端&quot;); }
检测浏览器语言
 
currentLang = navigator.language;   //判断除IE外其他浏览器使用语言
if(!currentLang){//判断IE浏览器使用语言
    currentLang = navigator.browserLanguage;
}
alert(currentLang);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//判断是否IE内核</span>
<span class="hljs-keyword">if</span>(browser.versions.trident){ alert(<span class="hljs-string">"is IE"</span>); }
<span class="hljs-comment">//判断是否webKit内核</span>
<span class="hljs-keyword">if</span>(browser.versions.webKit){ alert(<span class="hljs-string">"is webKit"</span>); }
<span class="hljs-comment">//判断是否移动端</span>
<span class="hljs-keyword">if</span>(browser.versions.mobile||browser.versions.android||browser.versions.ios){ alert(<span class="hljs-string">"移动端"</span>); }
检测浏览器语言
 
currentLang = navigator.language;   <span class="hljs-comment">//判断除IE外其他浏览器使用语言</span>
<span class="hljs-keyword">if</span>(!currentLang){<span class="hljs-comment">//判断IE浏览器使用语言</span>
    currentLang = navigator.browserLanguage;
}
alert(currentLang);</code></pre>
<p>转载自:<a href="http://www.2cto.com/weixin/201506/404209.html" rel="nofollow noreferrer" target="_blank">http://www.2cto.com/weixin/201506/404209.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript判断当前客户端

## 原文链接
[https://segmentfault.com/a/1190000005783538](https://segmentfault.com/a/1190000005783538)


---
title: '解决各种情况下的iframe高度自适应内容' 
date: 2018-12-29 2:30:10
hidden: true
slug: znl2caoziq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JS自适应高度，其实就是设置iframe的高度，使其等于内嵌网页的高度，从而看不出来滚动条和嵌套痕迹。对于用户体验和网站美观起着重要作用。<br>如果内容是固定的，那么我们可以通过CSS来给它直接定义一个高度，同样可以实现上面的需求。当内容是未知或者是变化的时候。这个时候又有几种情况了。</p></blockquote>
<h2 id="articleHeader0">iframe内容未知，高度可预测</h2>
<blockquote><p>这个时候，我们可以给它添加一个默认的CSS的min-height值，然后同时使用javascript改变高度。常用的兼容代码有：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// document.domain = &quot;caibaojian.com&quot;;
function setIframeHeight(iframe) {
if (iframe) {
var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
if (iframeWin.document.body) {
iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
}
}
};

window.onload = function () {
setIframeHeight(document.getElementById('external-frame'));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// document.domain = "caibaojian.com";</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setIframeHeight</span>(<span class="hljs-params">iframe</span>) </span>{
<span class="hljs-keyword">if</span> (iframe) {
<span class="hljs-keyword">var</span> iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
<span class="hljs-keyword">if</span> (iframeWin.document.body) {
iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
}
}
};

<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
setIframeHeight(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'external-frame'</span>));
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<iframe src=&quot;backtop.html&quot; frameborder=&quot;0&quot; scrolling=&quot;no&quot; id=&quot;external-frame&quot; onload=&quot;setIframeHeight(this)&quot;></iframe>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"backtop.html"</span> <span class="hljs-attr">frameborder</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">scrolling</span>=<span class="hljs-string">"no"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"external-frame"</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"setIframeHeight(this)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span></code></pre>
<h2 id="articleHeader1">多个iframe的情况下</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script language=&quot;javascript&quot;>
    //输入你希望根据页面高度自动调整高度的iframe的名称的列表
    // 用逗号把每个iframe的ID分隔. 例如: [&quot;myframe1&quot;, &quot;myframe2&quot;]，可以只有一个窗体，则不用逗号。
    // 定义iframe的ID var iframeids=[&quot;test&quot;]; //如果用户的浏览器不支持iframe是否将iframe隐藏 yes 表示隐藏，no表示不隐藏
    var iframehide = &quot;yes&quot;;
    function dyniframesize() {
        var dyniframe = new Array()
        for (i = 0; i < iframeids.length; i++) {
            if (document.getElementById) { //自动调整iframe高度
                dyniframe[dyniframe.length] = document.getElementById(iframeids[i]);
                if (dyniframe[i] &amp;&amp; !window.opera) {
                    dyniframe[i].style.display = &quot;block&quot;;
                    if (dyniframe[i].contentDocument &amp;&amp; dyniframe[i].contentDocument.body.offsetHeight) //如果用户的浏览器是NetScape
                        dyniframe[i].height = dyniframe[i].contentDocument.body.offsetHeight; else if (dyniframe[i].Document &amp;&amp; dyniframe[i].Document.body.scrollHeight) //如果用户的浏览器是IE
                        dyniframe[i].height = dyniframe[i].Document.body.scrollHeight;
                }
            } //根据设定的参数来处理不支持iframe的浏览器的显示问题
            if ((document.all || document.getElementById) &amp;&amp; iframehide == &quot;no&quot;) {
                var tempobj = document.all ? document.all[iframeids[i]] : document.getElementById(iframeids[i]);
                tempobj.style.display = &quot;block&quot;;
            }
        }
    }
    if (window.addEventListener) window.addEventListener(&quot;load&quot;, dyniframesize, false); else if (window.attachEvent) window.attachEvent(&quot;onload&quot;, dyniframesize); else window.onload = dyniframesize;
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">language</span>=<span class="hljs-string">"javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">//输入你希望根据页面高度自动调整高度的iframe的名称的列表</span>
    <span class="hljs-comment">// 用逗号把每个iframe的ID分隔. 例如: ["myframe1", "myframe2"]，可以只有一个窗体，则不用逗号。</span>
    <span class="hljs-comment">// 定义iframe的ID var iframeids=["test"]; //如果用户的浏览器不支持iframe是否将iframe隐藏 yes 表示隐藏，no表示不隐藏</span>
    <span class="hljs-keyword">var</span> iframehide = <span class="hljs-string">"yes"</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dyniframesize</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> dyniframe = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>()
        <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; iframeids.length; i++) {
            <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.getElementById) { <span class="hljs-comment">//自动调整iframe高度</span>
                dyniframe[dyniframe.length] = <span class="hljs-built_in">document</span>.getElementById(iframeids[i]);
                <span class="hljs-keyword">if</span> (dyniframe[i] &amp;&amp; !<span class="hljs-built_in">window</span>.opera) {
                    dyniframe[i].style.display = <span class="hljs-string">"block"</span>;
                    <span class="hljs-keyword">if</span> (dyniframe[i].contentDocument &amp;&amp; dyniframe[i].contentDocument.body.offsetHeight) <span class="hljs-comment">//如果用户的浏览器是NetScape</span>
                        dyniframe[i].height = dyniframe[i].contentDocument.body.offsetHeight; <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (dyniframe[i].Document &amp;&amp; dyniframe[i].Document.body.scrollHeight) <span class="hljs-comment">//如果用户的浏览器是IE</span>
                        dyniframe[i].height = dyniframe[i].Document.body.scrollHeight;
                }
            } <span class="hljs-comment">//根据设定的参数来处理不支持iframe的浏览器的显示问题</span>
            <span class="hljs-keyword">if</span> ((<span class="hljs-built_in">document</span>.all || <span class="hljs-built_in">document</span>.getElementById) &amp;&amp; iframehide == <span class="hljs-string">"no"</span>) {
                <span class="hljs-keyword">var</span> tempobj = <span class="hljs-built_in">document</span>.all ? <span class="hljs-built_in">document</span>.all[iframeids[i]] : <span class="hljs-built_in">document</span>.getElementById(iframeids[i]);
                tempobj.style.display = <span class="hljs-string">"block"</span>;
            }
        }
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.addEventListener) <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"load"</span>, dyniframesize, <span class="hljs-literal">false</span>); <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.attachEvent) <span class="hljs-built_in">window</span>.attachEvent(<span class="hljs-string">"onload"</span>, dyniframesize); <span class="hljs-keyword">else</span> <span class="hljs-built_in">window</span>.onload = dyniframesize;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader2">针对知道的iframe的ID调用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function iframeAutoFit(iframeObj) {
        setTimeout(function () {
            if (!iframeObj) return;
            iframeObj.height = (iframeObj.Document ? iframeObj.Document.body.scrollHeight : iframeObj.contentDocument.body.offsetHeight);
        }, 200)
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iframeAutoFit</span><span class="hljs-params">(iframeObj)</span> </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">if</span> (!iframeObj) <span class="hljs-keyword">return</span>;
            iframeObj.height = (iframeObj.Document ? iframeObj.Document.body.scrollHeight : iframeObj.contentDocument.body.offsetHeight);
        }, <span class="hljs-number">200</span>)
    }</code></pre>
<h2 id="articleHeader3">内容宽度变化的iframe高度自适应</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<iframe src=&quot;backtop.html&quot; frameborder=&quot;0&quot; scrolling=&quot;no&quot; id=&quot;test&quot; onload=&quot;this.height=100&quot;></iframe>
<script type=&quot;text/javascript&quot;> function reinitIframe() {
    var iframe = document.getElementById(&quot;test&quot;);
    try {
        var bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        var height = Math.max(bHeight, dHeight);
        iframe.height = height;
        console.log(height);
    } catch (ex) {
    }
}
window.setInterval(&quot;reinitIframe()&quot;, 200);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"backtop.html"</span> <span class="hljs-attr">frameborder</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">scrolling</span>=<span class="hljs-string">"no"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"this.height=100"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript"> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reinitIframe</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"test"</span>);
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> bHeight = iframe.contentWindow.document.body.scrollHeight;
        <span class="hljs-keyword">var</span> dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        <span class="hljs-keyword">var</span> height = <span class="hljs-built_in">Math</span>.max(bHeight, dHeight);
        iframe.height = height;
        <span class="hljs-built_in">console</span>.log(height);
    } <span class="hljs-keyword">catch</span> (ex) {
    }
}
<span class="hljs-built_in">window</span>.setInterval(<span class="hljs-string">"reinitIframe()"</span>, <span class="hljs-number">200</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader4">跨域下的iframe自适应高度</h2>
<blockquote><p>跨域的时候，由于js的同源策略，父页面内的js不能获取到iframe页面的高度。需要一个页面来做代理。</p></blockquote>
<p>方法如下：假设www.a.com下的一个页面a.html要包含www.b.com下的一个页面c.html。我们使用www.a.com下的另一个页面agent.html来做代理，通过它获取iframe页面的高度，并设定iframe元素的高度。<br>a.html中包含iframe:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<iframe src=&quot;http://www.b.com/c.html&quot; id=&quot;Iframe&quot; frameborder=&quot;0&quot; scrolling=&quot;no&quot; style=&quot;border:0px;&quot;></iframe>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://www.b.com/c.html"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"Iframe"</span> <span class="hljs-attr">frameborder</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">scrolling</span>=<span class="hljs-string">"no"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"border:0px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span></code></pre>
<p>在c.html中加入如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<iframe id=&quot;c_iframe&quot; height=&quot;0&quot; width=&quot;0&quot; src=&quot;http://www.a.com/agent.html&quot; style=&quot;display:none&quot;></iframe>
<script type=&quot;text/javascript&quot;> (function autoHeight() {
    var b_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
    var b_height = Math.max(document.body.scrollHeight, document.body.clientHeight);
    var c_iframe = document.getElementById(&quot;c_iframe&quot;);
    c_iframe.src = c_iframe.src + &quot;#&quot; + b_width + &quot;|&quot; + b_height
// 这里通过hash传递b.htm的宽高 })(); 
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"c_iframe"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://www.a.com/agent.html"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript"> (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">autoHeight</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> b_width = <span class="hljs-built_in">Math</span>.max(<span class="hljs-built_in">document</span>.body.scrollWidth, <span class="hljs-built_in">document</span>.body.clientWidth);
    <span class="hljs-keyword">var</span> b_height = <span class="hljs-built_in">Math</span>.max(<span class="hljs-built_in">document</span>.body.scrollHeight, <span class="hljs-built_in">document</span>.body.clientHeight);
    <span class="hljs-keyword">var</span> c_iframe = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"c_iframe"</span>);
    c_iframe.src = c_iframe.src + <span class="hljs-string">"#"</span> + b_width + <span class="hljs-string">"|"</span> + b_height
<span class="hljs-comment">// 这里通过hash传递b.htm的宽高 })(); </span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>最后，agent.html中放入一段js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    var b_iframe = window.parent.parent.document.getElementById(&quot;Iframe&quot;);
    var hash_url = window.location.hash;
    if (hash_url.indexOf(&quot;#&quot;) >= 0) {
        var hash_width = hash_url.split(&quot;#&quot;)[1].split(&quot;|&quot;)[0] + &quot;px&quot;;
        var hash_height = hash_url.split(&quot;#&quot;)[1].split(&quot;|&quot;)[1] + &quot;px&quot;;
        b_iframe.style.width = hash_width;
        b_iframe.style.height = hash_height;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;
    <span class="hljs-built_in">var</span> b_iframe = window.parent.parent.document.getElementById(<span class="hljs-string">"Iframe"</span>);
    <span class="hljs-built_in">var</span> hash_url = window.location.hash;
    <span class="hljs-keyword">if</span> (hash_url.indexOf(<span class="hljs-string">"#"</span>) &gt;= <span class="hljs-number">0</span>) {
        <span class="hljs-built_in">var</span> hash_width = hash_url.<span class="hljs-built_in">split</span>(<span class="hljs-string">"#"</span>)[<span class="hljs-number">1</span>].<span class="hljs-built_in">split</span>(<span class="hljs-string">"|"</span>)[<span class="hljs-number">0</span>] + <span class="hljs-string">"px"</span>;
        <span class="hljs-built_in">var</span> hash_height = hash_url.<span class="hljs-built_in">split</span>(<span class="hljs-string">"#"</span>)[<span class="hljs-number">1</span>].<span class="hljs-built_in">split</span>(<span class="hljs-string">"|"</span>)[<span class="hljs-number">1</span>] + <span class="hljs-string">"px"</span>;
        b_iframe.<span class="hljs-built_in">style</span>.<span class="hljs-built_in">width</span> = hash_width;
        b_iframe.<span class="hljs-built_in">style</span>.<span class="hljs-built_in">height</span> = hash_height;
    }
&lt;/script&gt;</code></pre>
<blockquote><p>agent.html从URL中获得宽度值和高度值，并设置iframe的高度和宽度（因为agent.html在www.a.com下，所以操作a.html时不受JavaScript的同源限制）</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决各种情况下的iframe高度自适应内容

## 原文链接
[https://segmentfault.com/a/1190000011507804](https://segmentfault.com/a/1190000011507804)


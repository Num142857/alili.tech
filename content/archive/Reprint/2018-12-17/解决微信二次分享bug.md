---
title: '解决微信二次分享bug' 
date: 2018-12-17 2:30:07
hidden: true
slug: 0xvsbg11whl
categories: [reprint]
---

{{< raw >}}

                    
<p>微信分享网页后，再次点击微信分享的内部会自动在网址后拼接&amp;from=来源，导致二次分享的图案文案失效，解决办法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        function getQueryString(name) {//根据字段看网址是否拼接&amp;字符串
          var reg = new RegExp(&quot;(^|&amp;)&quot; + name + &quot;=([^&amp;]*)(&amp;|$)&quot;, &quot;i&quot;);
          var r = window.location.search.substr(1).match(reg);
          if (r != null)
              return unescape(r[2]);
          return null;
        }
        var from = getQueryString('from');
        var appinstall = getQueryString('appinstall');
        var sec = getQueryString('sec');
        var timekey = getQueryString('timekey');
      
        if(from || appinstall || sec || timekey){//假如拼接上了
            window.location.href =重置网址
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getQueryString</span>(<span class="hljs-params">name</span>) </span>{<span class="hljs-comment">//根据字段看网址是否拼接&amp;字符串</span>
          <span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"(^|&amp;)"</span> + name + <span class="hljs-string">"=([^&amp;]*)(&amp;|$)"</span>, <span class="hljs-string">"i"</span>);
          <span class="hljs-keyword">var</span> r = <span class="hljs-built_in">window</span>.location.search.substr(<span class="hljs-number">1</span>).match(reg);
          <span class="hljs-keyword">if</span> (r != <span class="hljs-literal">null</span>)
              <span class="hljs-keyword">return</span> <span class="hljs-built_in">unescape</span>(r[<span class="hljs-number">2</span>]);
          <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        }
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">from</span> = getQueryString(<span class="hljs-string">'from'</span>);
        <span class="hljs-keyword">var</span> appinstall = getQueryString(<span class="hljs-string">'appinstall'</span>);
        <span class="hljs-keyword">var</span> sec = getQueryString(<span class="hljs-string">'sec'</span>);
        <span class="hljs-keyword">var</span> timekey = getQueryString(<span class="hljs-string">'timekey'</span>);
      
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">from</span> || appinstall || sec || timekey){<span class="hljs-comment">//假如拼接上了</span>
            <span class="hljs-built_in">window</span>.location.href =重置网址
        }</code></pre>
<p>在需要分享的网页里写入微信jssdk代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。打印标识config:
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.onMenuShareTimeline({
            title: '', // 分享标题
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
            // 用户确认分享后执行的回调函数
            }
        });
});

wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.config</span>({
    <span class="hljs-attribute">debug</span>: true, <span class="hljs-comment">// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。打印标识config:</span>
    <span class="hljs-attribute">appId</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 必填，公众号的唯一标识</span>
    <span class="hljs-attribute">timestamp</span>: , <span class="hljs-comment">// 必填，生成签名的时间戳</span>
    <span class="hljs-attribute">nonceStr</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 必填，生成签名的随机串</span>
    <span class="hljs-attribute">signature</span>: <span class="hljs-string">''</span>,<span class="hljs-comment">// 必填，签名，见附录1</span>
    <span class="hljs-attribute">jsApiList</span>: [] <span class="hljs-comment">// 必填，需要使用的JS接口列表，所有JS接口列表见附录2</span>
});

<span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.ready</span>(function(){
    <span class="hljs-comment">// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。</span>
        <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.onMenuShareTimeline</span>({
            <span class="hljs-attribute">title</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享标题</span>
            <span class="hljs-attribute">link</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致</span>
            <span class="hljs-attribute">imgUrl</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享图标</span>
            <span class="hljs-attribute">success</span>: function () {
            <span class="hljs-comment">// 用户确认分享后执行的回调函数</span>
            }
        });
});

<span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.error</span>(function(res){
    <span class="hljs-comment">// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。</span>
});</code></pre>
<p><a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421141115" rel="nofollow noreferrer" target="_blank">微信开发文档</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决微信二次分享bug

## 原文链接
[https://segmentfault.com/a/1190000012858651](https://segmentfault.com/a/1190000012858651)


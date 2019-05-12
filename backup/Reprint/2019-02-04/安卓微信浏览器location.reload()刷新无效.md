---
title: '安卓微信浏览器location.reload()刷新无效' 
date: 2019-02-04 2:30:58
hidden: true
slug: w4b112iyqfm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">场景：</h2>
<p>页面上有一个按钮，点击的时候执行window.location.reload()，正常情况reload()后会向后台发出请求，但在安卓的微信浏览器中reload后，通过fiddler抓包发现，并没有发送请求。应该是微信缓存的问题。</p>
<h2 id="articleHeader1">解决方法：</h2>
<p>最常用的方法，更新时间戳：window.location.href+随机数。写了一个小函数，添加或更新链接后的时间戳。这里，第二个参数表示时间戳的key，不传参时，默认变量名为“t”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateUrl(url,key){
        var key= (key || 't') +'=';  //默认是&quot;t&quot;
        var reg=new RegExp(key+'\\d+');  //正则：t=1472286066028
        var timestamp=+new Date();
        if(url.indexOf(key)>-1){ //有时间戳，直接更新
            return url.replace(reg,key+timestamp);
        }else{  //没有时间戳，加上时间戳
            if(url.indexOf('\?')>-1){
                var urlArr=url.split('\?');
                if(urlArr[1]){
                    return urlArr[0]+'?'+key+timestamp+'&amp;'+urlArr[1];
                }else{
                    return urlArr[0]+'?'+key+timestamp;
                }
            }else{
                if(url.indexOf('#')>-1){
                    return url.split('#')[0]+'?'+key+timestamp+location.hash;
                }else{
                    return url+'?'+key+timestamp;
                }
            }
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>function updateUrl(url,<span class="hljs-built_in">key</span>){
        var <span class="hljs-built_in">key</span>= (<span class="hljs-built_in">key</span> || <span class="hljs-string">'t'</span>) +<span class="hljs-string">'='</span>;  <span class="hljs-comment">//默认是"t"</span>
        var reg=<span class="hljs-keyword">new</span> RegExp(<span class="hljs-built_in">key</span>+<span class="hljs-string">'\\d+'</span>);  <span class="hljs-comment">//正则：t=1472286066028</span>
        var timestamp=+<span class="hljs-keyword">new</span> Date();
        <span class="hljs-keyword">if</span>(url.indexOf(<span class="hljs-built_in">key</span>)&gt;<span class="hljs-number">-1</span>){ <span class="hljs-comment">//有时间戳，直接更新</span>
            <span class="hljs-keyword">return</span> url.replace(reg,<span class="hljs-built_in">key</span>+timestamp);
        }<span class="hljs-keyword">else</span>{  <span class="hljs-comment">//没有时间戳，加上时间戳</span>
            <span class="hljs-keyword">if</span>(url.indexOf(<span class="hljs-string">'\?'</span>)&gt;<span class="hljs-number">-1</span>){
                var urlArr=url.<span class="hljs-built_in">split</span>(<span class="hljs-string">'\?'</span>);
                <span class="hljs-keyword">if</span>(urlArr[<span class="hljs-number">1</span>]){
                    <span class="hljs-keyword">return</span> urlArr[<span class="hljs-number">0</span>]+<span class="hljs-string">'?'</span>+<span class="hljs-built_in">key</span>+timestamp+<span class="hljs-string">'&amp;'</span>+urlArr[<span class="hljs-number">1</span>];
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">return</span> urlArr[<span class="hljs-number">0</span>]+<span class="hljs-string">'?'</span>+<span class="hljs-built_in">key</span>+timestamp;
                }
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">if</span>(url.indexOf(<span class="hljs-string">'#'</span>)&gt;<span class="hljs-number">-1</span>){
                    <span class="hljs-keyword">return</span> url.<span class="hljs-built_in">split</span>(<span class="hljs-string">'#'</span>)[<span class="hljs-number">0</span>]+<span class="hljs-string">'?'</span>+<span class="hljs-built_in">key</span>+timestamp+location.hash;
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">return</span> url+<span class="hljs-string">'?'</span>+<span class="hljs-built_in">key</span>+timestamp;
                }
            }
        }
    }
</code></pre>
<h2 id="articleHeader2">调用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.location.href=updateUrl(window.location.href); //不传参，默认是“t”
window.location.href=updateUrl(window.location.href,'v'); //传入自定义的变量名
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-built_in">window</span>.location.href=updateUrl(<span class="hljs-built_in">window</span>.location.href); <span class="hljs-comment">//不传参，默认是“t”</span>
<span class="hljs-built_in">window</span>.location.href=updateUrl(<span class="hljs-built_in">window</span>.location.href,<span class="hljs-string">'v'</span>); <span class="hljs-comment">//传入自定义的变量名</span>
</code></pre>
<p>亲测，有效。如果有更好的写法，欢迎纠正。</p>
<h2 id="articleHeader3">另解</h2>
<p>还想过一个方法，这里是针对php的情况,就是将location.href指向一个新的链接，在新链接中再重定向本页面。</p>
<p>假设原页面链接是：//xxx.xxx.com/xxx/index?fsid=1001039610100510，则location.href等于如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var url=location.href;
 location.href='//xxx.xxx.com/xxx/update?curl='+encodeURIComponent(url);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code> <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span>=location.href;
 location.href=<span class="hljs-string">'//xxx.xxx.com/xxx/update?curl='</span>+<span class="hljs-built_in">encodeURIComponent</span>(<span class="hljs-built_in">url</span>);
</code></pre>
<p>在PHP中，function update()处理如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function again(){
    $url=$this->input->get('curl');
    header(&quot;Location: &quot;.$url);
}    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">again</span><span class="hljs-params">()</span></span>{
    $url=<span class="hljs-keyword">$this</span>-&gt;input-&gt;get(<span class="hljs-string">'curl'</span>);
    header(<span class="hljs-string">"Location: "</span>.$url);
}    
</code></pre>
<p>然而经fiddler抓包测试，只有第一次刷新时有效，再次刷新，安卓微信浏览器仍然会缓存。 所以，<strong>还是更改时间戳最有效，这也是解决缓存最常用的方法。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
安卓微信浏览器location.reload()刷新无效

## 原文链接
[https://segmentfault.com/a/1190000006753455](https://segmentfault.com/a/1190000006753455)


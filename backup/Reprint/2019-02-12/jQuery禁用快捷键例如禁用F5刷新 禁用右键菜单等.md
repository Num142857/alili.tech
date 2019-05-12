---
title: 'jQuery禁用快捷键例如禁用F5刷新 禁用右键菜单等' 
date: 2019-02-12 2:30:12
hidden: true
slug: qfv2ok0oqad
categories: [reprint]
---

{{< raw >}}

                    
<ul><li><p>禁用鼠标右键菜单栏</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;body&quot;).bind(&quot;contextmenu&quot;, function(event) {
        return false;
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">"body"</span>).bind(<span class="hljs-string">"contextmenu"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    });</code></pre>
<ul><li><p>禁用快捷键</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;body&quot;).bind(&quot;keydown&quot;,function(e){     
    e=window.event||e;
     
      //禁止空格键翻页 
     if(event.keyCode==32){
        return false; 
     }
     
     //屏蔽F5刷新键 
     if(event.keyCode==116){
        e.keyCode = 0; //IE下需要设置为keyCode为false 
        return false; 
     }  
   
     //屏蔽 Alt+ 方向键 ← 
     //屏蔽 Alt+ 方向键 →
     if ((event.altKey)&amp;&amp;((event.keyCode==37)||(event.keyCode==39)))  
     { 
        event.returnValue=false; 
        return false;
     }
  
     //屏蔽退格删除键 
     if(event.keyCode==8){
        return false; 
     }
  
    //屏蔽ctrl+R 
    if((event.ctrlKey) &amp;&amp; (event.keyCode==82)){
       e.keyCode = 0;  
       return false; 
    }
 }); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>$(<span class="hljs-string">"body"</span>).bind(<span class="hljs-string">"keydown"</span>,function(e){     
    e=window.<span class="hljs-keyword">event</span>||e;
     
      <span class="hljs-comment">//禁止空格键翻页 </span>
     <span class="hljs-keyword">if</span>(<span class="hljs-keyword">event</span>.keyCode==<span class="hljs-number">32</span>){
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; 
     }
     
     <span class="hljs-comment">//屏蔽F5刷新键 </span>
     <span class="hljs-keyword">if</span>(<span class="hljs-keyword">event</span>.keyCode==<span class="hljs-number">116</span>){
        e.keyCode = <span class="hljs-number">0</span>; <span class="hljs-comment">//IE下需要设置为keyCode为false </span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; 
     }  
   
     <span class="hljs-comment">//屏蔽 Alt+ 方向键 ← </span>
     <span class="hljs-comment">//屏蔽 Alt+ 方向键 →</span>
     <span class="hljs-keyword">if</span> ((<span class="hljs-keyword">event</span>.altKey)&amp;&amp;((<span class="hljs-keyword">event</span>.keyCode==<span class="hljs-number">37</span>)||(<span class="hljs-keyword">event</span>.keyCode==<span class="hljs-number">39</span>)))  
     { 
        <span class="hljs-keyword">event</span>.returnValue=<span class="hljs-literal">false</span>; 
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
     }
  
     <span class="hljs-comment">//屏蔽退格删除键 </span>
     <span class="hljs-keyword">if</span>(<span class="hljs-keyword">event</span>.keyCode==<span class="hljs-number">8</span>){
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; 
     }
  
    <span class="hljs-comment">//屏蔽ctrl+R </span>
    <span class="hljs-keyword">if</span>((<span class="hljs-keyword">event</span>.ctrlKey) &amp;&amp; (<span class="hljs-keyword">event</span>.keyCode==<span class="hljs-number">82</span>)){
       e.keyCode = <span class="hljs-number">0</span>;  
       <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; 
    }
 }); 
</code></pre>
<p>资料：</p>
<ol>
<li><p>javascript中event.keycode大全<a href="http://www.okajax.com/a/200811/1124R022008.html" rel="nofollow noreferrer" target="_blank">http://www.okajax.com/a/200811/1124R022008.html</a></p></li>
<li><p>jQuery禁用浏览器快捷键<a href="http://www.easyui.info/archives/1771.html" rel="nofollow noreferrer" target="_blank">http://www.easyui.info/archives/1771.html</a></p></li>
<li><p>jQuery禁用键盘后退屏蔽F5刷新及禁用右键单击<a href="http://www.jb51.net/article/78454.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/78454.htm</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery禁用快捷键例如禁用F5刷新 禁用右键菜单等

## 原文链接
[https://segmentfault.com/a/1190000004825235](https://segmentfault.com/a/1190000004825235)


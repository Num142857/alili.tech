---
title: 'javaScript字符串去重' 
date: 2018-12-06 2:30:09
hidden: true
slug: 489w5fbplnm
categories: [reprint]
---

{{< raw >}}

                    
<p>方法一：set</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str = [...new Set('abcsafdf')].join(''); // abcsfd
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>let <span class="hljs-built_in">str</span> = [...<span class="hljs-keyword">new</span> Set(<span class="hljs-string">'abcsafdf'</span>)].<span class="hljs-built_in">join</span>(<span class="hljs-string">''</span>); <span class="hljs-comment">// abcsfd</span>
</code></pre>
<p>方法二：filter</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str =  [].filter.call(&quot;abcdabecd&quot;,(s,i,o)=>o.indexOf(s)==i).join(''); // abcde
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>let <span class="hljs-built_in">str</span> =  [].<span class="hljs-built_in">filter</span>.call(<span class="hljs-string">"abcdabecd"</span>,(s,i,o)=&gt;o.indexOf(s)==i).<span class="hljs-built_in">join</span>(<span class="hljs-string">''</span>); <span class="hljs-comment">// abcde</span>
</code></pre>
<p>方法三：for</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function repetition(str) {  
    let newStr = &quot;&quot;;  
    let flag;  
    for (let i=0; i<str.length; i++) {  
        flag=1;  
        for (let j=0;j<newStr.length;j++) {  
            if (str[i] == newStr[j]) {  
                flag=0;  
                break;  
            }  
        }  
        if(flag){
            newStr+=str[i];  
        }  
    }  
    return newStr;   
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">repetition</span></span>(str) {  
    let <span class="hljs-keyword">new</span><span class="hljs-type">Str</span> = <span class="hljs-string">""</span>;  
    let flag;  
    <span class="hljs-keyword">for</span> (let i=<span class="hljs-number">0</span>; i&lt;str.length; i++) {  
        flag=<span class="hljs-number">1</span>;  
        <span class="hljs-keyword">for</span> (let j=<span class="hljs-number">0</span>;j&lt;<span class="hljs-keyword">new</span><span class="hljs-type">Str</span>.length;j++) {  
            <span class="hljs-keyword">if</span> (str[i] == <span class="hljs-keyword">new</span><span class="hljs-type">Str</span>[j]) {  
                flag=<span class="hljs-number">0</span>;  
                <span class="hljs-keyword">break</span>;  
            }  
        }  
        <span class="hljs-keyword">if</span>(flag){
            <span class="hljs-keyword">new</span><span class="hljs-type">Str</span>+=str[i];  
        }  
    }  
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Str</span>;   
} 
</code></pre>
<p>方法四： search()方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function repetition(str) {  
    let newStr=&quot;&quot;;  
    for (let i=0; i<str.length; i++){  
        if (newStr.search(str[i])==-1) {     
            newStr+=str[i];   
        }       
    }  
    return newStr;  
}


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">repetition</span></span>(str) {  
    let <span class="hljs-keyword">new</span><span class="hljs-type">Str</span>=<span class="hljs-string">""</span>;  
    <span class="hljs-keyword">for</span> (let i=<span class="hljs-number">0</span>; i&lt;str.length; i++){  
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Str</span>.search(str[i])==<span class="hljs-number">-1</span>) {     
            <span class="hljs-keyword">new</span><span class="hljs-type">Str</span>+=str[i];   
        }       
    }  
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Str</span>;  
}


</code></pre>
<p>方法五： 对象属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function repetition(str) {  
    let obj={};  
    var newStr=&quot;&quot;;  
    for (let i=0; i<str.length; i++){  
        if (!obj[str[i]]) {  
            newStr += str[i];  
            obj[str[i]]=1;  
        }  
    }  
    return newStr;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">repetition</span></span>(str) {  
    let obj={};  
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Str</span>=<span class="hljs-string">""</span>;  
    <span class="hljs-keyword">for</span> (let i=<span class="hljs-number">0</span>; i&lt;str.length; i++){  
        <span class="hljs-keyword">if</span> (!obj[str[i]]) {  
            <span class="hljs-keyword">new</span><span class="hljs-type">Str</span> += str[i];  
            obj[str[i]]=<span class="hljs-number">1</span>;  
        }  
    }  
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Str</span>;  
}
</code></pre>
<p>方法六：includes</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function repetition(str) {  
    let newStr=&quot;&quot;;  
    for (let i=0; i<str.length; i++) {  
        if (!newStr.includes(str[i])) {  
            newStr += str[i];  
        }  
    } 
     
    return newStr;  
}


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">repetition</span></span>(str) {  
    let <span class="hljs-keyword">new</span><span class="hljs-type">Str</span>=<span class="hljs-string">""</span>;  
    <span class="hljs-keyword">for</span> (let i=<span class="hljs-number">0</span>; i&lt;str.length; i++) {  
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">new</span><span class="hljs-type">Str</span>.includes(str[i])) {  
            <span class="hljs-keyword">new</span><span class="hljs-type">Str</span> += str[i];  
        }  
    } 
     
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Str</span>;  
}


</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javaScript字符串去重

## 原文链接
[https://segmentfault.com/a/1190000014275743](https://segmentfault.com/a/1190000014275743)


---
title: 'fetch解决异步嵌套问题' 
date: 2019-01-07 2:30:11
hidden: true
slug: vmkxhqw9z78
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>fetch</strong></p>
<ul><li><p>async和await解决异步嵌套问题：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function ajax(url){
        return new Promise(function(resolve,refused){
                let xmlHttp=new XMLHttpRequest();
                xmlHttp.open(&quot;get&quot;,url,true);
                xmlHttp.onreadystatechange=function(){
                    if(xmlHttp.readyState==4&amp;&amp;xmlHttp.status==200){
                        let data= JSON.parse(xmlHttp.responseText);
                        resolve(data);
                       }
                   }
                xmlHttp.send(null);
        });
    }

    let uldom=document.getElementById(&quot;students&quot;);
    let url=&quot;http://localhost:3000/student.json&quot;;
 

    async function main(){
        let data=await ajax(url);
        let students=data;
        let html=``;
        for(let i=0,l=students.length;i<l;i++){
            let name=students[i].name;
            let age=students[i].age;
            html+= `
            <li>姓名${name},年龄${age}</li>
            `
        }
        uldom.innerHTML=html;
    }
    main();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">url</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,refused</span>)</span>{
                <span class="hljs-keyword">let</span> xmlHttp=<span class="hljs-keyword">new</span> XMLHttpRequest();
                xmlHttp.open(<span class="hljs-string">"get"</span>,<span class="hljs-built_in">url</span>,<span class="hljs-literal">true</span>);
                xmlHttp.onreadystatechange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-keyword">if</span>(xmlHttp.readyState==<span class="hljs-number">4</span>&amp;&amp;xmlHttp.status==<span class="hljs-number">200</span>){
                        <span class="hljs-keyword">let</span> data= <span class="hljs-built_in">JSON</span>.parse(xmlHttp.responseText);
                        resolve(data);
                       }
                   }
                xmlHttp.send(<span class="hljs-literal">null</span>);
        });
    }

    <span class="hljs-keyword">let</span> uldom=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"students"</span>);
    <span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span>=<span class="hljs-string">"http://localhost:3000/student.json"</span>;
 

    <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">let</span> data=<span class="hljs-keyword">await</span> ajax(<span class="hljs-built_in">url</span>);
        <span class="hljs-keyword">let</span> students=data;
        <span class="hljs-keyword">let</span> html=<span class="hljs-string">``</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,l=students.length;i&lt;l;i++){
            <span class="hljs-keyword">let</span> name=students[i].name;
            <span class="hljs-keyword">let</span> age=students[i].age;
            html+= <span class="hljs-string">`
            &lt;li&gt;姓名<span class="hljs-subst">${name}</span>,年龄<span class="hljs-subst">${age}</span>&lt;/li&gt;
            `</span>
        }
        uldom.innerHTML=html;
    }
    main();</code></pre>
<ul><li><p>fetch解决异步嵌套问题：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let url=&quot;http://localhost:3000/student.json&quot;;
    let uldom=document.getElementById(&quot;students&quot;);
    async function main(){
        let respone = await fetch(url);
        let students = await respone.json();
            
        let html=``;
        for(let i=0,l=students.length;i<l;i++){
            let name=students[i].name;
            let age=students[i].age;
            html+= `
            <li>姓名${name},年龄${age}</li>
           `
        }
        
        uldom.innerHTML=html;
        
    }
    main();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span>=<span class="hljs-string">"http://localhost:3000/student.json"</span>;
    <span class="hljs-keyword">let</span> uldom=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"students"</span>);
    <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">let</span> respone = <span class="hljs-keyword">await</span> fetch(<span class="hljs-built_in">url</span>);
        <span class="hljs-keyword">let</span> students = <span class="hljs-keyword">await</span> respone.json();
            
        <span class="hljs-keyword">let</span> html=<span class="hljs-string">``</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,l=students.length;i&lt;l;i++){
            <span class="hljs-keyword">let</span> name=students[i].name;
            <span class="hljs-keyword">let</span> age=students[i].age;
            html+= <span class="hljs-string">`
            &lt;li&gt;姓名<span class="hljs-subst">${name}</span>,年龄<span class="hljs-subst">${age}</span>&lt;/li&gt;
           `</span>
        }
        
        uldom.innerHTML=html;
        
    }
    main();</code></pre>
<blockquote><p>这两段代码比起来，是不是下面的要比上面的简单的多得多，像我这不爱敲代码的肯定选择下面的，哈哈！</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
fetch解决异步嵌套问题

## 原文链接
[https://segmentfault.com/a/1190000010280355](https://segmentfault.com/a/1190000010280355)


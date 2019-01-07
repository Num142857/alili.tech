---
title: 'javascript的fetch,ajax' 
date: 2019-01-07 2:30:11
hidden: true
slug: haml2upvwe
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">javascript的fetch,ajax</h2>
<h5>异步嵌套问题，fetch,ajax的对比</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//异步嵌套问题  
//ajax  asynchronous javascript xmlhttprequest

function ajax(url){
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
main();

//fetch
let url=&quot;http://localhost:3000/student.json&quot;;
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
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//异步嵌套问题  </span>
<span class="hljs-comment">//ajax  asynchronous javascript xmlhttprequest</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">url</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,refused</span>)</span>{
          <span class="hljs-keyword">let</span> xmlHttp=<span class="hljs-keyword">new</span> XMLHttpRequest();
            xmlHttp.open(<span class="hljs-string">"get"</span>,url,<span class="hljs-literal">true</span>);
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
<span class="hljs-keyword">let</span> url=<span class="hljs-string">"http://localhost:3000/student.json"</span>;

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> data=<span class="hljs-keyword">await</span> ajax(url);
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
main();

<span class="hljs-comment">//fetch</span>
<span class="hljs-keyword">let</span> url=<span class="hljs-string">"http://localhost:3000/student.json"</span>;
        <span class="hljs-keyword">let</span> uldom=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"students"</span>);
        <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">let</span> respone = <span class="hljs-keyword">await</span> fetch(url);
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
<h5>看了两个之间的对比，你更喜欢哪个，也希望帮到大家</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript的fetch,ajax

## 原文链接
[https://segmentfault.com/a/1190000010279882](https://segmentfault.com/a/1190000010279882)


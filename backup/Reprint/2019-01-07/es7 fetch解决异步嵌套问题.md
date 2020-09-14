---
title: 'es7 fetch解决异步嵌套问题' 
date: 2019-01-07 2:30:11
hidden: true
slug: tkx9tklqrlh
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">fetch API解决异步嵌套问题</h1>
<blockquote><p>我们昨天学习了async和await，知道他是为了解决浏览器异步获取的的！但是我们用fetch api的话方法会更加的简单</p></blockquote>
<h2 id="articleHeader1">async和await解决异步嵌套</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajax(url){

          return new Promise(function(reslove,reject){
              let xmlHttp=new XMLHttpRequest();
              xmlHttp.open(&quot;get&quot;,url,true);
              xmlHttp.onreadystatechange=function(){
                  if(xmlHttp.readyState==4&amp;&amp;xmlHttp.status==200){
                      let data=JSON.parse(xmlHttp.responseText);
                      reslove(data);
                  }
              }
              xmlHttp.send(null);
          })
      }
      let uldom=document.getElementById(&quot;students&quot;);
      let url=&quot;http://192.168.0.57:8000/students.json&quot;;
      async function main(){
        let data=await ajax(url);
      
        let students=data;
        let html=&quot;&quot;;
        for(let i=0,l=students.length;i<l;i++){
            let name=students[i].name;
            let age=students[i].age;
            html+=`
            <li>姓名${name},年龄${age}</li>
            `
        }
        uldom.innerHTML=html;
      }
      main();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">url</span>)</span>{

          <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reslove,reject</span>)</span>{
              <span class="hljs-keyword">let</span> xmlHttp=<span class="hljs-keyword">new</span> XMLHttpRequest();
              xmlHttp.open(<span class="hljs-string">"get"</span>,<span class="hljs-built_in">url</span>,<span class="hljs-literal">true</span>);
              xmlHttp.onreadystatechange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                  <span class="hljs-keyword">if</span>(xmlHttp.readyState==<span class="hljs-number">4</span>&amp;&amp;xmlHttp.status==<span class="hljs-number">200</span>){
                      <span class="hljs-keyword">let</span> data=<span class="hljs-built_in">JSON</span>.parse(xmlHttp.responseText);
                      reslove(data);
                  }
              }
              xmlHttp.send(<span class="hljs-literal">null</span>);
          })
      }
      <span class="hljs-keyword">let</span> uldom=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"students"</span>);
      <span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span>=<span class="hljs-string">"http://192.168.0.57:8000/students.json"</span>;
      <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">let</span> data=<span class="hljs-keyword">await</span> ajax(<span class="hljs-built_in">url</span>);
      
        <span class="hljs-keyword">let</span> students=data;
        <span class="hljs-keyword">let</span> html=<span class="hljs-string">""</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,l=students.length;i&lt;l;i++){
            <span class="hljs-keyword">let</span> name=students[i].name;
            <span class="hljs-keyword">let</span> age=students[i].age;
            html+=<span class="hljs-string">`
            &lt;li&gt;姓名<span class="hljs-subst">${name}</span>,年龄<span class="hljs-subst">${age}</span>&lt;/li&gt;
            `</span>
        }
        uldom.innerHTML=html;
      }
      main();</code></pre>
<p>我们需要创建Promise函数来进行操作，如果我们用fetch解决的话，会更加的方便！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let uldom=document.getElementById(&quot;students&quot;);
      let url=&quot;http://192.168.0.57:8000/students.json&quot;;
        function main(){
            fetch(url).then(respone=>{
            return respone.json();
        }).then(data=>{
            let students=data;
            let html=&quot;&quot;;
            for(let i=0,l=students.length;i<l;i++){
                let name=students[i].name;
                let age=students[i].age;
                html+=`
                <li>姓名${name},年龄${age}</li>
                `
            }
            uldom.innerHTML=html;
        });
            
        }
        main();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> uldom=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"students"</span>);
      <span class="hljs-keyword">let</span> url=<span class="hljs-string">"http://192.168.0.57:8000/students.json"</span>;
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>)</span>{
            fetch(url).then(<span class="hljs-function"><span class="hljs-params">respone</span>=&gt;</span>{
            <span class="hljs-keyword">return</span> respone.json();
        }).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
            <span class="hljs-keyword">let</span> students=data;
            <span class="hljs-keyword">let</span> html=<span class="hljs-string">""</span>;
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,l=students.length;i&lt;l;i++){
                <span class="hljs-keyword">let</span> name=students[i].name;
                <span class="hljs-keyword">let</span> age=students[i].age;
                html+=<span class="hljs-string">`
                &lt;li&gt;姓名<span class="hljs-subst">${name}</span>,年龄<span class="hljs-subst">${age}</span>&lt;/li&gt;
                `</span>
            }
            uldom.innerHTML=html;
        });
            
        }
        main();</code></pre>
<p>不用创建Promise，直接调用then()是不是比上边更加的简单！</p>
<h2 id="articleHeader2">async、await结合fetch处理异步</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let uldom=document.getElementById(&quot;students&quot;);
    let url=&quot;http://192.168.0.57:8000/students.json&quot;;  
    async function main(){
        let respone = await fetch(url);
        let student = await respone.json();
        let html=&quot;&quot;;
        for (let i=0,l=students.length;i<l;i++){
            let name=students[i].name;
            let age=students[i].age;
            html+=`
            <li>姓名${name},年龄${age}</li>
            `
        }
        uldom.innerHTML=html;
        }
    main()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">let</span> uldom=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"students"</span>);
    <span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span>=<span class="hljs-string">"http://192.168.0.57:8000/students.json"</span>;  
    <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">let</span> respone = <span class="hljs-keyword">await</span> fetch(<span class="hljs-built_in">url</span>);
        <span class="hljs-keyword">let</span> student = <span class="hljs-keyword">await</span> respone.json();
        <span class="hljs-keyword">let</span> html=<span class="hljs-string">""</span>;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,l=students.length;i&lt;l;i++){
            <span class="hljs-keyword">let</span> name=students[i].name;
            <span class="hljs-keyword">let</span> age=students[i].age;
            html+=<span class="hljs-string">`
            &lt;li&gt;姓名<span class="hljs-subst">${name}</span>,年龄<span class="hljs-subst">${age}</span>&lt;/li&gt;
            `</span>
        }
        uldom.innerHTML=html;
        }
    main()</code></pre>
<p>感觉是不是很简单！比上一种方法更加的简单。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
es7 fetch解决异步嵌套问题

## 原文链接
[https://segmentfault.com/a/1190000010282855](https://segmentfault.com/a/1190000010282855)


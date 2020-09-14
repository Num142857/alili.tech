---
title: 'fetch结合(async函数来使用)' 
date: 2019-01-07 2:30:11
hidden: true
slug: 1nsm40if6vu
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">fetch结合(async函数来使用)</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;students&quot;>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"students"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<h3 id="articleHeader1">ajax请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajax(url){
    
          let xmlHttp=new XMLHttpRequest();
            xmlHttp.open(&quot;get&quot;,url,true);
            xmlHttp.onreadystatechange=function(){
                if(xmlHttp.readyState==4&amp;&amp;xmlHttp.status==200){
                    let data= JSON.parse(xmlHttp.responseText);
                    console.log(data);
                }
            }
            xmlHttp.send(null);
}

ajax(url);
let uldom=document.getElementById(&quot;students&quot;);

let url=&quot;http://192.168.0.46:8000/student.json&quot;;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">url</span>)</span>{
    
          <span class="hljs-keyword">let</span> xmlHttp=<span class="hljs-keyword">new</span> XMLHttpRequest();
            xmlHttp.open(<span class="hljs-string">"get"</span>,<span class="hljs-built_in">url</span>,<span class="hljs-literal">true</span>);
            xmlHttp.onreadystatechange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">if</span>(xmlHttp.readyState==<span class="hljs-number">4</span>&amp;&amp;xmlHttp.status==<span class="hljs-number">200</span>){
                    <span class="hljs-keyword">let</span> data= <span class="hljs-built_in">JSON</span>.parse(xmlHttp.responseText);
                    <span class="hljs-built_in">console</span>.log(data);
                }
            }
            xmlHttp.send(<span class="hljs-literal">null</span>);
}

ajax(<span class="hljs-built_in">url</span>);
<span class="hljs-keyword">let</span> uldom=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"students"</span>);

<span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span>=<span class="hljs-string">"http://192.168.0.46:8000/student.json"</span>;
</code></pre>
<h3 id="articleHeader2">对于使用fetch可以方便很多，这就是下面要使用的fetch的代码，先熟悉了解下：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*fetch(url).then(respone=>{
    //return respone.text();
    return respone.json();
}).then(data=>{
    console.log(data);
})*/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>/*fetch(url).<span class="hljs-keyword">then</span>(respone=&gt;{
    //<span class="hljs-keyword">return</span> respone.text();
    <span class="hljs-keyword">return</span> respone.json();
}).<span class="hljs-keyword">then</span>(data=&gt;{
    console.log(data);
})*/
</code></pre>
<h1 id="articleHeader3">使用fetch</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//获取css里ul的id属性
 let uldom=document.getElementById(&quot;students&quot;);
//单独创建一个json文件，获取地址
let url=&quot;http://192.168.0.46:8000/student.json&quot;;

function main(){
    fetch(url).then(respone=>{
    //return respone.text();
    return respone.json();
}).then(students=>{

    let html=``;
    for(let i=0,l=students.length;i<l;i++){
        let name=students[i].name;
        let age=students[i].age;
        html+= `
        <li>姓名${name},年龄${age}</li>
    `
    }

    uldom.innerHTML=html;
});

    
}
main();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">//获取css里ul的id属性</span>
 <span class="hljs-keyword">let</span> uldom=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"students"</span>);
<span class="hljs-comment">//单独创建一个json文件，获取地址</span>
<span class="hljs-keyword">let</span> url=<span class="hljs-string">"http://192.168.0.46:8000/student.json"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>)</span>{
    fetch(url).then(<span class="hljs-function"><span class="hljs-params">respone</span>=&gt;</span>{
    <span class="hljs-comment">//return respone.text();</span>
    <span class="hljs-keyword">return</span> respone.json();
}).then(<span class="hljs-function"><span class="hljs-params">students</span>=&gt;</span>{

    <span class="hljs-keyword">let</span> html=<span class="hljs-string">``</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,l=students.length;i&lt;l;i++){
        <span class="hljs-keyword">let</span> name=students[i].name;
        <span class="hljs-keyword">let</span> age=students[i].age;
        html+= <span class="hljs-string">`
        &lt;li&gt;姓名<span class="hljs-subst">${name}</span>,年龄<span class="hljs-subst">${age}</span>&lt;/li&gt;
    `</span>
    }

    uldom.innerHTML=html;
});

    
}
main();
</code></pre>
<h3 id="articleHeader4">最终代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let uldom=document.getElementById(&quot;students&quot;);
let url=&quot;http://192.168.0.46:8000/student.json&quot;;

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
main();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">let</span> uldom=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"students"</span>);
<span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span>=<span class="hljs-string">"http://192.168.0.46:8000/student.json"</span>;

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
main();
</code></pre>
<h3 id="articleHeader5">这是我的json文件里的代码：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {&quot;name&quot;:&quot;ss&quot;,&quot;age&quot;:&quot;3&quot;},
    {&quot;name&quot;:&quot;aa&quot;,&quot;age&quot;:&quot;1&quot;},
    {&quot;name&quot;:&quot;qq&quot;,&quot;age&quot;:&quot;4&quot;},
    {&quot;name&quot;:&quot;zz&quot;,&quot;age&quot;:&quot;3&quot;},
    {&quot;name&quot;:&quot;xx&quot;,&quot;age&quot;:&quot;5&quot;},
    {&quot;name&quot;:&quot;cc&quot;,&quot;age&quot;:&quot;7&quot;}
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
    {<span class="hljs-attr">"name"</span>:<span class="hljs-string">"ss"</span>,<span class="hljs-attr">"age"</span>:<span class="hljs-string">"3"</span>},
    {<span class="hljs-attr">"name"</span>:<span class="hljs-string">"aa"</span>,<span class="hljs-attr">"age"</span>:<span class="hljs-string">"1"</span>},
    {<span class="hljs-attr">"name"</span>:<span class="hljs-string">"qq"</span>,<span class="hljs-attr">"age"</span>:<span class="hljs-string">"4"</span>},
    {<span class="hljs-attr">"name"</span>:<span class="hljs-string">"zz"</span>,<span class="hljs-attr">"age"</span>:<span class="hljs-string">"3"</span>},
    {<span class="hljs-attr">"name"</span>:<span class="hljs-string">"xx"</span>,<span class="hljs-attr">"age"</span>:<span class="hljs-string">"5"</span>},
    {<span class="hljs-attr">"name"</span>:<span class="hljs-string">"cc"</span>,<span class="hljs-attr">"age"</span>:<span class="hljs-string">"7"</span>}
]
</code></pre>
<h1 id="articleHeader6">最后结果：</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="姓名ss,年龄3
姓名aa,年龄1
姓名qq,年龄4
姓名zz,年龄3
姓名xx,年龄5
姓名cc,年龄7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>姓名ss,年龄<span class="hljs-number">3</span>
姓名aa,年龄<span class="hljs-number">1</span>
姓名qq,年龄<span class="hljs-number">4</span>
姓名zz,年龄<span class="hljs-number">3</span>
姓名xx,年龄<span class="hljs-number">5</span>
姓名cc,年龄<span class="hljs-number">7</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
fetch结合(async函数来使用)

## 原文链接
[https://segmentfault.com/a/1190000010280423](https://segmentfault.com/a/1190000010280423)


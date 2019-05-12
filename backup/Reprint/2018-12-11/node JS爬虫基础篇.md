---
title: 'node JS爬虫基础篇' 
date: 2018-12-11 2:30:10
hidden: true
slug: u3t1cy6yqk
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>项目中一直用不到node,但是觉得node这门以js作为编程基础的服务端语言很有意思,用它可以写一些接口,写个爬虫.这是一门基础篇,看了一段时间文档后写个爬虫增强一下node的认识吧</blockquote>
<h4>爬虫的原理感觉很简单,大致分为一下三步</h4>
<ol>
<li>获取到对应网站的数据(也就是html代码)</li>
<li>筛选出你需要的数据(比如用户的信息,图片的地址)</li>
<li>下载或者整理出你所要的资源写入数据库</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http=require('http')
var fs  =require('fs')
var path=require('path')
http.get('http://jspang.com/',function(res){
    var content=''
    res.on('data',function(txt){
        content+=txt
    })

    res.on('end',function(){
        var reg=/data-src=&quot;(.*?\.jpg)&quot;/img;//匹配出图片地址
        // var data=content.match(reg);
        // fs.writeFile('./test.txt',data,function(){
        //     console.log('写入成功')
        // })

        var filename=null;
        //循环出图片地址
        while(filename=reg.exec(content)){
            getImage(filename[1])
        }
    })
})
//下载图片
function getImage(url){
    var obj=path.parse(url);
    var name=obj.base;
    var filestream=fs.createWriteStream('./img/'+name);
    http.get(url,function(res){
        res.pipe(filestream)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> http=<span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>)
<span class="hljs-built_in">var</span> fs  =<span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-built_in">var</span> path=<span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
http.get(<span class="hljs-string">'http://jspang.com/'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
    <span class="hljs-built_in">var</span> content=<span class="hljs-string">''</span>
    res.on(<span class="hljs-string">'data'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">txt</span>)</span>{
        content+=txt
    })

    res.on(<span class="hljs-string">'end'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">var</span> reg=<span class="hljs-regexp">/data-src="(.*?\.jpg)"/img</span>;<span class="hljs-comment">//匹配出图片地址</span>
        <span class="hljs-comment">// var data=content.match(reg);</span>
        <span class="hljs-comment">// fs.writeFile('./test.txt',data,function(){</span>
        <span class="hljs-comment">//     console.log('写入成功')</span>
        <span class="hljs-comment">// })</span>

        <span class="hljs-built_in">var</span> filename=<span class="hljs-literal">null</span>;
        <span class="hljs-comment">//循环出图片地址</span>
        <span class="hljs-keyword">while</span>(filename=reg.exec(content)){
            getImage(filename[<span class="hljs-number">1</span>])
        }
    })
})
<span class="hljs-comment">//下载图片</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getImage</span>(<span class="hljs-params">url</span>)</span>{
    <span class="hljs-built_in">var</span> obj=path.parse(<span class="hljs-built_in">url</span>);
    <span class="hljs-built_in">var</span> name=obj.base;
    <span class="hljs-built_in">var</span> filestream=fs.createWriteStream(<span class="hljs-string">'./img/'</span>+name);
    http.get(<span class="hljs-built_in">url</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
        res.pipe(filestream)
    })
}</code></pre>
<h5>当然这只是个最简单的demo了,下面会持续更新进阶版的！</h5>
<blockquote>市面上的框架千变万化，只有基础知识比较好才能够学习的更好，而且需要多学习一下性能优化，网络，安全这方面，因为在大公司里面，其实重要的东西并不是你能够做的多好看，而是你的安全性那些做的好不好，一不小心信息泄露了，那就会导致很多无法想象的事情。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node JS爬虫基础篇

## 原文链接
[https://segmentfault.com/a/1190000013629643](https://segmentfault.com/a/1190000013629643)


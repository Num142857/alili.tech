---
title: 'js数组如何遍历一次，删除部分元素' 
date: 2019-02-06 2:30:09
hidden: true
slug: msgcr1wkx0b
categories: [reprint]
---

{{< raw >}}

                    
<p>经常做后台取数据，渲染到页面工作的前端童鞋可能都碰到过这种需求：那就是如果后台传给前端的数据要二次处理，一个数组，其中具有某种共同特征的元素是我们不需要的，必须要把它删除掉，这时候怎么做呢。</p>
<p>常见的思路是：先用map方法遍历一次，或其它方法遍历，总之是把要去掉的元素改成undefined，然后再遍历新数组，把undefined的元素去掉。总之就是非常麻烦。<br>那么有没有遍历一次就可以把没用的元素去掉的办法呢？<br>有的，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var arr = [
{
    status:0
},{
    status:1
},{
    status:0
},{
    status:0
},{
    status:0
},{
    status:3
},{
    status:0
},{
    status:7
},{
    status:0
},{
    status:2
}];
            
console.log(arr);
            
for(var i=0,flag=true,len=arr.length;i<len;flag ? i++ : i){
        
   if( arr[i]&amp;&amp;arr[i].status==0 ){
        arr.splice(i,1);
        flag = false;
    } else {
        flag = true;
    }

}
console.log(arr);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>
<span class="hljs-built_in">var</span> arr = [
{
    <span class="hljs-built_in">status</span>:<span class="hljs-number">0</span>
},{
    <span class="hljs-built_in">status</span>:<span class="hljs-number">1</span>
},{
    <span class="hljs-built_in">status</span>:<span class="hljs-number">0</span>
},{
    <span class="hljs-built_in">status</span>:<span class="hljs-number">0</span>
},{
    <span class="hljs-built_in">status</span>:<span class="hljs-number">0</span>
},{
    <span class="hljs-built_in">status</span>:<span class="hljs-number">3</span>
},{
    <span class="hljs-built_in">status</span>:<span class="hljs-number">0</span>
},{
    <span class="hljs-built_in">status</span>:<span class="hljs-number">7</span>
},{
    <span class="hljs-built_in">status</span>:<span class="hljs-number">0</span>
},{
    <span class="hljs-built_in">status</span>:<span class="hljs-number">2</span>
}];
            
console.<span class="hljs-built_in">log</span>(arr);
            
<span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>,flag=<span class="hljs-literal">true</span>,len=arr.<span class="hljs-built_in">length</span>;i&lt;len;flag ? i++ : i){
        
   <span class="hljs-keyword">if</span>( arr[i]&amp;&amp;arr[i].<span class="hljs-built_in">status</span>==<span class="hljs-number">0</span> ){
        arr.<span class="hljs-built_in">splice</span>(i,<span class="hljs-number">1</span>);
        flag = <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">else</span> {
        flag = <span class="hljs-literal">true</span>;
    }

}
console.<span class="hljs-built_in">log</span>(arr);
</code></pre>
<p>只需要一个简单的for循环就搞定啦。</p>
<p>我在for循环里设了个 flag 标志，并在后面的 i++ 位置做了判断，flag为true则加，为false则不变。<br>这样就可以解决，splice方法删掉一个元素后，后面紧邻的元素不会被遍历到的问题。<br>特别注意，for循环里面的 if 要先判断一下 arr[i] 的存在与否。</p>
<p>我目前测试的这种办法是没有漏洞的，如果大家用的时候发现有任何漏洞的话，希望能回复告知我一下，或者哪位大神有更好的实现这种需求的办法，麻烦在评论里写出来，大家一起探讨，共同进步！<br>深知sf里大神很多，小弟就不在这里过多废话了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js数组如何遍历一次，删除部分元素

## 原文链接
[https://segmentfault.com/a/1190000006115447](https://segmentfault.com/a/1190000006115447)


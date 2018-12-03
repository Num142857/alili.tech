---
title: '数组的foreach中操作数组' 
date: 2018-12-04 2:30:05
hidden: true
slug: ial5xhhsyhn
categories: [reprint]
---

{{< raw >}}

                    
<h3>在foreach中增加数组新元素</h3>
<p>在foreach中增加数组元素，不会导致循环增加，循环次数还是原来数组的长度。</p>
<pre><code>var arr=[1,2,3];
arr.forEach((item)=&gt;{
    
    if(item==2){
        arr.push(7);
        arr.push(8);
    }
    console.log(item);
});
console.log(arr.length);</code></pre>
<p>结果是：<code>1,2,3,5</code>,新增的7、8元素并没有被循环，但是数组的长度确实是增加了。</p>
<h3>在foreach中删除属于元素</h3>
<p>和增加不同的是，中数组中减少元素却会减少循环次数，并且删除的元素后面的元素会被“跳过”</p>
<pre><code>var arr=[1,2,3];
arr.forEach((item)=&gt;{
    if(item==2){
        arr.splice(1,1);
        
    }
    console.log(item);
});
console.log(arr.length);</code></pre>
<p>输出的结果：<code>1,2,2</code></p>
<blockquote>第二个被删除了，长度已经变成了2，所以循环到第二次就停止了，导致第三个元素没被循环，发生“跳过”现象。但由于删除时，获取到的当前元素已经是第二个，所以输出的还是2.</blockquote>
<h3>感觉总结的有价值的同学请点个赞，给个鼓励，给点动力，谢谢支持！！！</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
数组的foreach中操作数组

## 原文链接
[https://segmentfault.com/a/1190000014488802](https://segmentfault.com/a/1190000014488802)


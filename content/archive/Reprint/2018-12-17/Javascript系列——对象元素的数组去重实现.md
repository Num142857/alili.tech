---
title: 'Javascript系列——对象元素的数组去重实现' 
date: 2018-12-17 2:30:07
hidden: true
slug: kmp3r99a4va
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">概要</h3>
<p>这是一篇记录文，记录数组操作对象去重的实现。</p>
<h3 id="articleHeader1">需求</h3>
<p>有这样一个数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[{
    _id: 123,
    name: '张三'
},{
    _id: 124,
    name: '李四'
},{
    _id: 123,
    name: '张三'
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">[{
    _id: <span class="hljs-number">123</span>,
    name: '张三'
},{
    _id: <span class="hljs-number">124</span>,
    name: '李四'
},{
    _id: <span class="hljs-number">123</span>,
    name: '张三'
}]</code></pre>
<p>实际上我们只需要</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[{
    _id: 123,
    name: '张三'
},{
    _id: 124,
    name: '李四'
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">[{
    _id: <span class="hljs-number">123</span>,
    name: '张三'
},{
    _id: <span class="hljs-number">124</span>,
    name: '李四'
}]</code></pre>
<h3 id="articleHeader2">去重</h3>
<h4>简单数组的去重</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.from(new Set([1,1,2,3,4,4])) // [1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Array.from(new Set([<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">4</span>])) <span class="hljs-comment">// [1,2,3,4]</span></code></pre>
<h4>以对象为元素的数组去重</h4>
<p>和数组相关的算法多种多样，在你以为自己已经掌握数组之后，会发现很多和数组相关的算法仍旧很复杂。</p>
<p>下面我将讲述一个入门等级的数组算法，解决上面提出的需求。</p>
<p>1、定义一个函数removeRepeat，它需要传入2个参数，arr表示需要去重的数组，field表示需要比较的key。比如我们的需求是比较 _id 是否有重复。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function removeRepeat(arr, field){
    return arr
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeRepeat</span>(<span class="hljs-params">arr, field</span>)</span>{
    <span class="hljs-keyword">return</span> arr
}</code></pre>
<p>2、需要一个空数组，用来存储每个对象元素中field对应的value。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let s = []
for(let v of arr){
    s.push(v[field])
}
//s = [123, 124, 123]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> s = []
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr){
    s.push(v[field])
}
<span class="hljs-comment">//s = [123, 124, 123]</span></code></pre>
<p>3、将所有field的值存到数组之后，它们的下标一一对应原数组的下标（这点很重要），接着我们需要2个对象集合，result用来存储s里遍历出来的元素，如果有重复，就将重复的元素丢到reSet对象里面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let result = {}, reSet = {}
for(let i=0,len=s.length;i<len;i++){
    if(!result[s[i]] &amp;&amp; result[s[i]] !== 0) {
    //如果result不存在当前的key并且它不为0时
       result[s[i]] = i
    } else {
      reSet[s[i]] = i
    }
}
// result = {123: 0, 124: 1} 这是去重重复后的元素
// reSet = {123: 2} 我们将重复的元素123作为key，它的下标2作为value。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> result = {}, reSet = {}
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,len=s.length;i&lt;len;i++){
    <span class="hljs-keyword">if</span>(!result[s[i]] &amp;&amp; result[s[i]] !== <span class="hljs-number">0</span>) {
    <span class="hljs-comment">//如果result不存在当前的key并且它不为0时</span>
       result[s[i]] = i
    } <span class="hljs-keyword">else</span> {
      reSet[s[i]] = i
    }
}
<span class="hljs-comment">// result = {123: 0, 124: 1} 这是去重重复后的元素</span>
<span class="hljs-comment">// reSet = {123: 2} 我们将重复的元素123作为key，它的下标2作为value。</span></code></pre>
<p>4、上一步得到了result和reSet2个对象，那么，我们该用哪个对象来处理原数组的去重呢？只需要reSet，reSet记录了要去重的对象所在的下标，那么可以直接用splice干掉它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(let key in reSet){
    arr.splice(reSet[key], 1)
}
/* 
arr = [{
    _id: 123,
    name: '张三'
},{
    _id: 124,
    name: '李四'
}]
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> reSet){
    arr.splice(reSet[key], <span class="hljs-number">1</span>)
}
<span class="hljs-comment">/* 
arr = [{
    _id: 123,
    name: '张三'
},{
    _id: 124,
    name: '李四'
}]
*/</span></code></pre>
<p>5、说明</p>
<p>关键的第3和4步，都是用对象来处理，这样做的好处是时间复杂度可以达到O(1)，如果用数组来保存，则需要2个for循环，时间复杂度变成了O(n²)。</p>
<h3 id="articleHeader3">完整源码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function removeRepeat(arr, field){
    let s = [], result = {}, reSet = {}
    for(let v of arr){
        s.push(v[field])
    }
    for(let i=0,len=s.length;i<len;i++){
        if(!result[s[i]] &amp;&amp; result[s[i]] !== 0) {
           result[s[i]] = i
        } else {
          reSet[s[i]] = i
        }
    }
    for(let key in reSet){
        arr.splice(reSet[key], 1)
    }
    return arr
}

// removeRepeat(arr, '_id')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeRepeat</span>(<span class="hljs-params">arr, field</span>)</span>{
    <span class="hljs-keyword">let</span> s = [], result = {}, reSet = {}
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr){
        s.push(v[field])
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,len=s.length;i&lt;len;i++){
        <span class="hljs-keyword">if</span>(!result[s[i]] &amp;&amp; result[s[i]] !== <span class="hljs-number">0</span>) {
           result[s[i]] = i
        } <span class="hljs-keyword">else</span> {
          reSet[s[i]] = i
        }
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> reSet){
        arr.splice(reSet[key], <span class="hljs-number">1</span>)
    }
    <span class="hljs-keyword">return</span> arr
}

<span class="hljs-comment">// removeRepeat(arr, '_id')</span></code></pre>
<h3 id="articleHeader4">补充</h3>
<p>受到各路大神的解法影响，我也针对上面代码的不足做了修改。</p>
<p><strong>1、更简洁的代码。</strong></p>
<p><strong>2、支持多个重复对象的去重，缺点是会改变原来的排序。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const removeRepeat = (arr, field) => {
    let s = {}
    for(let i=0,len=arr.length;i<len;i++){
        s[arr[i][field]] = arr[i]
    }
    return Object.values(s)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> removeRepeat = <span class="hljs-function">(<span class="hljs-params">arr, field</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> s = {}
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,len=arr.length;i&lt;len;i++){
        s[arr[i][field]] = arr[i]
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.values(s)
}</code></pre>
<h3 id="articleHeader5">总结</h3>
<p>数组还有各种有趣的操作，也经常作为各大公司考察的题型之重，多练习和数组相关的算法会很有帮助。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript系列——对象元素的数组去重实现

## 原文链接
[https://segmentfault.com/a/1190000012873968](https://segmentfault.com/a/1190000012873968)


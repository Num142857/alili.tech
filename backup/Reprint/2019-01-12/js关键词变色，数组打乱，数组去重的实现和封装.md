---
title: 'js关键词变色，数组打乱，数组去重的实现和封装' 
date: 2019-01-12 2:30:24
hidden: true
slug: 6splyzrz2df
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>今天，把自己之前封装过的一部分小功能操作分享出现，都是一些可以说是比较常用，实现起来比较简单，代码又比较少的一些功能或操作，比如关键词变色，数组打乱，数组去重等。</p>
<h2 id="articleHeader1">2.关键词变色</h2>
<p>这个功能很常见，特别是在搜索引擎执行搜索的时候。其它不多说了，直接上代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
<meta charset=&quot;utf-8&quot;>
<title>关键词变色</title> 
<style type=&quot;text/css&quot;> 
span{color:red} 
</style> 
<script type=&quot;text/javascript&quot;>
//创建正则字符
function createExp(strArr)
{
  var str=&quot;&quot;;
  for(var i=0;i<strArr.length;i++)
  {
    if(i!=strArr.length-1)
    {
      str=str+strArr[i]+&quot;|&quot;;
    }
    else
    {
      str=str+strArr[i];
    }
  }
  
  return &quot;(&quot;+str+&quot;)&quot;;
}
//替换标签，往关键字前后加上标签
function findKey(key,id)
{
  var arr=null;
  var regStr=null;
  var content=null;
  var Reg=null;
  var theObj=document.getElementById(id);
  arr=key.split(/\s+/);
  regStr=createExp(arr);
  //alert(regStr); //    如：(前端|过来)
  content=theObj.innerHTML;
  //过滤html标签
  content=content.replace(/<\/?[^>]*>/g,'');
  Reg=new RegExp(regStr,&quot;g&quot;);
  //alert(Reg);//        /如：(前端|过来)/g
  theObj.innerHTML=content.replace(Reg,&quot;<span>$1</span>&quot;);
}
window.onload=function()
{
  var btn=document.getElementById(&quot;btn&quot;);
  btn.onclick=function(){
      var key=document.getElementById(&quot;text&quot;).value;
      findKey(key,&quot;thediv&quot;);
  }
}
</script>
</head> 
<body> 
<div id=&quot;thediv&quot;>前端工程师新人在前端的道路上还有很多路要走，比如一些刚在学校读出来的前端，最需的是真正的看一场真实的前端开发项目过程（个人觉得这个非常有必要），其次，前端的覆盖面非常广，要了解的知识也非常多，所以如果能得到过来人的前端工程师网的一些建议性的话，将是帮助很大的。以下摘自一个前端工程师过来人的一点感悟。</div>
<input type=&quot;text&quot; id=&quot;text&quot; /><input type=&quot;button&quot; value=&quot;搜索&quot; id=&quot;btn&quot; />
</body> 
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>关键词变色<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css"> 
<span class="hljs-selector-tag">span</span>{<span class="hljs-attribute">color</span>:red} 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-comment">//创建正则字符</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createExp</span>(<span class="hljs-params">strArr</span>)
</span>{
  <span class="hljs-keyword">var</span> str=<span class="hljs-string">""</span>;
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;strArr.length;i++)
  {
    <span class="hljs-keyword">if</span>(i!=strArr.length<span class="hljs-number">-1</span>)
    {
      str=str+strArr[i]+<span class="hljs-string">"|"</span>;
    }
    <span class="hljs-keyword">else</span>
    {
      str=str+strArr[i];
    }
  }
  
  <span class="hljs-keyword">return</span> <span class="hljs-string">"("</span>+str+<span class="hljs-string">")"</span>;
}
<span class="hljs-comment">//替换标签，往关键字前后加上标签</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findKey</span>(<span class="hljs-params">key,id</span>)
</span>{
  <span class="hljs-keyword">var</span> arr=<span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> regStr=<span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> content=<span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> Reg=<span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> theObj=<span class="hljs-built_in">document</span>.getElementById(id);
  arr=key.split(<span class="hljs-regexp">/\s+/</span>);
  regStr=createExp(arr);
  <span class="hljs-comment">//alert(regStr); //    如：(前端|过来)</span>
  content=theObj.innerHTML;
  <span class="hljs-comment">//过滤html标签</span>
  content=content.replace(<span class="hljs-regexp">/&lt;\/?[^&gt;]*&gt;/g</span>,<span class="hljs-string">''</span>);
  Reg=<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regStr,<span class="hljs-string">"g"</span>);
  <span class="hljs-comment">//alert(Reg);//        /如：(前端|过来)/g</span>
  theObj.innerHTML=content.replace(Reg,<span class="hljs-string">"&lt;span&gt;$1&lt;/span&gt;"</span>);
}
<span class="hljs-built_in">window</span>.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)
</span>{
  <span class="hljs-keyword">var</span> btn=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
  btn.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">var</span> key=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"text"</span>).value;
      findKey(key,<span class="hljs-string">"thediv"</span>);
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"thediv"</span>&gt;</span>前端工程师新人在前端的道路上还有很多路要走，比如一些刚在学校读出来的前端，最需的是真正的看一场真实的前端开发项目过程（个人觉得这个非常有必要），其次，前端的覆盖面非常广，要了解的知识也非常多，所以如果能得到过来人的前端工程师网的一些建议性的话，将是帮助很大的。以下摘自一个前端工程师过来人的一点感悟。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text"</span> /&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"搜索"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>运行一下</p>
<p><span class="img-wrap"><img data-src="/img/bVPoK3?w=1364&amp;h=119" src="https://static.alili.tech/img/bVPoK3?w=1364&amp;h=119" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>就是要这个效果！<br>实现原理和过程：首先，点击按钮的时候获取文本框的value，通过以空格分割，变成一个数组（<code>arr=key.split(/\s+/);</code>），然后把数组传到<code>createExp()</code>，创建一个正则的字符，比如上面就是传<code>['前端','过来']</code>，然后<code>createExp()</code>就会返回<code>(前端|过来)</code>，再到就是通过创建一个正则<code>(前端|过来)/g</code>，最后就是把<code>#thediv</code>的内容进行正则匹配，比如：所有‘前端’就会被替换成&lt;span&gt;前端&lt;/span&gt;。<br>这里值得注意的一点，就是，进行正则匹配之前，一定要过滤掉内容的html标签，避免影响下一次的运行，如果不过滤，就是这个bug</p>
<p><span class="img-wrap"><img data-src="/img/bVPoMM?w=1366&amp;h=141" src="https://static.alili.tech/img/bVPoMM?w=1366&amp;h=141" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>大家都看到了吧，我只输入‘过来’，结果‘前端’也变色了，那是因为我输入‘过来’的时候，之前就输入过‘前端’运行了一次，下一次不清除就会有这个bug，清除了就没事了！</p>
<h2 id="articleHeader2">2.打乱数组</h2>
<p>打乱数组这个，也是比较常用吧，上代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function upsetOrder(arrOld,num){
        var result=[],_length=num||arrOld.length,arr;
        arr=Object.assign([],arrOld)
        for(var i=0,len=arr.length;i<len;i++){
            result.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]);
        }
        return result;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code> function upsetOrder(arrOld,<span class="hljs-built_in">num</span>){
        <span class="hljs-built_in">var</span> result=[],_length=<span class="hljs-built_in">num</span>||arrOld.<span class="hljs-built_in">length</span>,arr;
        arr=Object.assign([],arrOld)
        <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>,len=arr.<span class="hljs-built_in">length</span>;i&lt;len;i++){
            result.<span class="hljs-built_in">push</span>(arr.<span class="hljs-built_in">splice</span>(Math.<span class="hljs-built_in">floor</span>(Math.<span class="hljs-built_in">random</span>()*arr.<span class="hljs-built_in">length</span>),<span class="hljs-number">1</span>)[<span class="hljs-number">0</span>]);
        }
        <span class="hljs-built_in">return</span> result;
    }</code></pre>
<p>运行一下</p>
<p><span class="img-wrap"><img data-src="/img/bVPoO6?w=615&amp;h=229" src="https://static.alili.tech/img/bVPoO6?w=615&amp;h=229" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>实现原理和过程：核心代码就是<code>result.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]);</code>，这个的原理就是每一次往<code>result</code>里面<code>push</code>一个元素，这个元素是从<code>arr</code>里面随便获取的。<br>这里值得注意的一点，<code>arr=Object.assign([],arrOld)</code>这行代码就是为了，打乱的结果不影响原来的数组。比如传进来时[1,2,3]，执行了原来的数组还是[1,2,3]。只是产生了一个新的打乱的数组而已。</p>
<h2 id="articleHeader3">3.数组去重</h2>
<p>数组去重，相信大家遇到的就多了，无论是面试题还是项目需要，多少都会遇到过。去重的方法很多，我主要说两种方法。</p>
<h3 id="articleHeader4">第一种</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function removeReapt(arrOld){
    var arr=[];
    for(var i=0,len=arrOld.length;i<len;i++){
        if(arr.indexOf(arrOld[i])==-1){
            arr.push(arrOld[i]);
        }
    }
    return arr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeReapt</span><span class="hljs-params">(arrOld)</span>{</span>
    var arr=[];
    <span class="hljs-keyword">for</span>(var <span class="hljs-built_in">i</span>=<span class="hljs-number">0</span>,len=arrOld.<span class="hljs-built_in">length</span>;<span class="hljs-built_in">i</span>&lt;len;<span class="hljs-built_in">i</span>++){
        if(arr.indexOf(arrOld[i])==<span class="hljs-number">-1</span>){
            arr.push(arrOld[i]);
        }
    }
    <span class="hljs-keyword">return</span> arr;
}</code></pre>
<p>运行一下</p>
<p><span class="img-wrap"><img data-src="/img/bVPoQb?w=395&amp;h=45" src="https://static.alili.tech/img/bVPoQb?w=395&amp;h=45" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这个的实现原理和过程没什么好说的了，就是遍历原来的数组<code>arrOld</code>，判断arr有没有当前遍历到的数组元素，没有加添加进去。</p>
<h3 id="articleHeader5">第二种</h3>
<p>第一种方法，表面上看是一层循环，但实际可以说是两层，至少在运行速度上是两层循环的速度。因为<code>indexOf</code>这个方法也是逐个比较的。所以我就再说第二种方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function removeReapt(arrOld){
    var arr= [];
    var json = {};
    for(var i = 0,len = arrOld.length; i < len; i++){
        if(!json[arrOld[i]]){
            arr.push(arrOld[i]);
            json[arrOld[i]] = 1;
        }
    }
    return arr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeReapt</span><span class="hljs-params">(arrOld)</span></span>{
    <span class="hljs-keyword">var</span> arr= [];
    <span class="hljs-keyword">var</span> json = {};
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,len = arrOld.length; i &lt; len; i++){
        <span class="hljs-keyword">if</span>(!json[arrOld[i]]){
            arr.push(arrOld[i]);
            json[arrOld[i]] = <span class="hljs-number">1</span>;
        }
    }
    <span class="hljs-keyword">return</span> arr;
}</code></pre>
<p>运行一下</p>
<p><span class="img-wrap"><img data-src="/img/bVPoRb?w=375&amp;h=39" src="https://static.alili.tech/img/bVPoRb?w=375&amp;h=39" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>效果一下样！</p>
<p>实现原理和过程:遍历原数组。每次从原数组中取出一个元素，然后到对象中去访问这个属性，如果能访问到值，则说明重复,如果访问不到，就是arr还没有没有这元素，就添加进去，同时把这个元素作为json的一个属性，并赋值为1。这个方法，我个人觉得比较效率比第一种方法好，也不安按理解，推荐这个写法。</p>
<h2 id="articleHeader6">后续</h2>
<p>关于js是实用或者常用的小功能操作，今天先到这里，以后再写其它的，希望能帮到大家！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js关键词变色，数组打乱，数组去重的实现和封装

## 原文链接
[https://segmentfault.com/a/1190000009827940](https://segmentfault.com/a/1190000009827940)


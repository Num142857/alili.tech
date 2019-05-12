---
title: 'js数组操作--使用迭代方法替代for循环' 
date: 2019-01-11 2:30:08
hidden: true
slug: 1ii7wjryy9t
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>数组的迭代方法，这个想必大家都不陌生了，可能刚入门的人暂时还没接触到这个。但是以后的开发中，肯定会用得上的。我自身的一个使用经历就是，如果迭代方法用的适当，不但可以减少代码量，也能使代码可读性更强，性能上的优化也是肯定的了。还有一个就是，我本身在数组的遍历上，基本都是用for循环进行操作，在开始使用了迭代方法之后，我for循环用的很少。如果以后我更加熟练迭代方法的话，for使用会更少，也希望这样能帮助大家学习迭代方法。</p>
<h2 id="articleHeader1">1.Map</h2>
<p>map():对数组中每一项运行给定函数。返回每次函数调用的结果组成的数组。<br>map就是我用的最多的一个了。首页设想以下一个场景，给出一个数组，需求就是给数组的每一项都*2。<br><strong>for方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr=[1,2,3,4,5,6];
for(let i=0,len=arr.length;i<len;i++){
    arr[i]=arr[i]*2
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let arr=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];
for(let i=<span class="hljs-number">0</span>,len=arr.length;i&lt;len;i++){
    arr[i]=arr[i]*<span class="hljs-number">2</span>
}
</code></pre>
<p><strong>map方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*item为当前遍历到的项,和arr[i]一样*/
arr=arr.map(function(item){return item*2});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/*item为当前遍历到的项,和arr[i]一样*/</span>
arr=arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span></span>{<span class="hljs-keyword">return</span> item*<span class="hljs-number">2</span>});</code></pre>
<p><strong>es6写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr=arr.map(item=>{return item*2});
//或者
arr=arr.map(item=>item*2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>arr=arr.map(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>{<span class="hljs-keyword">return</span> item*<span class="hljs-number">2</span>});
<span class="hljs-comment">//或者</span>
arr=arr.map(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>item*<span class="hljs-number">2</span>);</code></pre>
<p>这个需求比较简单，可能看不出多实用，下面再看一下，给一个对象数组，比如：数组包含一些运动员的信息，记录着运动员的姓名和是否签到的信息，如果哪个球员的签到信息<code>isHell</code>为空，就把isHell的值设置为'--'</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//name:姓名，isHell：是否签到

var sporter=[{
    name:'aa',
    isHell:null
},{
    name:'bb',
    isHell:null
},{
    name:'bb',
    isHell:true
}];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//name:姓名，isHell：是否签到</span>

<span class="hljs-string">var</span> <span class="hljs-string">sporter=[{</span>
<span class="hljs-attr">    name:</span><span class="hljs-string">'aa'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    isHell:</span><span class="hljs-literal">null</span>
<span class="hljs-string">},{</span>
<span class="hljs-attr">    name:</span><span class="hljs-string">'bb'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    isHell:</span><span class="hljs-literal">null</span>
<span class="hljs-string">},{</span>
<span class="hljs-attr">    name:</span><span class="hljs-string">'bb'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    isHell:</span><span class="hljs-literal">true</span>
<span class="hljs-string">}];</span></code></pre>
<p><strong>for方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0,len=sporter.length;i<len;i++){
    if(!sporter[i].isHell){sporter[i].isHell='--';}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,<span class="hljs-built_in">len</span>=sporter.length;i&lt;<span class="hljs-built_in">len</span>;i++){
    <span class="hljs-keyword">if</span>(!sporter[i].isHell){sporter[i].isHell=<span class="hljs-string">'--'</span>;}
}</code></pre>
<p><strong>map方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*item为当前遍历到的项,和arr[i]一样*/
sporter.map(function (item) {
    if(!item.isHell){item.isHell='--';}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>/*<span class="hljs-literal">item</span>为当前遍历到的项,和arr[i]一样*/
sporter.<span class="hljs-keyword">map</span>(<span class="hljs-keyword">function</span> (<span class="hljs-literal">item</span>) {
    if(!item.isHell){item.isHell=<span class="hljs-string">'--'</span>;}
});</code></pre>
<p><strong>es6写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sporter.map(item=> {
    if(!item.isHell){item.isHell='--';}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>sporter.<span class="hljs-keyword">map</span>(<span class="hljs-literal">item</span>=&gt; {
    if(!item.isHell){item.isHell=<span class="hljs-string">'--'</span>;}
});</code></pre>
<p>运行一下，目的达到了</p>
<p><span class="img-wrap"><img data-src="/img/bVPzoY?w=434&amp;h=259" src="https://static.alili.tech/img/bVPzoY?w=434&amp;h=259" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>map还有一个较常用的场景，也用上面那个数组，但是现在需要每一个球员的名字，不管他是否有签到。<br><strong>for方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=[];
for(var i=0,len=sporter.length;i<len;i++){
    arr.push(sporter[i].name);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">var</span> arr=[];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,<span class="hljs-built_in">len</span>=sporter.length;i&lt;<span class="hljs-built_in">len</span>;i++){
    arr.push(sporter[i].name);
}</code></pre>
<p><strong>map方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*item为当前遍历到的项,和arr[i]一样*/
var arr=sporter.map(function (item){return item.name})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/*item为当前遍历到的项,和arr[i]一样*/</span>
<span class="hljs-keyword">var</span> arr=sporter.map(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item)</span></span>{<span class="hljs-keyword">return</span> item.name})</code></pre>
<p><strong>es6写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sporter.map(item=> {return item.name;});
//或者
sporter.map(item=>item.name);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>sporter.map(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span> {<span class="hljs-keyword">return</span> item.name;});
<span class="hljs-comment">//或者</span>
sporter.map(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>item.name);</code></pre>
<p>运行结果<br><span class="img-wrap"><img data-src="/img/bVPzrx?w=325&amp;h=42" src="https://static.alili.tech/img/bVPzrx?w=325&amp;h=42" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">2.Filter</h2>
<p>filter():对数组中的每一项运行给定函数。返回该函数会返回true的项组成的数组。<br>Filter的用法也是很多，还是用上面的数组，但是我现在要拿到已经签到了的球员，不要没签到的球员。<br><strong>for方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=[];
for(var i=0,len=sporter.length;i<len;i++){
    if(sporter[i].isHell){
        arr.push(sporter[i]);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">var</span> arr=[];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,<span class="hljs-built_in">len</span>=sporter.length;i&lt;<span class="hljs-built_in">len</span>;i++){
    <span class="hljs-keyword">if</span>(sporter[i].isHell){
        arr.push(sporter[i]);
    }
}</code></pre>
<p><strong>filter方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*item为当前遍历到的项,和arr[i]一样*/
var arr=sporter.filter(function (item){return item.isHell})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/*item为当前遍历到的项,和arr[i]一样*/</span>
<span class="hljs-keyword">var</span> arr=sporter.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item)</span></span>{<span class="hljs-keyword">return</span> item.isHell})</code></pre>
<p><strong>es6写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=sporter.filter(item=>{return item.isHell})
//或者
var arr=sporter.filter(item=>item.isHell)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr=sporter.filter(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>{<span class="hljs-keyword">return</span> item.isHell})
<span class="hljs-comment">//或者</span>
<span class="hljs-keyword">var</span> arr=sporter.filter(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>item.isHell)</code></pre>
<p>运行一下</p>
<p><span class="img-wrap"><img data-src="/img/bVPzw3?w=389&amp;h=203" src="https://static.alili.tech/img/bVPzw3?w=389&amp;h=203" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>数组去重<br><strong>for方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var r=[],arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
for(var i=0,len=arr.length;i<len;i++){
    if(r.indexOf(arr[i])===-1){
        r.push(arr[i]);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">var</span> r=[],arr = [<span class="hljs-string">'apple'</span>, <span class="hljs-string">'strawberry'</span>, <span class="hljs-string">'banana'</span>, <span class="hljs-string">'pear'</span>, <span class="hljs-string">'apple'</span>, <span class="hljs-string">'orange'</span>, <span class="hljs-string">'orange'</span>, <span class="hljs-string">'strawberry'</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,<span class="hljs-built_in">len</span>=arr.length;i&lt;<span class="hljs-built_in">len</span>;i++){
    <span class="hljs-keyword">if</span>(r.indexOf(arr[i])===<span class="hljs-number">-1</span>){
        r.push(arr[i]);
    }
}</code></pre>
<p><strong>filter方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*item为当前遍历到的项,和arr[i]一样，index为当前遍历到的项的索引，和i一样，self就是当前数组，和arr一样*/
r=arr.filter(function(item,index,self){
    return self.indexOf(item) == index;
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code><span class="hljs-comment">/*item为当前遍历到的项,和arr[i]一样，index为当前遍历到的项的索引，和i一样，self就是当前数组，和arr一样*/</span>
r=arr.filter(function(item,<span class="hljs-keyword">index</span>,<span class="hljs-keyword">self</span>){
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span>.indexOf(item) == <span class="hljs-keyword">index</span>;
});
</code></pre>
<p><strong>es6写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=sporter.filter((item,index,self)=>{return self.indexOf(item) == index;})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code style="word-break: break-word; white-space: initial;">var arr=sporter.filter((item,<span class="hljs-keyword">index</span>,<span class="hljs-keyword">self</span>)=&gt;{<span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span>.indexOf(item) == <span class="hljs-keyword">index</span>;})</code></pre>
<p>运行一下</p>
<p><span class="img-wrap"><img data-src="/img/bVPzw8?w=772&amp;h=125" src="https://static.alili.tech/img/bVPzw8?w=772&amp;h=125" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">3.Every和Some</h2>
<p>Every和Some为什么要一起写呢，因为这两个方法很像。<br><code>every()</code>对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true ;<br><code>some()</code>对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true;<br>还是上面那个<code>sporter</code>数组。可以设想这个场景，运动员进场如果需要每一个球员都必须签到，球队才能进场，实现这个需求就是<br><strong>for方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isIn;
for(var i=0,len=sporter.length;i<len;i++){
    if(!sporter[i].isHell){
        isIn=false;
        break;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">var</span> isIn;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,<span class="hljs-built_in">len</span>=sporter.length;i&lt;<span class="hljs-built_in">len</span>;i++){
    <span class="hljs-keyword">if</span>(!sporter[i].isHell){
        isIn=<span class="hljs-literal">false</span>;
        <span class="hljs-keyword">break</span>;
    }
}</code></pre>
<p><strong>every方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*item为当前遍历到的项,和sporter[i]一样*/
var arr=sporter.every(function (item){return item.isHell})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/*item为当前遍历到的项,和sporter[i]一样*/</span>
<span class="hljs-keyword">var</span> arr=sporter.every(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item)</span></span>{<span class="hljs-keyword">return</span> item.isHell})</code></pre>
<p><strong>es6写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=sporter.every(item=>{return item.isHell})
//或者
var arr=sporter.every(item=>item.isHell)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr=sporter.every(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>{<span class="hljs-keyword">return</span> item.isHell})
<span class="hljs-comment">//或者</span>
<span class="hljs-keyword">var</span> arr=sporter.every(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>item.isHell)</code></pre>
<p>运行一下，由于上面数组还有两个运动员没签到，所以返回<code>false</code>,暂时也不能进场</p>
<p><span class="img-wrap"><img data-src="/img/bVPzzl?w=653&amp;h=104" src="https://static.alili.tech/img/bVPzzl?w=653&amp;h=104" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>另一个场景，运动员进场只需要球队任意一个运动员签到，球队就能进场，实现这个需求就是</p>
<p><strong>for方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isIn;
for(var i=0,len=sporter.length;i<len;i++){
    if(!sporter[i].isHell){
        isIn=true;
        break;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">var</span> isIn;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,<span class="hljs-built_in">len</span>=sporter.length;i&lt;<span class="hljs-built_in">len</span>;i++){
    <span class="hljs-keyword">if</span>(!sporter[i].isHell){
        isIn=<span class="hljs-literal">true</span>;
        <span class="hljs-keyword">break</span>;
    }
}</code></pre>
<p><strong>some方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*item为当前遍历到的项,和sporter[i]一样*/
var arr=sporter.some(function (item){return item.isHell})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/*item为当前遍历到的项,和sporter[i]一样*/</span>
<span class="hljs-keyword">var</span> arr=sporter.some(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item)</span></span>{<span class="hljs-keyword">return</span> item.isHell})</code></pre>
<p><strong>es6写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=sporter.some(item=>{return item.isHell})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr=sporter.some(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>{<span class="hljs-keyword">return</span> item.isHell})
</code></pre>
<p>运行一下，由于上面数组有个运动员签到了，所以返回<code>true</code>,可以进场</p>
<p><span class="img-wrap"><img data-src="/img/bVPzBQ?w=359&amp;h=81" src="https://static.alili.tech/img/bVPzBQ?w=359&amp;h=81" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">4.Foreach</h2>
<p><code>forEach()</code>对数组中的每一项运行给定函数，这个方法没有返回值 ;简单点来说，本质上跟for没有区别，只是写法不一样。<br>还是上面那个<code>sporter</code>数组。只是给每一个数字都加上一个属性sex,值都为‘男’<br><strong>for方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0,len=sporter.length;i<len;i++){
    sporter[i].sex='男'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-keyword">for</span>(var <span class="hljs-built_in">i</span>=<span class="hljs-number">0</span>,len=sporter.<span class="hljs-built_in">length</span>;<span class="hljs-built_in">i</span>&lt;len;<span class="hljs-built_in">i</span>++){
    sporter[i].sex=<span class="hljs-string">'男'</span>
}</code></pre>
<p><strong>forEach方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*item为当前遍历到的项,和arr[i]一样*/
var arr=sporter.forEach(function (item){item.sex='男'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">/*item为当前遍历到的项,和arr[i]一样*/</span>
<span class="hljs-keyword">var</span> arr=sporter.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item)</span></span>{item.sex=<span class="hljs-string">'男'</span>})</code></pre>
<p><strong>es6写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=sporter.forEach(item=>{item.sex='男'})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr=sporter.forEach(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>{item.sex=<span class="hljs-string">'男'</span>})
</code></pre>
<p>运行一下</p>
<p><span class="img-wrap"><img data-src="/img/bVPzD5?w=526&amp;h=306" src="https://static.alili.tech/img/bVPzD5?w=526&amp;h=306" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">5.Reduce</h2>
<p><code>reduce()</code>每次只能接受两个参数，我对着两个参数的理解就是，当前结果，和当前序列的下一项。作用效果和原理就是<code>[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)</code>。<br>这个方法一般用在累计累加上，实用技巧暂时还没发现。比如，数字数组求和，字符串数组连接上。<br>数字数组求和</p>
<p><strong>for方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum=0,arr=[1,2,3,4,5,6];
for(var i=0,len=arr.length;i<len;i++){
    sum+=arr[i]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var sum=<span class="hljs-number">0</span>,arr=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];
for(var i=<span class="hljs-number">0</span>,len=arr.length;i&lt;len;i++){
    sum+=arr[i]
}</code></pre>
<p><strong>forEach方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*item为当前遍历到的项,和arr[i]一样*/
sum=arr.reduce(function (a,b) {return a+b});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/*item为当前遍历到的项,和arr[i]一样*/</span>
sum=arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(a,b)</span> </span>{<span class="hljs-keyword">return</span> a+b});</code></pre>
<p><strong>es6写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sum=arr.reduce((a,b)=>{return a+b});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>sum=arr.reduce(<span class="hljs-function"><span class="hljs-params">(a,b)</span>=&gt;</span>{<span class="hljs-keyword">return</span> a+b});
</code></pre>
<p>运行一下</p>
<p><span class="img-wrap"><img data-src="/img/bVPzMi?w=258&amp;h=98" src="https://static.alili.tech/img/bVPzMi?w=258&amp;h=98" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>字符串数组连接，同样的写法，只是数组和结果不一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var arr=['字','符','串','数','组','连','接'];
 var sum=arr.reduce((a,b)=>{return a+b});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> arr=[<span class="hljs-string">'字'</span>,<span class="hljs-string">'符'</span>,<span class="hljs-string">'串'</span>,<span class="hljs-string">'数'</span>,<span class="hljs-string">'组'</span>,<span class="hljs-string">'连'</span>,<span class="hljs-string">'接'</span>];
 <span class="hljs-keyword">var</span> sum=arr.reduce(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>{<span class="hljs-keyword">return</span> a+b});
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVPzL1?w=371&amp;h=166" src="https://static.alili.tech/img/bVPzL1?w=371&amp;h=166" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">6.find和findIndex</h2>
<p><code>find</code>：方法返回传入一个测试条件（函数）符合条件的数组第一个元素。</p>
<p><code>findIndex</code>：方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。</p>
<p>当数组中的元素在测试条件时返回true时, find和findIndex返回符合条件的元素或者元素的索引位置，之后的值不会再调用执行函数。如果没有符合条件的元素返回 -1。</p>
<p>比如有一个需求，从[11,22,33,44,55,66]这个数组里面，找出第一个大于30的元素。</p>
<p><strong>for方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getItem,arr=[11,22,33,44,55,66];
for(var i=0,len=arr.length;i<len;i++){
    if(arr[i]>30){
        getItem=arr[i];
        break;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var getItem,arr=[<span class="hljs-number">11</span>,<span class="hljs-number">22</span>,<span class="hljs-number">33</span>,<span class="hljs-number">44</span>,<span class="hljs-number">55</span>,<span class="hljs-number">66</span>];
for(var i=<span class="hljs-number">0</span>,len=arr.length;i&lt;len;i++){
    if(arr[i]&gt;<span class="hljs-number">30</span>){
        getItem=arr[i];
        break;
    }
}</code></pre>
<p><strong>find</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.find(function(val){return val>30})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">arr.find(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(val)</span></span>{<span class="hljs-keyword">return</span> val&gt;<span class="hljs-number">30</span>})</code></pre>
<p><strong>es6写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.find(val=>val>30)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ocaml"><code>arr.find(<span class="hljs-keyword">val</span>=&gt;<span class="hljs-keyword">val</span>&gt;<span class="hljs-number">30</span>)
</code></pre>
<p>运行一下</p>
<p><span class="img-wrap"><img data-src="/img/bVYX7J?w=347&amp;h=246" src="https://static.alili.tech/img/bVYX7J?w=347&amp;h=246" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>比如有一个需求，从[11,22,33,44,55,66]这个数组里面，找出第一个大于30的元素的位置。</p>
<p><strong>for方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getItemIndex,arr=[11,22,33,44,55,66];
for(var i=0,len=arr.length;i<len;i++){
    if(arr[i]>30){
        getItemIndex=i;
        break;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var getItemIndex,arr=[<span class="hljs-number">11</span>,<span class="hljs-number">22</span>,<span class="hljs-number">33</span>,<span class="hljs-number">44</span>,<span class="hljs-number">55</span>,<span class="hljs-number">66</span>];
for(var i=<span class="hljs-number">0</span>,len=arr.length;i&lt;len;i++){
    if(arr[i]&gt;<span class="hljs-number">30</span>){
        getItemIndex=i;
        break;
    }
}</code></pre>
<p><strong>findIndex</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.findIndex(function(val){return val>30})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>arr.findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(val)</span></span>{<span class="hljs-keyword">return</span> val&gt;<span class="hljs-number">30</span>})
</code></pre>
<p><strong>es6写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.findIndex(val=>val>30)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ocaml"><code>arr.findIndex(<span class="hljs-keyword">val</span>=&gt;<span class="hljs-keyword">val</span>&gt;<span class="hljs-number">30</span>)
</code></pre>
<p>运行一下</p>
<p><span class="img-wrap"><img data-src="/img/bVYX7p?w=432&amp;h=207" src="https://static.alili.tech/img/bVYX7p?w=432&amp;h=207" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader7">后续</h1>
<p>今天的分享就到这里了，关于数组的迭代方法的使用技巧，上面说的是冰山一角，更多也是要靠大家自己去挖掘。以后如果又有发现什么好玩的，实用的，也会第一时间分享给大家。另外，如果觉得这篇文章哪里写错了，或者哪里写得不好，欢迎指出。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js数组操作--使用迭代方法替代for循环

## 原文链接
[https://segmentfault.com/a/1190000009870199](https://segmentfault.com/a/1190000009870199)


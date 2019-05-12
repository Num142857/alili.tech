---
title: 'ES5和ES6数组遍历方法详解' 
date: 2019-01-08 2:30:11
hidden: true
slug: 7tf0y981uyr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">ES5和ES6数组遍历方法详解</h1>
<h3 id="articleHeader1">在ES5中常用的10种数组遍历方法:</h3>
<blockquote>1、原始的for循环语句<br>2、Array.prototype.forEach数组对象内置方法<br>3、Array.prototype.map数组对象内置方法<br>4、Array.prototype.filter数组对象内置方法<br>5、Array.prototype.reduce数组对象内置方法<br>6、Array.prototype.some数组对象内置方法<br>7、Array.prototype.every数组对象内置方法<br>8、Array.prototype.indexOf数组对象内置方法<br>9、Array.prototype.lastIndexOf数组对象内置方法<br>10、for...in循环语句</blockquote>
<h3 id="articleHeader2">ES6中新增加了一种：</h3>
<blockquote>1.for...of循环语句</blockquote>
<h3 id="articleHeader3">ES5三种数组循环示例如下：</h3>
<h4>原始for循环语句</h4>
<p><strong>Example1</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
for(var i=0;i<a.length;i++){
    console.log(a[i]);  //结果依次为1，2，3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;a.length;i++){
    <span class="hljs-built_in">console</span>.log(a[i]);  <span class="hljs-comment">//结果依次为1，2，3</span>
}</code></pre>
<p><strong><em>代码解读：</em></strong>原始for循环的优点在于大家都比较熟悉，容易理解，劣势是写起来比较繁琐，需要定义额外更多的变量，所以一下是针对于原始for循环的改良的两种写法：<br><strong><em>Example1</em></strong>：写法改良版</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
for(var i=a.length;i--;){
    console.log(a[i]);  //结果依次为3，2，1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=a.length;i--;){
    <span class="hljs-built_in">console</span>.log(a[i]);  <span class="hljs-comment">//结果依次为3，2，1</span>
}</code></pre>
<p><strong><em>Example2</em></strong>：性能改良版</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
for(var i = 0,len=a.length; i < len; i++) {
   console.log(a[i]);  //结果依次为1，2，3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,len=a.length; i &lt; len; i++) {
   <span class="hljs-built_in">console</span>.log(a[i]);  <span class="hljs-comment">//结果依次为1，2，3</span>
}</code></pre>
<p><strong>注意</strong>:以上代码可以写成这样呢，如果懵逼了的话接着看原始for循环的解读,我们都知道for循环包含三个语句块——&gt;<strong>for(语句1；语句2；语句3）{被执行的代码}</strong>，其中，<strong>语句1</strong>一般为<strong>变量定义语句</strong>（不仅可以只定义一个变量哦），在<strong>循环开始前</strong>执行，而且<strong>只执行一次</strong>；<strong>语句2</strong>定义循环的是否继续执行的条件，同样也是在<strong>循环开始前</strong>执行，<strong>语句1</strong>之后执行，每次<strong>重新开始循环都会再次执行</strong>；<strong>语句3</strong>则在<strong>循环结束之后执行</strong>，并且<strong>每次结束的时候都会再次执行</strong>，这里要注意的是如果被执行的代码<strong>中途return</strong>出来了那是不会再执行一次<strong>语句3</strong>的，所以以上代码解释如下：因为<strong>i--</strong>这个语句在每次循环开始前都会再次先用 <strong>i</strong> 是true和false来判断是否继续执行，这里同样要注意的是由于<strong>i--</strong>和<strong>--i</strong>的区别，这里由于是<strong>i--</strong>所以会先判断i的值再去做‘减减’的操作，所以这里最后如果打印 <strong>i</strong> 的值，会发现其实是<strong>-1</strong>。</p>
<h4>数组内置方法Array.prototype.forEach</h4>
<p><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
a.forEach(function(value,key,arr){
  console.log(value)    // 结果依次为1，2，3
  console.log(key)      // 结尾依次为0，1，2
  console.log(arr)      // 三次结果都为[1,2,3]，该参数貌似没什么用
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
a.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,key,arr</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value)    <span class="hljs-comment">// 结果依次为1，2，3</span>
  <span class="hljs-built_in">console</span>.log(key)      <span class="hljs-comment">// 结尾依次为0，1，2</span>
  <span class="hljs-built_in">console</span>.log(arr)      <span class="hljs-comment">// 三次结果都为[1,2,3]，该参数貌似没什么用</span>
})</code></pre>
<p><strong><em>代码解读：</em></strong>forEach方法最大的好处就是便于使用，而且不用定义额外的参数变量，但是从效率以及性能角度来说它是劣于原始for循环的，而且也不能强制return结束循环，原因如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**forEach循环**一看就是通过**回调函数**来提供参数的，而回调函数在JS中是**闭包**的一种，闭包的作用是用来生成**私有作用域**的，所以，每一个回调函数都是一个**独立的作用域**，都拥有自己独立的存储空间，互不影响，而且内部变量还不及时释放，这也就是为什么在能不用闭包的情况下就不要用闭包的原因，而在闭包中return的话，也只是在当前回调函数中返回了，可是forEach中的其他的回调函数（闭包）仍然存在，所以，导致return是没办法结束循环的。下面写一个forEach循环实现例子供大家参考理解：
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>*<span class="hljs-strong">*forEach循环*</span><span class="hljs-strong">*一看就是通过*</span><span class="hljs-strong">*回调函数*</span><span class="hljs-strong">*来提供参数的，而回调函数在JS中是*</span><span class="hljs-strong">*闭包*</span><span class="hljs-strong">*的一种，闭包的作用是用来生成*</span><span class="hljs-strong">*私有作用域*</span><span class="hljs-strong">*的，所以，每一个回调函数都是一个*</span><span class="hljs-strong">*独立的作用域*</span><span class="hljs-strong">*，都拥有自己独立的存储空间，互不影响，而且内部变量还不及时释放，这也就是为什么在能不用闭包的情况下就不要用闭包的原因，而在闭包中return的话，也只是在当前回调函数中返回了，可是forEach中的其他的回调函数（闭包）仍然存在，所以，导致return是没办法结束循环的。下面写一个forEach循环实现例子供大家参考理解：
</span></code></pre>
<p><strong><em>Example</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.forEachCopy = function(callback){
    var arr =  this;
    for(var i=0;i<arr.length;i++){
        callback(arr[i],i,this);
    }
}
var a = [1,2,3];
a.forEachCopy(function(value,key,arr){
    console.log(value)    // 结果依次为1，2，3
    console.log(key)      // 结尾依次为0，1，2
    console.log(arr)      // 三次结果都为[1,2,3]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Array</span>.prototype.forEachCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{
    <span class="hljs-keyword">var</span> arr =  <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
        callback(arr[i],i,<span class="hljs-keyword">this</span>);
    }
}
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
a.forEachCopy(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,key,arr</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value)    <span class="hljs-comment">// 结果依次为1，2，3</span>
    <span class="hljs-built_in">console</span>.log(key)      <span class="hljs-comment">// 结尾依次为0，1，2</span>
    <span class="hljs-built_in">console</span>.log(arr)      <span class="hljs-comment">// 三次结果都为[1,2,3]</span>
})</code></pre>
<h4>数组内置方法Array.prototype.map</h4>
<p><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var b = a.map(function(value,key,arr){
    console.log(value)    // 结果依次为1，2，3
    console.log(key)      // 结尾依次为0，1，2
    console.log(arr)      // 三次结果都为[1,2,3]
    return value+1;
})
console.log(a); // 结果为[ 1, 2, 3 ]
console.log(b); // 结果为[ 2, 3, 4 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,key,arr</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value)    <span class="hljs-comment">// 结果依次为1，2，3</span>
    <span class="hljs-built_in">console</span>.log(key)      <span class="hljs-comment">// 结尾依次为0，1，2</span>
    <span class="hljs-built_in">console</span>.log(arr)      <span class="hljs-comment">// 三次结果都为[1,2,3]</span>
    <span class="hljs-keyword">return</span> value+<span class="hljs-number">1</span>;
})
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 结果为[ 2, 3, 4 ]</span></code></pre>
<p><strong><em>代码解读：</em></strong>map和forEach不同，在forEach中return语句是没有任何效果的，而map则可以<strong>改变当前循环的值</strong>，并且最终会<strong>返回一个新的被改变过值之后的数组</strong>（map如果不用return就和forEach一样了），由于这个特性，<strong>map一般用来处理需要修改某一个数组的值</strong>。map和forEach在其他的方面都是一样的，也不能return结束循环等特性，下面写一个map循环实现的例子供大家参考理解：<br><strong><em>Example</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.mapCopy = function(callback){
    var arr =  this;
    var arrCopy = [];
    for(var i=0;i<arr.length;i++){
        var cbValue = callback(arr[i],i,this);
        arrCopy.push(cbValue);
    }
    return arrCopy;
}
var a = [1,2,3];
var b = a.mapCopy(function(value,key,arr){
    console.log(value)    // 结果依次为1，2，3
    console.log(key)      // 结尾依次为0，1，2
    console.log(arr)      // 三次结果都为[1,2,3]
    return value+1;
})
console.log(a); // 结果为[ 1, 2, 3 ]
console.log(b); // 结果为[ 2, 3, 4 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Array</span>.prototype.mapCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{
    <span class="hljs-keyword">var</span> arr =  <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> arrCopy = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
        <span class="hljs-keyword">var</span> cbValue = callback(arr[i],i,<span class="hljs-keyword">this</span>);
        arrCopy.push(cbValue);
    }
    <span class="hljs-keyword">return</span> arrCopy;
}
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.mapCopy(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,key,arr</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value)    <span class="hljs-comment">// 结果依次为1，2，3</span>
    <span class="hljs-built_in">console</span>.log(key)      <span class="hljs-comment">// 结尾依次为0，1，2</span>
    <span class="hljs-built_in">console</span>.log(arr)      <span class="hljs-comment">// 三次结果都为[1,2,3]</span>
    <span class="hljs-keyword">return</span> value+<span class="hljs-number">1</span>;
})
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 结果为[ 2, 3, 4 ]</span></code></pre>
<h4>数组内置方法Array.prototype.filter</h4>
<p><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var b = a.filter(function(value,key,arr){
    console.log(value)    // 结果依次为1，2，3
    console.log(key)      // 结尾依次为0，1，2
    console.log(arr)      // 三次结果都为[1,2,3]
    if(value === 3){
      return false;
    }
    return true;
})
console.log(a); // 结果为[ 1, 2, 3 ]
console.log(b); // 结果为[ 1,2 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,key,arr</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value)    <span class="hljs-comment">// 结果依次为1，2，3</span>
    <span class="hljs-built_in">console</span>.log(key)      <span class="hljs-comment">// 结尾依次为0，1，2</span>
    <span class="hljs-built_in">console</span>.log(arr)      <span class="hljs-comment">// 三次结果都为[1,2,3]</span>
    <span class="hljs-keyword">if</span>(value === <span class="hljs-number">3</span>){
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
})
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 结果为[ 1,2 ]</span></code></pre>
<p><strong><em>代码解读：</em></strong>filter和map不同，map目的是为了<strong>改变值</strong>，而filter目的是为了<strong>去掉不要的值</strong>，在循环的时候如果返回的是false那么就表示本次循环的不添加该值，返回true则相反是表示要添加到新建的数组中，下面写一个filter循环实现例子供大家参考：<br><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.filterCopy = function(callback){
    var arr =  this;
    var arrCopy = [];
    for(var i=0;i<arr.length;i++){
        var cbValue = callback(arr[i],i,this);
        if(cbValue){
          arrCopy.push(arr[i]);
        }
    }
    return arrCopy;
}
var a = [1,2,3];
var b = a.filterCopy(function(value,key,arr){
    console.log(value)    // 结果依次为1，2，3
    console.log(key)      // 结尾依次为0，1，2
    console.log(arr)      // 三次结果都为[1,2,3]
    if(value === 3){
      return false;
    }
    return true;
})
console.log(a); // 结果为[ 1, 2, 3 ]
console.log(b); // 结果为[ 1,2 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Array</span>.prototype.filterCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{
    <span class="hljs-keyword">var</span> arr =  <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> arrCopy = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
        <span class="hljs-keyword">var</span> cbValue = callback(arr[i],i,<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">if</span>(cbValue){
          arrCopy.push(arr[i]);
        }
    }
    <span class="hljs-keyword">return</span> arrCopy;
}
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.filterCopy(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,key,arr</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value)    <span class="hljs-comment">// 结果依次为1，2，3</span>
    <span class="hljs-built_in">console</span>.log(key)      <span class="hljs-comment">// 结尾依次为0，1，2</span>
    <span class="hljs-built_in">console</span>.log(arr)      <span class="hljs-comment">// 三次结果都为[1,2,3]</span>
    <span class="hljs-keyword">if</span>(value === <span class="hljs-number">3</span>){
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
})
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 结果为[ 1,2 ]</span></code></pre>
<h4>数组内置方法Array.prototype.reduce</h4>
<p><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var b = a.reduce(function (count, value,key,arry) {
  console.log(count);   // 结果依次为0，1，3
  console.log(value);   // 结果依次为1，2，3
  console.log(key);     // 结果依次为0，1，2
  console.log(arry)     // 三次结果都为[1,2,3]
  return count + value;
},0);
console.log(a);         // 结果为[ 1, 2, 3 ]
console.log(b)          // 结果为6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">count, value,key,arry</span>) </span>{
  <span class="hljs-built_in">console</span>.log(count);   <span class="hljs-comment">// 结果依次为0，1，3</span>
  <span class="hljs-built_in">console</span>.log(value);   <span class="hljs-comment">// 结果依次为1，2，3</span>
  <span class="hljs-built_in">console</span>.log(key);     <span class="hljs-comment">// 结果依次为0，1，2</span>
  <span class="hljs-built_in">console</span>.log(arry)     <span class="hljs-comment">// 三次结果都为[1,2,3]</span>
  <span class="hljs-keyword">return</span> count + value;
},<span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b)          <span class="hljs-comment">// 结果为6</span></code></pre>
<p><strong><em>代码解读：</em></strong>reduce的不同之处在于累加，和其他几个内置方法不同的地方，它的第二个参数不是this对象，而是初始累加值（如果不设置的话数组会乱掉），而且回调函数的的个数也不同，比其他的多了一个，而且还在在开始的多加了一个参数，第一个参数记录的是上一次循环的累加值，下面写一个reduce循环实现例子供大家参考：<br><strong><em>Example</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.reduceCopy = function(callback,countInit){
    var arr =  this;
    for(var i=0;i<arr.length;i++){
        var cbValue = callback(countInit,arr[i],i,this);
        countInit = cbValue;
    }
    return countInit;
}
var a = [1,2,3];
var b = a.reduceCopy(function (count, value,key,arry) {
  console.log(count);   // 结果依次为0，1，3
  console.log(value);   // 结果依次为1，2，3
  console.log(key);     // 结果依次为0，1，2
  console.log(arry)     // 三次结果都为[1,2,3]
  return count + value;
},0);
console.log(a);         // 结果为[ 1, 2, 3 ]
console.log(b)          // 结果为6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Array</span>.prototype.reduceCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback,countInit</span>)</span>{
    <span class="hljs-keyword">var</span> arr =  <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
        <span class="hljs-keyword">var</span> cbValue = callback(countInit,arr[i],i,<span class="hljs-keyword">this</span>);
        countInit = cbValue;
    }
    <span class="hljs-keyword">return</span> countInit;
}
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.reduceCopy(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">count, value,key,arry</span>) </span>{
  <span class="hljs-built_in">console</span>.log(count);   <span class="hljs-comment">// 结果依次为0，1，3</span>
  <span class="hljs-built_in">console</span>.log(value);   <span class="hljs-comment">// 结果依次为1，2，3</span>
  <span class="hljs-built_in">console</span>.log(key);     <span class="hljs-comment">// 结果依次为0，1，2</span>
  <span class="hljs-built_in">console</span>.log(arry)     <span class="hljs-comment">// 三次结果都为[1,2,3]</span>
  <span class="hljs-keyword">return</span> count + value;
},<span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b)          <span class="hljs-comment">// 结果为6</span></code></pre>
<h4>数组内置方法Array.prototype.some</h4>
<p><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var b = a.some(function(value,key,arry){
  console.log(value);   // 结果依次为1，2
  console.log(key);     // 结果依次为0，1
  console.log(arry);    // 两次次结果都为[1,2,3]
  return value===2;
})
console.log(a);         // 结果为[ 1, 2, 3 ]
console.log(b);         // 结果为true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.some(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,key,arry</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value);   <span class="hljs-comment">// 结果依次为1，2</span>
  <span class="hljs-built_in">console</span>.log(key);     <span class="hljs-comment">// 结果依次为0，1</span>
  <span class="hljs-built_in">console</span>.log(arry);    <span class="hljs-comment">// 两次次结果都为[1,2,3]</span>
  <span class="hljs-keyword">return</span> value===<span class="hljs-number">2</span>;
})
<span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b);         <span class="hljs-comment">// 结果为true</span></code></pre>
<p><strong><em>代码解读：</em></strong>some的不同之处在它返回的布尔值，它的作用有点像filter，不过它的目的不是为了筛选返回数组，而是为了筛选该数组是否有满足你要的值，而且找到符合条件的值返回了一次true之后就不会再继续执行了，下面写一个some循环实现例子供大家参考：</p>
<p><strong><em>Example</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.someCopy = function(callback,countInit){
    var arr =  this;
    var isBool = false;
    for(var i=0;i<arr.length;i++){
        var cbValue = callback(arr[i],i,this);
        if(cbValue){
          isBool = true;
          return isBool
        }
    }
    return isBool;
}
var a = [1,2,3];
var b = a.someCopy(function(value,key,arry){
  console.log(value);   // 结果依次为1，2
  console.log(key);     // 结果依次为0，1
  console.log(arry);    // 两次次结果都为[1,2,3]
  return value===2;
})
console.log(a);         // 结果为[ 1, 2, 3 ]
console.log(b);         // 结果为true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Array</span>.prototype.someCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback,countInit</span>)</span>{
    <span class="hljs-keyword">var</span> arr =  <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> isBool = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
        <span class="hljs-keyword">var</span> cbValue = callback(arr[i],i,<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">if</span>(cbValue){
          isBool = <span class="hljs-literal">true</span>;
          <span class="hljs-keyword">return</span> isBool
        }
    }
    <span class="hljs-keyword">return</span> isBool;
}
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.someCopy(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,key,arry</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value);   <span class="hljs-comment">// 结果依次为1，2</span>
  <span class="hljs-built_in">console</span>.log(key);     <span class="hljs-comment">// 结果依次为0，1</span>
  <span class="hljs-built_in">console</span>.log(arry);    <span class="hljs-comment">// 两次次结果都为[1,2,3]</span>
  <span class="hljs-keyword">return</span> value===<span class="hljs-number">2</span>;
})
<span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b);         <span class="hljs-comment">// 结果为true</span></code></pre>
<h4>数组内置方法Array.prototype.every</h4>
<p><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var b = a.every(function(value,key,arry){
  console.log(value);   // 结果依次为1，2
  console.log(key);     // 结果依次为0，1
  console.log(arry);    // 两次次结果都为[1,2,3]
  return value===2;
})
console.log(a);         // 结果为[ 1, 2, 3 ]
console.log(b);         // 结果为false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.every(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,key,arry</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value);   <span class="hljs-comment">// 结果依次为1，2</span>
  <span class="hljs-built_in">console</span>.log(key);     <span class="hljs-comment">// 结果依次为0，1</span>
  <span class="hljs-built_in">console</span>.log(arry);    <span class="hljs-comment">// 两次次结果都为[1,2,3]</span>
  <span class="hljs-keyword">return</span> value===<span class="hljs-number">2</span>;
})
<span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b);         <span class="hljs-comment">// 结果为false</span></code></pre>
<p><strong><em>代码解读</em></strong>：其实从看例子可以看出来，some和every作用是一样的，只不过some当找到之后返回的是true，而every找到之后返回的是false而已,下面写一个every循环实现例子供大家参考：</p>
<p><strong><em>Example</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.everyCopy = function(callback){
    var arr =  this;
    var isBool = true;
    for(var i=0;i<arr.length;i++){
        var cbValue = callback(arr[i],i,this);
        if(cbValue){
          isBool = false;
          return isBool
        }
    }
    return isBool;
}
var a = [1,2,3];
var b = a.everyCopy(function(value,key,arry){
  console.log(value);   // 结果依次为1，2
  console.log(key);     // 结果依次为0，1
  console.log(arry);    // 两次次结果都为[1,2,3]
  return value===2;
})
console.log(a);         // 结果为[ 1, 2, 3 ]
console.log(b);         // 结果为false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Array</span>.prototype.everyCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{
    <span class="hljs-keyword">var</span> arr =  <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> isBool = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
        <span class="hljs-keyword">var</span> cbValue = callback(arr[i],i,<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">if</span>(cbValue){
          isBool = <span class="hljs-literal">false</span>;
          <span class="hljs-keyword">return</span> isBool
        }
    }
    <span class="hljs-keyword">return</span> isBool;
}
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.everyCopy(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,key,arry</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value);   <span class="hljs-comment">// 结果依次为1，2</span>
  <span class="hljs-built_in">console</span>.log(key);     <span class="hljs-comment">// 结果依次为0，1</span>
  <span class="hljs-built_in">console</span>.log(arry);    <span class="hljs-comment">// 两次次结果都为[1,2,3]</span>
  <span class="hljs-keyword">return</span> value===<span class="hljs-number">2</span>;
})
<span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b);         <span class="hljs-comment">// 结果为false</span></code></pre>
<h4>数组内置方法Array.prototype.indexOf</h4>
<p><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var b = a.indexOf(2);
console.log(a);         // 结果为[ 1, 2, 3 ]
console.log(b);         // 结果为1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.indexOf(<span class="hljs-number">2</span>);
<span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b);         <span class="hljs-comment">// 结果为1</span></code></pre>
<p><strong><em>代码解读</em></strong>：对于indexOf方法来说，在数组循环过程中会和传入的参数比对，如果是比对成功，那么终止循环，返回对比成功的下标，下面写一个indexOf循环实现例子供大家参考：</p>
<p><strong><em>Example</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.indexOfCopy = function(value){
    var arr =  this;
    var index = -1;
    for(var i=0;i<arr.length;i++){
        if(arr[i] === value){
          index = i;
          return index
        }
    }
    return index;
}
var a = [1,2,3];
var b = a.indexOfCopy(2);
console.log(a);         // 结果为[ 1, 2, 3 ]
console.log(b);         // 结果为1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Array</span>.prototype.indexOfCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-keyword">var</span> arr =  <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> index = <span class="hljs-number">-1</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
        <span class="hljs-keyword">if</span>(arr[i] === value){
          index = i;
          <span class="hljs-keyword">return</span> index
        }
    }
    <span class="hljs-keyword">return</span> index;
}
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = a.indexOfCopy(<span class="hljs-number">2</span>);
<span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">// 结果为[ 1, 2, 3 ]</span>
<span class="hljs-built_in">console</span>.log(b);         <span class="hljs-comment">// 结果为1</span></code></pre>
<h4>数组内置方法Array.prototype.lastIndexOf</h4>
<p><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3,1];
var b = a.lastIndexOf(1);
console.log(a);         // 结果为[ 1, 2, 3, 1 ]
console.log(b);         // 结果为1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>];
<span class="hljs-keyword">var</span> b = a.lastIndexOf(<span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">// 结果为[ 1, 2, 3, 1 ]</span>
<span class="hljs-built_in">console</span>.log(b);         <span class="hljs-comment">// 结果为1</span></code></pre>
<p><strong><em>代码解读</em></strong>：lastIndexOf方法和indexOf作用一致，但查找方向不同，indexOf是正向查找，lastIndexOf是你像查找，找到之后返回成功的下标，下面写一个lastIndexOf循环实现例子供大家参考：</p>
<p><strong><em>Example</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.lastIndexOf = function(value){
    var arr =  this;
    var index = -1;
    for(var i=arr.length;i--;){
        if(arr[i] === value){
          index = i;
          return index
        }
    }
    return index;
}
var a = [1,2,3,1];
var b = a.lastIndexOf(1);
console.log(a);         // 结果为[ 1, 2, 3 , 1 ]
console.log(b);         // 结果为3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Array</span>.prototype.lastIndexOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-keyword">var</span> arr =  <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> index = <span class="hljs-number">-1</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=arr.length;i--;){
        <span class="hljs-keyword">if</span>(arr[i] === value){
          index = i;
          <span class="hljs-keyword">return</span> index
        }
    }
    <span class="hljs-keyword">return</span> index;
}
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>];
<span class="hljs-keyword">var</span> b = a.lastIndexOf(<span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">// 结果为[ 1, 2, 3 , 1 ]</span>
<span class="hljs-built_in">console</span>.log(b);         <span class="hljs-comment">// 结果为3</span></code></pre>
<blockquote>小结：对于以上8个数组的内置方法，forEach方法仅仅只是为了循环，并不可以帮你做额外的事情；map方法相当于在循环的时候你告诉数组当前遍历的这个值需要改成什么样，那么它就会最后给什么样的数组；filter方法相当于在循环的时候数组遍历一个个对象，并问你这个是不是你要找的值，如果你说是，他就会给你返回一个到新的数组中，不是他就会剔除；reduce方法相当于循环遍历对象做统计（累加或者累减之类的）;some和every方法相当于在遍历的时候拿着一个个对象问你这个是不是你找的，只要你说了一遍是，那么他就会给你分别返回的是true和false；indexOf和lastIndexOf方法相当于你告诉它你要找什么值，找到之后立马返回给你它的门牌号。</blockquote>
<h4>循环语句for...in</h4>
<p><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
for(var key in a){
  console.log(key); //结果为依次为0，1，2
}
var b = {0:1,1:2,2:3};
for(var key in b){
  console.log(key); //结果为依次为0，1，2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> a){
  <span class="hljs-built_in">console</span>.log(key); <span class="hljs-comment">//结果为依次为0，1，2</span>
}
<span class="hljs-keyword">var</span> b = {<span class="hljs-number">0</span>:<span class="hljs-number">1</span>,<span class="hljs-number">1</span>:<span class="hljs-number">2</span>,<span class="hljs-number">2</span>:<span class="hljs-number">3</span>};
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> b){
  <span class="hljs-built_in">console</span>.log(key); <span class="hljs-comment">//结果为依次为0，1，2</span>
}</code></pre>
<p><strong><em>代码解读</em></strong>：从结果得知,for...in遍历数组的时候是遍历数组的下标值，而在遍历对象的时候遍历的是key值，所以猜想，数组在JS中，本质上也是一个以键值对形式存在的对象，而为了证明这点，我们做如下一个例子的实验：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [];
a['b'] = 2;
console.log(a);     //结果为[ b: 2 ]
console.log(a[0]);  //结果为undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [];
a[<span class="hljs-string">'b'</span>] = <span class="hljs-number">2</span>;
<span class="hljs-built_in">console</span>.log(a);     <span class="hljs-comment">//结果为[ b: 2 ]</span>
<span class="hljs-built_in">console</span>.log(a[<span class="hljs-number">0</span>]);  <span class="hljs-comment">//结果为undefined</span></code></pre>
<p>我们发现数组的下标不在对应相应位置的值了，由此可以证明在JS中数组其实本质上就是一个以<strong>下标为key值</strong>的对象。<br>当然对于for...in循环语句本身而言，它是一个浅度遍历对象的循环语句，值遍历第一层节点（当然对象中设置不可枚举的属性的除外）。<br><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {b:{c:2},d:{c:4"}}";
for(var key in a){
  console.log(key); //结果为依次为b,d
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">b</span>:{<span class="hljs-attr">c</span>:<span class="hljs-number">2</span>},<span class="hljs-attr">d</span>:{<span class="hljs-attr">c</span>:<span class="hljs-number">4</span>"}}";
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> a){
  <span class="hljs-built_in">console</span>.log(key); <span class="hljs-comment">//结果为依次为b,d</span>
}</code></pre>
<h4>ES6循环for...of语句</h4>
<p><strong>Example</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
for(var value of a){
  console.log(value)  // 结果依次为1，2，3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> value <span class="hljs-keyword">of</span> a){
  <span class="hljs-built_in">console</span>.log(value)  <span class="hljs-comment">// 结果依次为1，2，3</span>
}</code></pre>
<p><strong><em>代码解读：</em></strong>for...of语句看着有点像for...in语句，但是和for...in语句不同的是它不可以循环对象，只能循环数组。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES5和ES6数组遍历方法详解

## 原文链接
[https://segmentfault.com/a/1190000010203337](https://segmentfault.com/a/1190000010203337)


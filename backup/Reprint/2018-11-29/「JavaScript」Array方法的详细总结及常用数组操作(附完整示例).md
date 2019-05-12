---
title: '「JavaScript」Array方法的详细总结及常用数组操作(附完整示例)' 
date: 2018-11-29 9:34:56
hidden: true
slug: eb0xdfxfdet
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一.前言</h2>
<p>因为在工作当中，经常使用到js的数组，而其中对数组方法的使用也是很频繁的，所以总是会有弄混或者概念不够清晰的状况，所以，写下这篇文章整理一番,本文有对几乎所有数组的方法的介绍，此外还有非常实用的一些数组操作比如乱序去重和斐波那契数列求值等等，总之干货满满～～</p>
<h2 id="articleHeader1">二.JS中的Array方法</h2>
<h3 id="articleHeader2">1.检测数组</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   //instanceof 测试某个对象是否由某个指定的构造器创建

     [1,2,3] instanceof Array //true
      &quot;1&quot; instanceof Array // false
   
   //比instanceof更可靠 Array.isArray

    Array.isArray([1,2,3]); //true

   //Object对象的toString()方法，可以返回所创建对象的内部类名

    Object.prototype.toString.call([1,2,3]); //&quot;[object Array]&quot;

    Object.prototype.toString.call(&quot;a&quot;); //&quot;[object String]&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">   <span class="hljs-comment">//instanceof 测试某个对象是否由某个指定的构造器创建</span>

     [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>] <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> <span class="hljs-comment">//true</span>
      <span class="hljs-string">"1"</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> <span class="hljs-comment">// false</span>
   
   <span class="hljs-comment">//比instanceof更可靠 Array.isArray</span>

    <span class="hljs-built_in">Array</span>.isArray([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]); <span class="hljs-comment">//true</span>

   <span class="hljs-comment">//Object对象的toString()方法，可以返回所创建对象的内部类名</span>

    <span class="hljs-built_in">Object</span>.prototype.toString.call([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]); <span class="hljs-comment">//"[object Array]"</span>

    <span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-string">"a"</span>); <span class="hljs-comment">//"[object String]"</span>
</code></pre>
<h3 id="articleHeader3">2.转换方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   const test = [1,2,3];

   test.toString(); //&quot;1,2,3&quot;

   test.valueOf(); //[1,2,3]

   //toLocaleString大部分为返回与toString相同的结果，区别之处在于会调用每一项的toLocaleString()方法
   test.toLocaleString([1,2,3]); //[1,2,3];

   const testStr = test.join(&quot;|&quot;); //&quot;1|2|3&quot;
   testStr.split(&quot;|&quot;); // [1,2,3];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>   <span class="hljs-keyword">const</span> <span class="hljs-keyword">test</span> = [1,2,3];

   <span class="hljs-keyword">test</span>.<span class="hljs-keyword">toString</span>(); <span class="hljs-comment">//"1,2,3"</span>

   <span class="hljs-keyword">test</span>.valueOf(); <span class="hljs-comment">//[1,2,3]</span>

   <span class="hljs-comment">//toLocaleString大部分为返回与toString相同的结果，区别之处在于会调用每一项的toLocaleString()方法</span>
   <span class="hljs-keyword">test</span>.toLocaleString([1,2,3]); <span class="hljs-comment">//[1,2,3];</span>

   <span class="hljs-keyword">const</span> testStr = <span class="hljs-keyword">test</span>.join(<span class="hljs-string">"|"</span>); <span class="hljs-comment">//"1|2|3"</span>
   testStr.<span class="hljs-keyword">split</span>(<span class="hljs-string">"|"</span>); <span class="hljs-comment">// [1,2,3];</span></code></pre>
<h3 id="articleHeader4">3.栈方法(push和pop 尾部操作)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const test = new Array();
  const count= test.push(&quot;a&quot;,&quot;b&quot;);
  //count为操作完后的数组长度
  console.log(count); //2
  
  const count1 = test.push(&quot;c&quot;);
  console.log(count1); //3
  
  const item = test.pop();
  console.log(item); //&quot;c&quot;
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>  <span class="hljs-keyword">const</span> <span class="hljs-keyword">test</span> = new Array();
  <span class="hljs-keyword">const</span> <span class="hljs-keyword">count</span>= <span class="hljs-keyword">test</span>.push(<span class="hljs-string">"a"</span>,<span class="hljs-string">"b"</span>);
  <span class="hljs-comment">//count为操作完后的数组长度</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">count</span>); <span class="hljs-comment">//2</span>
  
  <span class="hljs-keyword">const</span> count1 = <span class="hljs-keyword">test</span>.push(<span class="hljs-string">"c"</span>);
  console.<span class="hljs-built_in">log</span>(count1); <span class="hljs-comment">//3</span>
  
  <span class="hljs-keyword">const</span> item = <span class="hljs-keyword">test</span>.pop();
  console.<span class="hljs-built_in">log</span>(item); <span class="hljs-comment">//"c"</span>
  </code></pre>
<h3 id="articleHeader5">4.队列方法（shift和unshift 头部操作）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   const test = [1,2,3];
   const item = test.shift();
   console.log(item); //1
   console.log(test); //[2,3];
   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>   <span class="hljs-keyword">const</span> <span class="hljs-keyword">test</span> = [1,2,3];
   <span class="hljs-keyword">const</span> item = <span class="hljs-keyword">test</span>.shift();
   console.<span class="hljs-built_in">log</span>(item); <span class="hljs-comment">//1</span>
   console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">test</span>); <span class="hljs-comment">//[2,3];</span>
   
</code></pre>
<h3 id="articleHeader6">5.重排序方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const test = [1,2,3];
  const test1 = test.reverse(); // [3,2,1]
  test1.sort(); //[1,2,3]
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>  <span class="hljs-keyword">const</span> <span class="hljs-keyword">test</span> = [1,2,3];
  <span class="hljs-keyword">const</span> test1 = <span class="hljs-keyword">test</span>.<span class="hljs-built_in">reverse</span>(); <span class="hljs-comment">// [3,2,1]</span>
  test1.<span class="hljs-keyword">sort</span>(); <span class="hljs-comment">//[1,2,3]</span>
  </code></pre>
<h3 id="articleHeader7">6.操作方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //concat会创建当前数组的一个副本再进行操作，不影响原数组
    const test = [1,2,3];
    const test1 = [1,2,3].concat([4,5]);
    
    console.log(test); //[1,2,3]
    console.log(test1); //[1,2,3,4,5]
    
    //slice接受一个或两个参数，返回起始和结束位置之间的项(但不包括最后位置的项),不影响原数组
    const test = [1,2,3,4];
    const test1 = test.slice(0); //[1,2,3,4]
    const test2 = test.slice(1,3); //[2,3]
    
    console.log(test); //[1,2,3,4] 原数组未改变
    
    //splice 可用作删除、插入和替换，改变原数组
    const test = [1,2,3,4,5];
    
    test.splice(1,2); //test为[1,4,5]
    
    test.splice(1,0,&quot;a&quot;,&quot;b&quot;); //test为[1,&quot;a&quot;,&quot;b&quot;,2,3,,4，5]
    
    test.splice(2,1,&quot;c&quot;); //test为[1,2,&quot;c&quot;,4，5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    <span class="hljs-comment">//concat会创建当前数组的一个副本再进行操作，不影响原数组</span>
    const test = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    const test1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].concat([<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]);
    
    console.log(test); <span class="hljs-comment">//[1,2,3]</span>
    console.log(test1); <span class="hljs-comment">//[1,2,3,4,5]</span>
    
    <span class="hljs-comment">//slice接受一个或两个参数，返回起始和结束位置之间的项(但不包括最后位置的项),不影响原数组</span>
    const test = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
    const test1 = test.slice(<span class="hljs-number">0</span>); <span class="hljs-comment">//[1,2,3,4]</span>
    const test2 = test.slice(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>); <span class="hljs-comment">//[2,3]</span>
    
    console.log(test); <span class="hljs-comment">//[1,2,3,4] 原数组未改变</span>
    
    <span class="hljs-comment">//splice 可用作删除、插入和替换，改变原数组</span>
    const test = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
    
    test.splice(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>); <span class="hljs-comment">//test为[1,4,5]</span>
    
    test.splice(<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-string">"a"</span>,<span class="hljs-string">"b"</span>); <span class="hljs-comment">//test为[1,"a","b",2,3,,4，5]</span>
    
    test.splice(<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-string">"c"</span>); <span class="hljs-comment">//test为[1,2,"c",4，5]</span></code></pre>
<h3 id="articleHeader8">7.位置方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     const test = [1,2,3,4,5,4,3,2];
     test.indexOf(4); //3
     
     test.lastIndexOf(4); //5
     test.indexOf(&quot;4&quot;); //-1  必须全相等（===）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>     const test = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">2</span>];
     test.indexOf(<span class="hljs-number">4</span>); <span class="hljs-comment">//3</span>
     
     test.lastIndexOf(<span class="hljs-number">4</span>); <span class="hljs-comment">//5</span>
     test.indexOf(<span class="hljs-string">"4"</span>); <span class="hljs-comment">//-1  必须全相等（===）</span></code></pre>
<h3 id="articleHeader9">8.循环方法</h3>
<p>1.filter() 对数组的每一项允许给定函数，返回该函数会返回<strong>true</strong>的项组成数组，不会改变原数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const test = [1,2,3,4,5];
 const test1 = test.filter((item) => item > 3);
 
 console.log(test); //[1,2,3,4,5];
 console.log(test1); //[4,5];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code> <span class="hljs-keyword">const</span> <span class="hljs-keyword">test</span> = [1,2,3,4,5];
 <span class="hljs-keyword">const</span> test1 = <span class="hljs-keyword">test</span>.filter((item) =&gt; item &gt; 3);
 
 console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">test</span>); <span class="hljs-comment">//[1,2,3,4,5];</span>
 console.<span class="hljs-built_in">log</span>(test1); <span class="hljs-comment">//[4,5];</span></code></pre>
<p>2.map() 对数组的每一项执行给定函数，返回每次函数调用的结果组成的数组，不会改变原数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   const test = [{a:1,b:2},{a:3,b:4},{a:5,b:6}];
   const test1 = test.map((item) => item['a']);
   
   console.log(test); //[{a:1,b:2},{a:3,b:4},{a:5,b:6}]
   console.log(test1); //[1,3,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>   const test = [{<span class="hljs-string">a:</span><span class="hljs-number">1</span>,<span class="hljs-string">b:</span><span class="hljs-number">2</span>},{<span class="hljs-string">a:</span><span class="hljs-number">3</span>,<span class="hljs-string">b:</span><span class="hljs-number">4</span>},{<span class="hljs-string">a:</span><span class="hljs-number">5</span>,<span class="hljs-string">b:</span><span class="hljs-number">6</span>}];
   const test1 = test.map((item) =&gt; item[<span class="hljs-string">'a'</span>]);
   
   console.log(test); <span class="hljs-comment">//[{a:1,b:2},{a:3,b:4},{a:5,b:6}]</span>
   console.log(test1); <span class="hljs-comment">//[1,3,5]</span></code></pre>
<p>3.forEach 对数组的每一项运行给定函数，没有返回新数组，没有返回值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         const test = [[1],[2]];
         test.forEach((item) => item.push(1));
         console.log(test); //[[1,1], [2,1]]     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>         const test = <span class="hljs-string">[[1],[2]]</span>;
         test.forEach((item) =&gt; item.push(<span class="hljs-number">1</span>));
         console.log(test); //<span class="hljs-string">[[1,1], [2,1]]</span>     </code></pre>
<h3 id="articleHeader10">9.其他的循环方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1) 普通for循环(性能较好)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">1</span>) 普通<span class="hljs-keyword">for</span>循环(性能较好)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      const test = [1,2,3,4];
      for(let i=0,len=test.length;i<len;i++) {
           console.log(test[i]);
      }
      //1
      //2
      //3
      //4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>      <span class="hljs-keyword">const</span> <span class="hljs-keyword">test</span> = [1,2,3,4];
      <span class="hljs-keyword">for</span>(let i=0,len=<span class="hljs-keyword">test</span>.length;i&lt;len;i++) {
           console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">test</span>[i]);
      }
      <span class="hljs-comment">//1</span>
      <span class="hljs-comment">//2</span>
      <span class="hljs-comment">//3</span>
      <span class="hljs-comment">//4</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2) for in 以【任意】顺序遍历一个对象的可枚举属性，所以不太建议用来遍历一个数组，原因如下。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">2</span>) <span class="hljs-keyword">for</span> <span class="hljs-keyword">in</span> 以【任意】顺序遍历一个对象的可枚举属性，所以不太建议用来遍历一个数组，原因如下。</code></pre>
<blockquote>for...in不应该用于迭代一个 Array，其中索引顺序很重要。数组索引只是具有整数名称的枚举属性，并且与通用对象属性相同。不能保证for ... in将以任何特定的顺序返回索引。for ... in循环语句将返回所有可枚举属性，包括非整数类型的名称和继承的那些,即它返回的除了数字索引外还有可能是你自定义的属性名字。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       const person = {work:&quot;coder&quot;,age:&quot;24&quot;,sex: &quot;female&quot;};
       for(prop in person) {
            console.log(`Jchermy[${prop}]=${person[prop]}`);
        }
        //Jchermy[work]=coder
        //Jchermy[age]=24
        //Jchermy[sex]=female
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>       <span class="hljs-keyword">const</span> person = {work:<span class="hljs-string">"coder"</span>,age:<span class="hljs-string">"24"</span>,sex: <span class="hljs-string">"female"</span>};
       <span class="hljs-keyword">for</span>(<span class="hljs-keyword">prop</span> <span class="hljs-keyword">in</span> person) {
            console.<span class="hljs-built_in">log</span>(`Jchermy[<span class="hljs-variable">${prop}</span>]=<span class="hljs-variable">${person</span>[<span class="hljs-keyword">prop</span>]}`);
        }
        <span class="hljs-comment">//Jchermy[work]=coder</span>
        <span class="hljs-comment">//Jchermy[age]=24</span>
        <span class="hljs-comment">//Jchermy[sex]=female</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3)for..of  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">3</span>)<span class="hljs-keyword">for</span>.<span class="hljs-selector-class">.of</span>  </code></pre>
<blockquote>语句在可迭代的对象上创建了一个循环(包括Array, Map, Set, 参数对象（ arguments） 等等)，<br>  对值的每一个独特的属性调用一个将被执行的自定义的和语句挂钩的迭代。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
for..of 作为es6中引进的循环，主要是为了补全之前for循环中的以下不足 :     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>
<span class="hljs-keyword">for</span>..<span class="hljs-keyword">of</span> 作为es6中引进的循环，主要是为了补全之前<span class="hljs-keyword">for</span>循环中的以下不足 :     </code></pre>
<ul>
<li>forEach 不能 break 和 return；</li>
<li>for-in  它不仅遍历数组中的元素，还会遍历自定义的属性，甚至原型链上的属性都被访问到。而且，遍历数组元素的顺序可能是随机的。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 而相比之下for...of可以做到：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"> 而相比之下<span class="hljs-keyword">for</span>...<span class="hljs-keyword">of</span>可以做到：</code></pre>
<ul>
<li>与forEach 相比，可以正确响应 break, continue, return。</li>
<li>for-of 循环不仅支持数组，还支持大多数类数组对象，例如 DOM nodelist 对象。</li>
<li>for-of 循环也支持字符串遍历，它将字符串视为一系列 Unicode 字符来进行遍历。</li>
<li>for-of 也支持 Map 和 Set （两者均为 ES6 中新增的类型）对象遍历。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        let test = [3, 5, 7];
        test.foo = &quot;hello&quot;;
        
        for (let i in test) {
           console.log(i); // &quot;0&quot;, &quot;1&quot;, &quot;2&quot;, &quot;foo&quot;
        }
        
        for (let i of test) {
           console.log(i); // &quot;3&quot;, &quot;5&quot;, &quot;7&quot; // 注意这里没有 hello
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>        <span class="hljs-built_in">let</span> <span class="hljs-built_in">test</span> = [3, 5, 7];
        test.foo = <span class="hljs-string">"hello"</span>;
        
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">let</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">test</span>) {
           console.log(i); // <span class="hljs-string">"0"</span>, <span class="hljs-string">"1"</span>, <span class="hljs-string">"2"</span>, <span class="hljs-string">"foo"</span>
        }
        
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">let</span> i of <span class="hljs-built_in">test</span>) {
           console.log(i); // <span class="hljs-string">"3"</span>, <span class="hljs-string">"5"</span>, <span class="hljs-string">"7"</span> // 注意这里没有 hello
        }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="从以上我们可以看出for..of和for...in的区别

1. for...in循环出的是key，for...of循环出的是value
2. 作用于数组的for-in循环除了遍历数组元素以外,还会遍历自定义属性,比如例子中的foo属性。for...of循环不会循环对象的key，只会循环出数组的value。  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>从以上我们可以看出<span class="hljs-keyword">for</span>..<span class="hljs-keyword">of</span>和<span class="hljs-keyword">for</span>...<span class="hljs-keyword">in</span>的区别

<span class="hljs-number">1</span>. <span class="hljs-keyword">for</span>...<span class="hljs-keyword">in</span>循环出的是key，<span class="hljs-keyword">for</span>...<span class="hljs-keyword">of</span>循环出的是<span class="hljs-keyword">value</span>
<span class="hljs-number">2</span>. 作用于数组的<span class="hljs-keyword">for</span>-<span class="hljs-keyword">in</span>循环除了遍历数组元素以外,还会遍历自定义属性,比如例子中的foo属性。<span class="hljs-keyword">for</span>...<span class="hljs-keyword">of</span>循环不会循环对象的key，只会循环出数组的<span class="hljs-keyword">value</span>。  
</code></pre>
<p>4）do...while 语句一直重复直到指定的条件求值得到假（false）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        let i = 0;
        do {
          i += 1;
          console.log(i);
        } while (i < 5);
        //1
        //2
        //3
        //4
        //5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>        <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">do</span> {
          i += <span class="hljs-number">1</span>;
          console.<span class="hljs-built_in">log</span>(i);
        } <span class="hljs-keyword">while</span> (i &lt; <span class="hljs-number">5</span>);
        <span class="hljs-comment">//1</span>
        <span class="hljs-comment">//2</span>
        <span class="hljs-comment">//3</span>
        <span class="hljs-comment">//4</span>
        <span class="hljs-comment">//5</span></code></pre>
<p>5) while只要指定的条件为真就会一直执行它的语句块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let n = 0;
    let x = 0;
    while(n<3) {
       n++;
       x +=n;
       console.log(n,xhdf);
    }
    // 1 1
    // 2 3
    // 3 6
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>    <span class="hljs-keyword">let</span> n = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">let</span> x = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">while</span>(n&lt;<span class="hljs-number">3</span>) {
       n++;
       x +=n;
       console.<span class="hljs-built_in">log</span>(n,xhdf);
    }
    <span class="hljs-comment">// 1 1</span>
    <span class="hljs-comment">// 2 3</span>
    <span class="hljs-comment">// 3 6</span>
    </code></pre>
<h2 id="articleHeader11">三、常用数组操作</h2>
<h3 id="articleHeader12">1.数组乱序</h3>
<p><strong>将一个数组完全打乱,然后返回打乱后的数组。也称为洗牌算法。</strong></p>
<p>1) 利用Math.random()和sort()结合</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   const test = [1,2,3,4];
   test.concat().sort(()=> Math.random() - 0.5); // [2, 4, 1, 3]
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   <span class="hljs-keyword">const</span> test = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
   test.concat().sort(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> <span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">0.5</span>); <span class="hljs-comment">// [2, 4, 1, 3]</span>
 </code></pre>
<p>这个方法貌似可以实现我们要的结果，但是实际上它并不完全是随机的，而是越大的数字出现在越后面的概率越大。具体原因可以看这篇文章<a href="https://www.h5jun.com/post/array-shuffle.html" rel="nofollow noreferrer" target="_blank">数组的完全随机排列</a></p>
<p>2)  遍历原数组，然后随机产生下标，将这个下标的值push到新的数组中，并随即删除这值，注意不是用delete，那样并不会改变数组的长度，效率不高，使用splice较好.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       function shuffle(array) {
          let i,n=array.length,copy=[];
          while(n) {
             i = Math.floor(Math.random()*n--);//n--是先与Math.random相乘再减一
             copy.push(array.splice(i, 1)[0]);
          }
          return copy;
       }
       const test = [1,2,3,4,5];
       console.log(shuffle(test));  ／／[2, 5, 4, 3, 1]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">       <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shuffle</span>(<span class="hljs-params">array</span>) </span>{
          <span class="hljs-keyword">let</span> i,n=array.length,copy=[];
          <span class="hljs-keyword">while</span>(n) {
             i = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*n--);<span class="hljs-comment">//n--是先与Math.random相乘再减一</span>
             copy.push(array.splice(i, <span class="hljs-number">1</span>)[<span class="hljs-number">0</span>]);
          }
          <span class="hljs-keyword">return</span> copy;
       }
       <span class="hljs-keyword">const</span> test = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
       <span class="hljs-built_in">console</span>.log(shuffle(test));  ／／[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>]</code></pre>
<p>3）<strong>Fisher–Yates shuffle 算法</strong> 随机从数组中抽出一个元素，然后与最后个元素交换，相当于把这个随机抽取的元素放到了数组最后面去，表示它已经是被随机过了，同时被换走的那个元素跑到前面去了，会在后续的重复操作中被随机掉。一轮操作过后，下一轮我们只在剩下的n-1个元素也就是数组的前n-1个元素中进行相同的操作，直到进行到第一个。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function shuffle(array) {
        let i, n=array.length;
        while(n) {
          i = Math.floor(Math.random()*（n--）);
          
          t = array[i]
          array[i] = array[n];
          array[n] = t;
          n--;
        }
        return array;
    }
    var test = [1,2,3,4];
    console.log(shuffle(test.concat()));//传入数组的副本
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    function shuffle(<span class="hljs-built_in">array</span>) {
        <span class="hljs-built_in">let</span> i, n=<span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span>;
        <span class="hljs-keyword">while</span>(n) {
          i = Math.<span class="hljs-built_in">floor</span>(Math.<span class="hljs-built_in">random</span>()*（n--）);
          
          t = <span class="hljs-built_in">array</span>[i]
          <span class="hljs-built_in">array</span>[i] = <span class="hljs-built_in">array</span>[n];
          <span class="hljs-built_in">array</span>[n] = t;
          n--;
        }
        <span class="hljs-built_in">return</span> <span class="hljs-built_in">array</span>;
    }
    <span class="hljs-built_in">var</span> test = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
    console.<span class="hljs-built_in">log</span>(shuffle(test.<span class="hljs-built_in">concat</span>()));//传入数组的副本
    </code></pre>
<h3 id="articleHeader13">2. 求斐波那契序列的某一项的值</h3>
<p>ps:这一题的解法有很多种，以下仅列出几种</p>
<p>1） 首先祭出最经典的解法，利用递归求值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     function fibonacci(n) {
         if(n==0 || n==1 ) {
            return n;
         }
         return fibonacci(n-1)+fibonacci(n-2);
     }
     const test = fibonacci(4); //3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fibonacci</span><span class="hljs-params">(n)</span> </span>{
         <span class="hljs-keyword">if</span>(n==<span class="hljs-number">0</span> || n==<span class="hljs-number">1</span> ) {
            <span class="hljs-keyword">return</span> n;
         }
         <span class="hljs-keyword">return</span> fibonacci(n<span class="hljs-number">-1</span>)+fibonacci(n<span class="hljs-number">-2</span>);
     }
     <span class="hljs-keyword">const</span> test = fibonacci(<span class="hljs-number">4</span>); <span class="hljs-comment">//3</span></code></pre>
<p>这种方法的问题是很多值会重新求值，效率很低，因此并不推荐。<br>2）利用ES6的解构赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     const fibonacci =(n)=>{
        let a = 0;
        let b= 1;
        let i = 2;
        while(i++ <= n){
          [a, b] = [b, a+b]; //解构赋值
        }
        return b;
     }
     fibonacci(4); //3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>     <span class="hljs-keyword">const</span> fibonacci =<span class="hljs-function">(<span class="hljs-params">n</span>)=&gt;</span>{
        <span class="hljs-keyword">let</span> a = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">let</span> b= <span class="hljs-number">1</span>;
        <span class="hljs-keyword">let</span> i = <span class="hljs-number">2</span>;
        <span class="hljs-keyword">while</span>(i++ &lt;= n){
          [a, b] = [b, a+b]; <span class="hljs-comment">//解构赋值</span>
        }
        <span class="hljs-keyword">return</span> b;
     }
     fibonacci(<span class="hljs-number">4</span>); <span class="hljs-comment">//3</span></code></pre>
<p>3) 尾递归优化</p>
<blockquote>递归非常耗内存，因为需要同时保存成千上百个调用帧，很容易发生‘栈溢出’。但对于尾递归优化来说，由于只存在一个调用帧，所以永远不会发生栈溢出。而尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数.</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     function fibonacci(n, n1=0, n2=1){
         if(n <=1) {
            return n2;
         }
     return fibonacci(n-1, n2, n1 + n2);  
    
     }
     fibonacci(6); //8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fibonacci</span><span class="hljs-params">(n, n1=0, n2=1)</span></span>{
         <span class="hljs-keyword">if</span>(n &lt;=<span class="hljs-number">1</span>) {
            <span class="hljs-keyword">return</span> n2;
         }
     <span class="hljs-keyword">return</span> fibonacci(n<span class="hljs-number">-1</span>, n2, n1 + n2);  
    
     }
     fibonacci(<span class="hljs-number">6</span>); <span class="hljs-comment">//8</span></code></pre>
<p>4)利用缓存值减少重复求值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function fibonacci(){
     var cache = {
        0:0,
        1:1
     }
     return function _fibonacci(n) {
         return typeof cache[n] === 'number' ?
         cache[n]:
         cache[n] = _fibonacci(n-1) + _fibonacci(n-2);
     }  
   }
   const f = fibonacci();
   f(9); //34" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fibonacci</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-keyword">var</span> cache = {
        <span class="hljs-number">0</span>:<span class="hljs-number">0</span>,
        <span class="hljs-number">1</span>:<span class="hljs-number">1</span>
     }
     <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_fibonacci</span>(<span class="hljs-params">n</span>) </span>{
         <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> cache[n] === <span class="hljs-string">'number'</span> ?
         cache[n]:
         cache[n] = _fibonacci(n<span class="hljs-number">-1</span>) + _fibonacci(n<span class="hljs-number">-2</span>);
     }  
   }
   <span class="hljs-keyword">const</span> f = fibonacci();
   f(<span class="hljs-number">9</span>); <span class="hljs-comment">//34</span></code></pre>
<h3 id="articleHeader14">3.数组排序</h3>
<p>1)最常用的利用sort()排序,仅适用于纯数字数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //升序
  function asc(arr){
    return arr.sort((a,b)=> {return a-b;})
  }
  asc([6,3,4,2]);//[2,3,4,6]

    //降序
  function desc(arr){
    return arr.sort((a,b)=> {return b-a;})
  }
  desc([4,3,2,5]); //[5, 4, 3, 2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-comment">//升序</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asc</span>(<span class="hljs-params">arr</span>)</span>{
    <span class="hljs-keyword">return</span> arr.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span> {<span class="hljs-keyword">return</span> a-b;})
  }
  asc([<span class="hljs-number">6</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">2</span>]);<span class="hljs-comment">//[2,3,4,6]</span>

    <span class="hljs-comment">//降序</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">desc</span>(<span class="hljs-params">arr</span>)</span>{
    <span class="hljs-keyword">return</span> arr.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span> {<span class="hljs-keyword">return</span> b-a;})
  }
  desc([<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">5</span>]); <span class="hljs-comment">//[5, 4, 3, 2]</span></code></pre>
<p>2）由对象组成的数组，支持根据对象的某个属性排序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const sortByProp = (name)=>{
    return (f, s) => {
      var a, b;
      if (typeof f === 'object' &amp;&amp; typeof s === 'object' &amp;&amp; f &amp;&amp; s) {
         a = f[name];
         b = s[name];
         if(a === b) {
            return 0;
         } else {
            return a < b ? -1 :1;
         }  
     } else {
        throw new TypeError('数组必须由对象组成');
     }
  };
};
const test = [{age:27, name:&quot;xiaomi&quot;},{age:17, name:&quot;amy&quot;},{age: 24, name: &quot;Jchermy&quot;}];
test.sort(sortByProp(&quot;age&quot;)); //[{age:17, name:&quot;amy&quot;},{age: 24, name: &quot;Jchermy&quot;}, {age:27, name:&quot;xiaomi&quot;}];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">const</span> sortByProp = <span class="hljs-function">(<span class="hljs-params">name</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">f, s</span>) =&gt;</span> {
      <span class="hljs-keyword">var</span> a, b;
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> f === <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> s === <span class="hljs-string">'object'</span> &amp;&amp; f &amp;&amp; s) {
         a = f[name];
         b = s[name];
         <span class="hljs-keyword">if</span>(a === b) {
            <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
         } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> a &lt; b ? <span class="hljs-number">-1</span> :<span class="hljs-number">1</span>;
         }  
     } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'数组必须由对象组成'</span>);
     }
  };
};
<span class="hljs-keyword">const</span> test = [{<span class="hljs-attr">age</span>:<span class="hljs-number">27</span>, <span class="hljs-attr">name</span>:<span class="hljs-string">"xiaomi"</span>},{<span class="hljs-attr">age</span>:<span class="hljs-number">17</span>, <span class="hljs-attr">name</span>:<span class="hljs-string">"amy"</span>},{<span class="hljs-attr">age</span>: <span class="hljs-number">24</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"Jchermy"</span>}];
test.sort(sortByProp(<span class="hljs-string">"age"</span>)); <span class="hljs-comment">//[{age:17, name:"amy"},{age: 24, name: "Jchermy"}, {age:27, name:"xiaomi"}];</span></code></pre>
<h3 id="articleHeader15">4.数组去重</h3>
<p>1）利用array_filter()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function unique(arr){
     let uniqueArr = [];
     uniqueArr = arr.filter((item) =>{
        return uniqueArr.includes(item) ? '' : uniqueArr.push(item);
     })
     return uniqueArr;
   };
   unique([1,2,3,1,6,3,2,7]); //[1,2,3,6,7];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>)</span>{
     <span class="hljs-keyword">let</span> uniqueArr = [];
     uniqueArr = arr.filter(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span>{
        <span class="hljs-keyword">return</span> uniqueArr.includes(item) ? <span class="hljs-string">''</span> : uniqueArr.push(item);
     })
     <span class="hljs-keyword">return</span> uniqueArr;
   };
   unique([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-number">6</span>,<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">7</span>]); <span class="hljs-comment">//[1,2,3,6,7];</span>
</code></pre>
<p>2)利用es6中的Map()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function unique(arr) {
     const seen = new Map();
     return arr.filter((item) => !seen.has(item) &amp;&amp; seen.set(item, 1));
   }
   unique([11,2,3,4,4,2,5]); ／／[11, 2, 3, 4, 5]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>   function unique(arr) {
     const seen = new Map();
     return arr.filter((item) =&gt; !seen.has(item) &amp;&amp; seen.set(item, <span class="hljs-number">1</span>));
   }
   unique([<span class="hljs-number">11</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">4</span>,<span class="hljs-number">2</span>,<span class="hljs-number">5</span>]); ／／[<span class="hljs-number">11</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
</code></pre>
<p>3)利用es6中的Set()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function unique(arr){
       return [...new Set(arr)]; //将set结构转为数组
    }
   unique([1,2,2,3,7,3,8,5]); //[1, 2, 3, 7, 8, 5]  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    function unique(arr){
       return [...new Set(arr)]; <span class="hljs-comment">//将set结构转为数组</span>
    }
   unique([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">7</span>,<span class="hljs-number">3</span>,<span class="hljs-number">8</span>,<span class="hljs-number">5</span>]); <span class="hljs-comment">//[1, 2, 3, 7, 8, 5]  </span></code></pre>
<h3 id="articleHeader16">5.数组去除空值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function filter_array(array) {    
  return array.filter(item=>item);   
}   

const test = [undefined,undefined,1,'','false',false,true,null,'null'];     
filter_array(test);  //[1, &quot;false&quot;, true, &quot;null&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">filter_array</span>(<span class="hljs-params">array</span>) </span>{    
  <span class="hljs-keyword">return</span> array.filter(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>item);   
}   

<span class="hljs-keyword">const</span> test = [<span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>,<span class="hljs-number">1</span>,<span class="hljs-string">''</span>,<span class="hljs-string">'false'</span>,<span class="hljs-literal">false</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">null</span>,<span class="hljs-string">'null'</span>];     
filter_array(test);  <span class="hljs-comment">//[1, "false", true, "null"]</span></code></pre>
<h2 id="articleHeader17">四.结语</h2>
<p>呼，写了好几天的文章终于写完啦，撒花～～🌹<br>   如果你看到这里，觉得对你有所帮助的话，欢迎点赞收藏呀😁😁<br>当然也非常欢迎大家对有纰漏的地方进行指正和建议，我一定会虚心接受的！希望大家能一起学习进步！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「JavaScript」Array方法的详细总结及常用数组操作(附完整示例)

## 原文链接
[https://segmentfault.com/a/1190000014941768](https://segmentfault.com/a/1190000014941768)


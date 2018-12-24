---
title: 'js中数组操作' 
date: 2018-12-23 2:30:07
hidden: true
slug: h7kfl0rfeog
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">数组API</h1>
<ul>
<li>API: Application Programming Interface,应用程序编程接口;</li>
<li>js中对象提供的方法就叫做API；</li>
</ul>
<h2 id="articleHeader1">instanceof</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="检测一个对象是否是数组;(用来对付复杂数据类型;)
// 简单数据类型 typeof ;
A instanceof B  // A是不是B造出来的;
例：
    var arr = [1,2,3];
    console.log(arr instanceof Array); //arr属不属于Array类型;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>检测一个对象是否是数组;(用来对付复杂数据类型;)
<span class="hljs-comment">// 简单数据类型 typeof ;</span>
A <span class="hljs-keyword">instanceof</span> B  <span class="hljs-comment">// A是不是B造出来的;</span>
例：
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    <span class="hljs-built_in">console</span>.log(arr <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>); <span class="hljs-comment">//arr属不属于Array类型;</span>
</code></pre>
<h2 id="articleHeader2">Array.isArray( )</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.isArray(参数); // 判断参数是不是数组,返回布尔值;
例：
    var arr = [1,2,3];
    var num = 123;
    console.log(Array.isArray(arr)); //true
    console.log(Array.isArray(num)); //false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.isArray(参数); <span class="hljs-comment">// 判断参数是不是数组,返回布尔值;</span>
例：
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    <span class="hljs-keyword">var</span> num = <span class="hljs-number">123</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Array</span>.isArray(arr)); <span class="hljs-comment">//true</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Array</span>.isArray(num)); <span class="hljs-comment">//false</span>
</code></pre>
<h2 id="articleHeader3">toString( )</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="数组.toString(); // 把数组变成字符串,去除了[],内容用逗号链接;
例：
    var arr = [&quot;aaa&quot;,&quot;bbb&quot;,&quot;ccc&quot;];
    console.log(arr.toString());      //返回 aaa,bbb,ccc
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>数组.<span class="hljs-keyword">toString</span>(); <span class="hljs-comment">// 把数组变成字符串,去除了[],内容用逗号链接;</span>
例：
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"aaa"</span>,<span class="hljs-string">"bbb"</span>,<span class="hljs-string">"ccc"</span>];
    console.<span class="hljs-built_in">log</span>(arr.<span class="hljs-keyword">toString</span>());      <span class="hljs-comment">//返回 aaa,bbb,ccc</span>
</code></pre>
<h2 id="articleHeader4">valueOf( )</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="数组.valueOf();  //返回数组本身;   
例：
    var arr = [&quot;aaa&quot;,&quot;bbb&quot;,&quot;ccc&quot;];
    console.log(arr.valueOf());      //返回数组本身  [&quot;aaa&quot;,&quot;bbb&quot;,&quot;ccc&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>数组.valueOf();  <span class="hljs-regexp">//</span>返回数组本身;   
例：
    var arr = [<span class="hljs-string">"aaa"</span>,<span class="hljs-string">"bbb"</span>,<span class="hljs-string">"ccc"</span>];
    console.log(arr.valueOf());      <span class="hljs-regexp">//</span>返回数组本身  [<span class="hljs-string">"aaa"</span>,<span class="hljs-string">"bbb"</span>,<span class="hljs-string">"ccc"</span>]
</code></pre>
<h2 id="articleHeader5">数组.join(参数)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="数组.join(参数);  // 数组中的元素可以按照参数进行链接变成一个字符串;
console.log(arr.join());    //和toString()一样用逗号链接
console.log(arr.join(&quot;|&quot;)); //用参数链接
console.log(arr.join(&quot;&amp;&quot;)); //用参数链接
console.log(arr.join(&quot; &quot;)); //如果是空格，真的用空格链接
console.log(arr.join(&quot;&quot;));  //空字符是无缝连接
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>数组.<span class="hljs-keyword">join</span>(参数);  <span class="hljs-comment">// 数组中的元素可以按照参数进行链接变成一个字符串;</span>
console.<span class="hljs-keyword">log</span>(arr.<span class="hljs-keyword">join</span>());    <span class="hljs-comment">//和toString()一样用逗号链接</span>
console.<span class="hljs-keyword">log</span>(arr.<span class="hljs-keyword">join</span>(<span class="hljs-string">"|"</span>)); <span class="hljs-comment">//用参数链接</span>
console.<span class="hljs-keyword">log</span>(arr.<span class="hljs-keyword">join</span>(<span class="hljs-string">"&amp;"</span>)); <span class="hljs-comment">//用参数链接</span>
console.<span class="hljs-keyword">log</span>(arr.<span class="hljs-keyword">join</span>(<span class="hljs-string">" "</span>)); <span class="hljs-comment">//如果是空格，真的用空格链接</span>
console.<span class="hljs-keyword">log</span>(arr.<span class="hljs-keyword">join</span>(<span class="hljs-string">""</span>));  <span class="hljs-comment">//空字符是无缝连接</span>
</code></pre>
<h1 id="articleHeader6">数组元素的添加和删除</h1>
<h2 id="articleHeader7">push( )和pop( )</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 数组.push() //在数组的最末尾添加元素;
2. 数组.pop()  //不需要参数;在数组的最末尾删除一项;
例：
    var arr = [1,2,3];
    var aaa = arr.push(&quot;abc&quot;);//在数组的最末尾添加一个元素;
    console.log(arr);//元素被修改了
    console.log(aaa);//返回值是数组的长度;

    aaa = arr.pop();//不需要参数;在数组的最末尾删除一项;
    console.log(arr);//元素被修改了
    console.log(aaa);//被删除的那一项
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-number">1.</span> 数组.<span class="hljs-keyword">push</span>() <span class="hljs-comment">//在数组的最末尾添加元素;</span>
<span class="hljs-number">2.</span> 数组.<span class="hljs-keyword">pop</span>()  <span class="hljs-comment">//不需要参数;在数组的最末尾删除一项;</span>
例：
    var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    var aaa = arr.<span class="hljs-keyword">push</span>(<span class="hljs-string">"abc"</span>);<span class="hljs-comment">//在数组的最末尾添加一个元素;</span>
    console.<span class="hljs-built_in">log</span>(arr);<span class="hljs-comment">//元素被修改了</span>
    console.<span class="hljs-built_in">log</span>(aaa);<span class="hljs-comment">//返回值是数组的长度;</span>

    aaa = arr.<span class="hljs-keyword">pop</span>();<span class="hljs-comment">//不需要参数;在数组的最末尾删除一项;</span>
    console.<span class="hljs-built_in">log</span>(arr);<span class="hljs-comment">//元素被修改了</span>
    console.<span class="hljs-built_in">log</span>(aaa);<span class="hljs-comment">//被删除的那一项</span>
</code></pre>
<h2 id="articleHeader8">unshift( )和shift( )</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 数组.unshift() //在数组的最前面添加一个元素;
2. 数组.shift()  //不需要参数;在数组的最前面删除一项;
例：
    var arr = [1,2,3];
    aaa = arr.unshift(&quot;abc&quot;);//在数组的最前面添加一个元素;
    console.log(arr);//元素被修改了
    console.log(aaa);//返回值是数组的长度;

    aaa = arr.shift();//不需要参数;在数组的最前面删除一项;
    console.log(arr);//元素被修改了
    console.log(aaa);//被删除的那一项
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span> 数组.unshift() <span class="hljs-comment">//在数组的最前面添加一个元素;</span>
<span class="hljs-number">2.</span> 数组.shift()  <span class="hljs-comment">//不需要参数;在数组的最前面删除一项;</span>
例：
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    aaa = arr.unshift(<span class="hljs-string">"abc"</span>);<span class="hljs-comment">//在数组的最前面添加一个元素;</span>
    <span class="hljs-built_in">console</span>.log(arr);<span class="hljs-comment">//元素被修改了</span>
    <span class="hljs-built_in">console</span>.log(aaa);<span class="hljs-comment">//返回值是数组的长度;</span>

    aaa = arr.shift();<span class="hljs-comment">//不需要参数;在数组的最前面删除一项;</span>
    <span class="hljs-built_in">console</span>.log(arr);<span class="hljs-comment">//元素被修改了</span>
    <span class="hljs-built_in">console</span>.log(aaa);<span class="hljs-comment">//被删除的那一项</span>
</code></pre>
<h1 id="articleHeader9">数组元素排序</h1>
<h2 id="articleHeader10">reverse( )</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="reverse()   //翻转数组
例:
    var arr1 = [1,2,3,4,5];
    var aaa = arr1.reverse(); // [5,4,3,2,1]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code><span class="hljs-built_in">reverse</span>()   <span class="hljs-comment">//翻转数组</span>
例:
    <span class="hljs-built_in">var</span> arr1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
    <span class="hljs-built_in">var</span> aaa = arr1.<span class="hljs-built_in">reverse</span>(); <span class="hljs-comment">// [5,4,3,2,1]</span>
</code></pre>
<h2 id="articleHeader11">sort( )</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sort() // 数组中元素排序;(默认：从小到大)
      //  默认：按照首个字符的Unicode编码排序;如果第一个相同那么就比较第二个...
例：        
    var arr = [4,5,1,3,2,7,6];
    var aaa =arr.sort();
    console.log(aaa);          // [1, 2, 3, 4, 5, 6, 7]
    console.log(aaa === arr);// true 原数组被排序了(冒泡排序)
    //默认还可以排列字母;
    var arr2 = [&quot;c&quot;,&quot;e&quot;,&quot;d&quot;,&quot;a&quot;,&quot;b&quot;];
    var bbb = arr2.sort();
    console.log(bbb);         // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;, &quot;e&quot;]
    console.log(bbb===arr2); // true 原数组被排序了(冒泡排序)

sort() //数值大小排序方法,需要借助回调函数;
例：
      var arr = [4,5,1,13,2,7,6];
      //回调函数里面返回值如果是：参数1-参数2;升幂；   参数2-参数1;降幂；
      arr.sort(function (a,b) {
        return a-b; //升序
        //return b-a; //降序
        //return b.value-a.value; //按照元素value属性的大小排序;
      });
      console.log(arr); // [1, 2, 4, 5, 6, 7, 13]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">sort</span>() <span class="hljs-comment">// 数组中元素排序;(默认：从小到大)</span>
      <span class="hljs-comment">//  默认：按照首个字符的Unicode编码排序;如果第一个相同那么就比较第二个...</span>
例：        
    <span class="hljs-keyword">var</span> arr = [4,5,1,3,2,7,6];
    <span class="hljs-keyword">var</span> aaa =arr.<span class="hljs-keyword">sort</span>();
    console.<span class="hljs-built_in">log</span>(aaa);          <span class="hljs-comment">// [1, 2, 3, 4, 5, 6, 7]</span>
    console.<span class="hljs-built_in">log</span>(aaa === arr);<span class="hljs-comment">// true 原数组被排序了(冒泡排序)</span>
    <span class="hljs-comment">//默认还可以排列字母;</span>
    <span class="hljs-keyword">var</span> arr2 = [<span class="hljs-string">"c"</span>,<span class="hljs-string">"e"</span>,<span class="hljs-string">"d"</span>,<span class="hljs-string">"a"</span>,<span class="hljs-string">"b"</span>];
    <span class="hljs-keyword">var</span> bbb = arr2.<span class="hljs-keyword">sort</span>();
    console.<span class="hljs-built_in">log</span>(bbb);         <span class="hljs-comment">// ["a", "b", "c", "d", "e"]</span>
    console.<span class="hljs-built_in">log</span>(bbb===arr2); <span class="hljs-comment">// true 原数组被排序了(冒泡排序)</span>

<span class="hljs-keyword">sort</span>() <span class="hljs-comment">//数值大小排序方法,需要借助回调函数;</span>
例：
      <span class="hljs-keyword">var</span> arr = [4,5,1,13,2,7,6];
      <span class="hljs-comment">//回调函数里面返回值如果是：参数1-参数2;升幂；   参数2-参数1;降幂；</span>
      arr.<span class="hljs-keyword">sort</span>(function (a,b) {
        <span class="hljs-keyword">return</span> a-b; <span class="hljs-comment">//升序</span>
        <span class="hljs-comment">//return b-a; //降序</span>
        <span class="hljs-comment">//return b.value-a.value; //按照元素value属性的大小排序;</span>
      });
      console.<span class="hljs-built_in">log</span>(arr); <span class="hljs-comment">// [1, 2, 4, 5, 6, 7, 13]</span>
</code></pre>
<h2 id="articleHeader12">sort( )底层原理</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var aaa = bubbleSort([1,12,3], function (a,b) {
//        return a-b;//实参：array[j]-array[j+1]；
        return b-a;//实参：array[j+1]-array[j]；
    });
    console.log(aaa);

    function bubbleSort(array,fn){
        //外循环控制轮数，内循环控制次数，都是元素个数-1;
        for(var i=0;i<array.length-1;i++){
            for(var j=0;j<array.length-1-i;j++){//次数优化，多比较一轮，少比较一次;
                //满足条件交换位置;
//                if(array[j]>array[j+1]){//大于升幂排序；否则降幂;
                //a-b>0  和  a>b是一个意思;
                //b-a>0  和  a<b是一个意思;
//                if(array[j]-array[j+1]>0){//升幂排序
//                if(array[j+1]-array[j]>0){//降幂排序
                //把两个变量送到一个函数中;
                if(fn(array[j],array[j+1])>0){
                    var temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
            }
        }
        //返回数组
        return array;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>    <span class="hljs-keyword">var</span> aaa = bubbleSort([<span class="hljs-number">1</span>,<span class="hljs-number">12</span>,<span class="hljs-number">3</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(a,b)</span> </span>{
<span class="hljs-comment">//        return a-b;//实参：array[j]-array[j+1]；</span>
        <span class="hljs-keyword">return</span> b-a;<span class="hljs-comment">//实参：array[j+1]-array[j]；</span>
    });
    console.log(aaa);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bubbleSort</span><span class="hljs-params">(array,fn)</span></span>{
        <span class="hljs-comment">//外循环控制轮数，内循环控制次数，都是元素个数-1;</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">array</span>.length<span class="hljs-number">-1</span>;i++){
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j=<span class="hljs-number">0</span>;j&lt;<span class="hljs-keyword">array</span>.length<span class="hljs-number">-1</span>-i;j++){<span class="hljs-comment">//次数优化，多比较一轮，少比较一次;</span>
                <span class="hljs-comment">//满足条件交换位置;</span>
<span class="hljs-comment">//                if(array[j]&gt;array[j+1]){//大于升幂排序；否则降幂;</span>
                <span class="hljs-comment">//a-b&gt;0  和  a&gt;b是一个意思;</span>
                <span class="hljs-comment">//b-a&gt;0  和  a&lt;b是一个意思;</span>
<span class="hljs-comment">//                if(array[j]-array[j+1]&gt;0){//升幂排序</span>
<span class="hljs-comment">//                if(array[j+1]-array[j]&gt;0){//降幂排序</span>
                <span class="hljs-comment">//把两个变量送到一个函数中;</span>
                <span class="hljs-keyword">if</span>(fn(<span class="hljs-keyword">array</span>[j],<span class="hljs-keyword">array</span>[j+<span class="hljs-number">1</span>])&gt;<span class="hljs-number">0</span>){
                    <span class="hljs-keyword">var</span> temp = <span class="hljs-keyword">array</span>[j];
                    <span class="hljs-keyword">array</span>[j] = <span class="hljs-keyword">array</span>[j+<span class="hljs-number">1</span>];
                    <span class="hljs-keyword">array</span>[j+<span class="hljs-number">1</span>] = temp;
                }
            }
        }
        <span class="hljs-comment">//返回数组</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">array</span>;
    }
</code></pre>
<h1 id="articleHeader13">数组元素的操作</h1>
<h2 id="articleHeader14">concat( )</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="数组1.concat(数组2); // 链接两个数组;
var arr1 = [1,2,3];
var arr2 = [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;];
var arr3 = arr1.concat(arr2);
console.log(arr3)   //    [1, 2, 3, &quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>数组<span class="hljs-number">1.</span><span class="hljs-built_in">concat</span>(数组<span class="hljs-number">2</span>); // 链接两个数组;
<span class="hljs-built_in">var</span> arr1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-built_in">var</span> arr2 = [<span class="hljs-string">"a"</span>,<span class="hljs-string">"b"</span>,<span class="hljs-string">"c"</span>];
<span class="hljs-built_in">var</span> arr3 = arr1.<span class="hljs-built_in">concat</span>(arr2);
console.<span class="hljs-built_in">log</span>(arr3)   //    [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>]
</code></pre>
<h2 id="articleHeader15">slice( )</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="数组.slice(开始索引值，结束索引值);     //数组截取;
例 ：
      var arr = [1, 2, 3, &quot;a&quot;, &quot;b&quot;, &quot;c&quot;];
      console.log(arr.slice(3));            //从索引值为3截取到最后;[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
      console.log(arr.slice(0,3));            //包左不包右;[1, 2, 3]
      console.log(arr.slice(-2));            //负数是后几个;[&quot;b&quot;, &quot;c&quot;]
      console.log(arr.slice(3,0));            //如果前面的比后面的大，那么就是[];[]
      console.log(arr);                          //原数组不被修改;[1, 2, 3, &quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>数组.slice(开始索引值，结束索引值);     <span class="hljs-comment">//数组截取;</span>
例 ：
      var arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>];
      console.log(arr.slice(<span class="hljs-number">3</span>));            <span class="hljs-comment">//从索引值为3截取到最后;["a", "b", "c"]</span>
      console.log(arr.slice(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>));            <span class="hljs-comment">//包左不包右;[1, 2, 3]</span>
      console.log(arr.slice(<span class="hljs-number">-2</span>));            <span class="hljs-comment">//负数是后几个;["b", "c"]</span>
      console.log(arr.slice(<span class="hljs-number">3</span>,<span class="hljs-number">0</span>));            <span class="hljs-comment">//如果前面的比后面的大，那么就是[];[]</span>
      console.log(arr);                          <span class="hljs-comment">//原数组不被修改;[1, 2, 3, "a", "b", "c"]</span>
</code></pre>
<h2 id="articleHeader16">splice( )</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="数组.splice(开始索引值，删除几个，替换内容1，替换内容2，...);  // 替换和删除;
                                                      //改变原数组;返回值是被删除/替换的内容
例:
    var arr = [1,2,3,4,5,6,&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
    arr.splice(5);        //从索引值为3截取到最后;(删除)
    console.log(arr);     // [1, 2, 3, 4, 5]
    arr.splice(1,2);    //(删除指定个数)从索引为1的开始删除2个
    console.log(arr);   //[1, 4, 5]

//替换
    var arr = [1,2,3,4,5,6,&quot;a&quot;, &quot;b&quot;, &quot;c&quot;];
    console.log(arr.splice(3,3,&quot;aaa&quot;,&quot;bbb&quot;,&quot;ccc&quot;));    //(删除指定数并替换)
    console.log(arr);     // [1, 2, 3, &quot;aaa&quot;, &quot;bbb&quot;, &quot;ccc&quot;, &quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
//    添加
    arr.splice(3,0,&quot;aaa&quot;,&quot;bbb&quot;,&quot;ccc&quot;);//(删除指定个数)
//
    console.log(arr);//截取或者替换之后的;   [1, 2, 3, &quot;aaa&quot;, &quot;bbb&quot;, &quot;ccc&quot;, &quot;aaa&quot;, &quot;bbb&quot;, &quot;ccc&quot;, &quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>数组.<span class="hljs-built_in">splice</span>(开始索引值，删除几个，替换内容<span class="hljs-number">1</span>，替换内容<span class="hljs-number">2</span>，...);  // 替换和删除;
                                                      //改变原数组;返回值是被删除/替换的内容
例:
    <span class="hljs-built_in">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>]
    arr.<span class="hljs-built_in">splice</span>(<span class="hljs-number">5</span>);        //从索引值为<span class="hljs-number">3</span>截取到最后;(删除)
    console.<span class="hljs-built_in">log</span>(arr);     // [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
    arr.<span class="hljs-built_in">splice</span>(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);    //(删除指定个数)从索引为<span class="hljs-number">1</span>的开始删除<span class="hljs-number">2</span>个
    console.<span class="hljs-built_in">log</span>(arr);   //[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]

//替换
    <span class="hljs-built_in">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>];
    console.<span class="hljs-built_in">log</span>(arr.<span class="hljs-built_in">splice</span>(<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-string">"aaa"</span>,<span class="hljs-string">"bbb"</span>,<span class="hljs-string">"ccc"</span>));    //(删除指定数并替换)
    console.<span class="hljs-built_in">log</span>(arr);     // [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-string">"aaa"</span>, <span class="hljs-string">"bbb"</span>, <span class="hljs-string">"ccc"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>]
//    添加
    arr.<span class="hljs-built_in">splice</span>(<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-string">"aaa"</span>,<span class="hljs-string">"bbb"</span>,<span class="hljs-string">"ccc"</span>);//(删除指定个数)
//
    console.<span class="hljs-built_in">log</span>(arr);//截取或者替换之后的;   [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-string">"aaa"</span>, <span class="hljs-string">"bbb"</span>, <span class="hljs-string">"ccc"</span>, <span class="hljs-string">"aaa"</span>, <span class="hljs-string">"bbb"</span>, <span class="hljs-string">"ccc"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>]
</code></pre>
<h2 id="articleHeader17">indexOf / lastIndexOf</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="数组.indexOf(元素);      // 给元素，查索引(从前往后)
数组.lastIndexOf(元素);  // 给元素，查索引(从后往前)
例：
    var arr = [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;,&quot;d&quot;,&quot;c&quot;,&quot;b&quot;,&quot;b&quot;];
    console.log(arr.indexOf(&quot;b&quot;));        // 1 查到以后立刻返回
    console.log(arr.lastIndexOf(&quot;b&quot;));    // 6 找到以后立刻返回
    console.log(arr.indexOf(&quot;xxx&quot;));    // -1;  查不到就返回-1；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>数组.indexOf(元素);      <span class="hljs-comment">// 给元素，查索引(从前往后)</span>
数组.lastIndexOf(元素);  <span class="hljs-comment">// 给元素，查索引(从后往前)</span>
例：
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"a"</span>,<span class="hljs-string">"b"</span>,<span class="hljs-string">"c"</span>,<span class="hljs-string">"d"</span>,<span class="hljs-string">"c"</span>,<span class="hljs-string">"b"</span>,<span class="hljs-string">"b"</span>];
    <span class="hljs-built_in">console</span>.log(arr.indexOf(<span class="hljs-string">"b"</span>));        <span class="hljs-comment">// 1 查到以后立刻返回</span>
    <span class="hljs-built_in">console</span>.log(arr.lastIndexOf(<span class="hljs-string">"b"</span>));    <span class="hljs-comment">// 6 找到以后立刻返回</span>
    <span class="hljs-built_in">console</span>.log(arr.indexOf(<span class="hljs-string">"xxx"</span>));    <span class="hljs-comment">// -1;  查不到就返回-1；</span>
</code></pre>
<h1 id="articleHeader18">数组迭代(遍历)</h1>
<h2 id="articleHeader19">every()</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="对数组中每一项运行回调函数，如果都返回true，every返回true，
如果有一项返回false，则停止遍历 every返回false；不写默认返回false
像保镖失误一次，游戏结束！！！
例：
1.    var arr = [111,222,333,444,555];
    arr.every(function (a,b,c) {
        console.log(a);    //元素
        console.log(b);    //索引值
        console.log(c);    //数组本身;
        console.log(&quot;-----&quot;);    //数组本身;
        //数组中元素赋值：c[b] = 值;      a=有时候无法赋值;
        return true;
    });

2.  //every返回一个bool值，全部是true才是true；有一个是false，结果就是false
    var bool = arr.every(function (element, index, array) {
        //判断：我们定义所有元素都大于200;
        //if(element > 100){
        if(element > 200){
            return true;
        }else{
            return false;
        }
    })
    alert(bool); //false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>对数组中每一项运行回调函数，如果都返回<span class="hljs-literal">true</span>，every返回<span class="hljs-literal">true</span>，
如果有一项返回<span class="hljs-literal">false</span>，则停止遍历 every返回<span class="hljs-literal">false</span>；不写默认返回<span class="hljs-literal">false</span>
像保镖失误一次，游戏结束！！！
例：
<span class="hljs-number">1.</span>    <span class="hljs-built_in">var</span> arr = [<span class="hljs-number">111</span>,<span class="hljs-number">222</span>,<span class="hljs-number">333</span>,<span class="hljs-number">444</span>,<span class="hljs-number">555</span>];
    arr.every(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a,b,c</span>) </span>{
        <span class="hljs-built_in">console</span>.log(a);    <span class="hljs-comment">//元素</span>
        <span class="hljs-built_in">console</span>.log(b);    <span class="hljs-comment">//索引值</span>
        <span class="hljs-built_in">console</span>.log(c);    <span class="hljs-comment">//数组本身;</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"-----"</span>);    <span class="hljs-comment">//数组本身;</span>
        <span class="hljs-comment">//数组中元素赋值：c[b] = 值;      a=有时候无法赋值;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    });

<span class="hljs-number">2.</span>  <span class="hljs-comment">//every返回一个bool值，全部是true才是true；有一个是false，结果就是false</span>
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">bool</span> = arr.every(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element, index, array</span>) </span>{
        <span class="hljs-comment">//判断：我们定义所有元素都大于200;</span>
        <span class="hljs-comment">//if(element &gt; 100){</span>
        <span class="hljs-keyword">if</span>(element &gt; <span class="hljs-number">200</span>){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }<span class="hljs-title">else</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    })
    alert(<span class="hljs-built_in">bool</span>); <span class="hljs-comment">//false</span>
</code></pre>
<h2 id="articleHeader20">filter()</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//   对数组中每一项运行回调函数，该函数返回结果是true的项组成的新数组
//     新数组是有老数组中的元素组成的，return为ture的项;
例：
    var arr = [111,222,333,444,555];
    var newArr = arr.filter(function (element, index, array) {
        //只要是奇数，就组成数组;(数组中辨别元素)
        if(element%2 === 0){
            return true;
        }else{
            return false;
        }
    })

    console.log(newArr); // [222, 444]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//   对数组中每一项运行回调函数，该函数返回结果是true的项组成的新数组</span>
<span class="hljs-comment">//     新数组是有老数组中的元素组成的，return为ture的项;</span>
例：
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">111</span>,<span class="hljs-number">222</span>,<span class="hljs-number">333</span>,<span class="hljs-number">444</span>,<span class="hljs-number">555</span>];
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> </span>(element, index, array) {
        <span class="hljs-comment">//只要是奇数，就组成数组;(数组中辨别元素)</span>
        <span class="hljs-keyword">if</span>(element%<span class="hljs-number">2</span> === <span class="hljs-number">0</span>){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    })

    console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>); <span class="hljs-comment">// [222, 444]</span>
</code></pre>
<h2 id="articleHeader21">forEach()</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 和for循环一样；没有返回值;
例：
    var arr = [111,222,333,444,555];
    var sum = 0;
    var aaa = arr.forEach(function (element,index,array) {
        console.log(element); // 输出数组中的每一个元素
        console.log(index); // 数组元素对应的索引值
        console.log(array); // 数组本身 [111, 222, 333, 444, 555]
        sum += element; //数组中元素求和;
    });
    console.log(sum); // 数组元素加起来的和
    console.log(aaa);//undefined；没有返回值 所以返回undefined
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 和for循环一样；没有返回值;</span>
例：
    <span class="hljs-keyword">var</span> arr = [111,222,333,444,555];
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">sum</span> = 0;
    <span class="hljs-keyword">var</span> aaa = arr.<span class="hljs-keyword">forEach</span>(function (element,index,array) {
        console.<span class="hljs-built_in">log</span>(element); <span class="hljs-comment">// 输出数组中的每一个元素</span>
        console.<span class="hljs-built_in">log</span>(index); <span class="hljs-comment">// 数组元素对应的索引值</span>
        console.<span class="hljs-built_in">log</span>(array); <span class="hljs-comment">// 数组本身 [111, 222, 333, 444, 555]</span>
        <span class="hljs-keyword">sum</span> += element; <span class="hljs-comment">//数组中元素求和;</span>
    });
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">sum</span>); <span class="hljs-comment">// 数组元素加起来的和</span>
    console.<span class="hljs-built_in">log</span>(aaa);<span class="hljs-comment">//undefined；没有返回值 所以返回undefined</span>
</code></pre>
<h2 id="articleHeader22">map()</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//  对数组中每一项运行回调函数，返回该函数的结果组成的新数组
//    return什么新数组中就有什么; 不return返回undefined; 对数组二次加工
例：
    var arr = [111,222,333,444,555];
    var newArr = arr.map(function (element, index, array) {
        if(index == 2){
            return element; // 这里return了 所以下面返回的值是333
        }
        return element*100; // 返回的元素值都乘上100后的值
    })
    console.log(newArr); // [11100, 22200, 333, 44400, 55500]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//  对数组中每一项运行回调函数，返回该函数的结果组成的新数组</span>
<span class="hljs-comment">//    return什么新数组中就有什么; 不return返回undefined; 对数组二次加工</span>
例：
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">111</span>,<span class="hljs-number">222</span>,<span class="hljs-number">333</span>,<span class="hljs-number">444</span>,<span class="hljs-number">555</span>];
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span> </span>(element, index, array) {
        <span class="hljs-keyword">if</span>(index == <span class="hljs-number">2</span>){
            <span class="hljs-keyword">return</span> element; <span class="hljs-comment">// 这里return了 所以下面返回的值是333</span>
        }
        <span class="hljs-keyword">return</span> element*<span class="hljs-number">100</span>; <span class="hljs-comment">// 返回的元素值都乘上100后的值</span>
    })
    console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>); <span class="hljs-comment">// [11100, 22200, 333, 44400, 55500]</span>
</code></pre>
<h2 id="articleHeader23">some()</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//对数组中每一项运行回调函数，如果该函数对某一项返回true，则some返回true; 像杀手，有一个成功，就胜利了！！！
例：
    var arr = [111,222,333,444,555];
    var bool = arr.some(function (ele,i,array) {
        //判断：数组中有3的倍数
        if(ele%3 == 0){
            return true;
        }
        return false;
    })
    alert(bool); //true ; 有一个成功就是true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">//对数组中每一项运行回调函数，如果该函数对某一项返回true，则some返回true; 像杀手，有一个成功，就胜利了！！！</span>
例：
    <span class="hljs-built_in">var</span> arr = [<span class="hljs-number">111</span>,<span class="hljs-number">222</span>,<span class="hljs-number">333</span>,<span class="hljs-number">444</span>,<span class="hljs-number">555</span>];
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">bool</span> = arr.some(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ele,i,array</span>) </span>{
        <span class="hljs-comment">//判断：数组中有3的倍数</span>
        <span class="hljs-keyword">if</span>(ele%<span class="hljs-number">3</span> == <span class="hljs-number">0</span>){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    })
    alert(<span class="hljs-built_in">bool</span>); <span class="hljs-comment">//true ; 有一个成功就是true</span>
</code></pre>
<h2 id="articleHeader24">数组清空</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1. arr.length = 0; // (不好，伪数组无法清空)
    2. arr.splice(0); // 伪数组没有这个方法;
    3. arr = [];     // 可以操作伪数组; (推荐!)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    <span class="hljs-number">1.</span> arr.length = <span class="hljs-number">0</span>; <span class="hljs-comment">// (不好，伪数组无法清空)</span>
    <span class="hljs-number">2.</span> arr.splice(<span class="hljs-number">0</span>); <span class="hljs-comment">// 伪数组没有这个方法;</span>
    <span class="hljs-number">3.</span> arr = [];     <span class="hljs-comment">// 可以操作伪数组; (推荐!)</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 伪数组: 就是长的像数组，但是没有数组的方法;也不能添加和删除元素;
例： // arguments
        fn(111,222,333);
        function fn(){
            arguments.length = 0; // 无法清空 返回 [1, 2, 3]
           arguments.splice(0); // 会报错 arguments.splice is not a function
            arguments = []; // 可以清空,返回空数组[] 
            console.log(arguments);
        }

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">// 伪数组: 就是长的像数组，但是没有数组的方法;也不能添加和删除元素;</span>
例： <span class="hljs-comment">// arguments</span>
        fn(<span class="hljs-number">111</span>,<span class="hljs-number">222</span>,<span class="hljs-number">333</span>);
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">arguments</span>.length = <span class="hljs-number">0</span>; <span class="hljs-comment">// 无法清空 返回 [1, 2, 3]</span>
           <span class="hljs-built_in">arguments</span>.splice(<span class="hljs-number">0</span>); <span class="hljs-comment">// 会报错 arguments.splice is not a function</span>
            <span class="hljs-built_in">arguments</span> = []; <span class="hljs-comment">// 可以清空,返回空数组[] </span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>);
        }

</code></pre>
<h2 id="articleHeader25">数组案例</h2>
<p>1.将一个字符串数组输出为|分割的形式，比如“刘备|张飞|关羽”。使用两种方式实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       var arr = [&quot;刘备&quot;,&quot;张飞&quot;,&quot;关羽&quot;];
       var separator = &quot;|&quot;;
       //通过for循环累加
       var str = arr[0];
       for(var i=1;i<arr.length;i++){
           str += separator+arr[i];
       }
       console.log(str); // 刘备|张飞|关羽
       //join()可以把数组中的元素链接成字符串;
       console.log(arr.join(&quot;|&quot;)); // 刘备|张飞|关羽" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>       <span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"刘备"</span>,<span class="hljs-string">"张飞"</span>,<span class="hljs-string">"关羽"</span>];
       <span class="hljs-keyword">var</span> separator = <span class="hljs-string">"|"</span>;
       <span class="hljs-comment">//通过for循环累加</span>
       <span class="hljs-keyword">var</span> str = arr[<span class="hljs-number">0</span>];
       <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">1</span>;i&lt;arr.length;i++){
           str += separator+arr[i];
       }
       <span class="hljs-built_in">console</span>.log(str); <span class="hljs-comment">// 刘备|张飞|关羽</span>
       <span class="hljs-comment">//join()可以把数组中的元素链接成字符串;</span>
       <span class="hljs-built_in">console</span>.log(arr.join(<span class="hljs-string">"|"</span>)); <span class="hljs-comment">// 刘备|张飞|关羽</span></code></pre>
<p>2.将一个字符串数组的元素的顺序进行反转。["a", "b", "c", "d"] -&gt; [ "d","c","b","a"]。使用两种种方式实现。提示：第i个和第length-i-1个进行交换</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 数组.reverse() 方法
           var arr = [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;];
           console.log(arr.reverse()); // [&quot;d&quot;, &quot;c&quot;, &quot;b&quot;, &quot;a&quot;]
       
       //  三种：1.正向遍历，反向添加;  2.反向遍历，正向添加;   3.元数组元素交换位置;
           for(var i=0;i<arr.length/2;i++){
               var temp = arr[i];
               arr[i] = arr[arr.length-1-i];
               arr[arr.length-1-i] = temp;
           }
           console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  // 数组.<span class="hljs-built_in">reverse</span>() 方法
           <span class="hljs-built_in">var</span> arr = [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>, <span class="hljs-string">"d"</span>];
           console.<span class="hljs-built_in">log</span>(arr.<span class="hljs-built_in">reverse</span>()); // [<span class="hljs-string">"d"</span>, <span class="hljs-string">"c"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"a"</span>]
       
       //  三种：<span class="hljs-number">1</span>.正向遍历，反向添加;  <span class="hljs-number">2</span>.反向遍历，正向添加;   <span class="hljs-number">3</span>.元数组元素交换位置;
           <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.<span class="hljs-built_in">length</span>/<span class="hljs-number">2</span>;i++){
               <span class="hljs-built_in">var</span> temp = arr[i];
               arr[i] = arr[arr.<span class="hljs-built_in">length</span>-<span class="hljs-number">1</span>-i];
               arr[arr.<span class="hljs-built_in">length</span>-<span class="hljs-number">1</span>-i] = temp;
           }
           console.<span class="hljs-built_in">log</span>(arr);</code></pre>
<p>3.工资的数组[1500, 1200, 2000, 2100, 1800],把工资超过2000的删除</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var arr = [1500, 1200, 2000, 2100, 1800];
   //利用filter()形成一个数组;return true;组成的数组;
   var newArr = arr.filter(function (ele, i, array) {
       //2000以上返回false;
       if(ele<2000){
           return true;
       }else{
           return false;
       }
   });
   console.log(newArr); // [1500, 1200, 1800]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>   <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1500</span>, <span class="hljs-number">1200</span>, <span class="hljs-number">2000</span>, <span class="hljs-number">2100</span>, <span class="hljs-number">1800</span>];
   <span class="hljs-comment">//利用filter()形成一个数组;return true;组成的数组;</span>
   <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> </span>(ele, i, array) {
       <span class="hljs-comment">//2000以上返回false;</span>
       <span class="hljs-keyword">if</span>(ele&lt;<span class="hljs-number">2000</span>){
           <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
       }<span class="hljs-keyword">else</span>{
           <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
       }
   });
   console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>); <span class="hljs-comment">// [1500, 1200, 1800]</span></code></pre>
<p>4.["c", "a", "z", "a", "x", "a"]找到数组中每一个a出现的位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var arr = [&quot;c&quot;, &quot;a&quot;, &quot;z&quot;, &quot;a&quot;, &quot;x&quot;, &quot;a&quot;];
   //遍历数组(for/while/do...while)    forEach();
   arr.forEach(function (ele, index, array) {
       //如果元素等于“a”，那么就输出索引值；
       if(&quot;a&quot; === ele){
           console.log(index);
       }
   });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"c"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"z"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"x"</span>, <span class="hljs-string">"a"</span>];
   <span class="hljs-comment">//遍历数组(for/while/do...while)    forEach();</span>
   arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ele, index, array</span>) </span>{
       <span class="hljs-comment">//如果元素等于“a”，那么就输出索引值；</span>
       <span class="hljs-keyword">if</span>(<span class="hljs-string">"a"</span> === ele){
           <span class="hljs-built_in">console</span>.log(index);
       }
   });</code></pre>
<p>5.编写一个方法去掉一个数组的重复元素 (数组去重)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       var arr = [&quot;鸣人&quot;,&quot;鸣人&quot;,&quot;佐助&quot;,&quot;佐助&quot;,&quot;小樱&quot;,&quot;小樱&quot;];
   //  方法1：  思路：定义一个新数组，遍历老数组，判断，如果新数组里面没有老数组的元素就添加，否则就不添加；
       var newArr = [];
       //遍历老数组
       arr.forEach(function (ele,index,array) {
           //检测老数组中的元素，如果新数组中存在就不添加了，不存在才添加;
           if(newArr.indexOf(ele) === -1){//不存在就添加;（去新数组中查找元素索引值，如果为-1就是没有）
               newArr.push(ele);
           }
       });
       console.log(newArr); // [&quot;鸣人&quot;, &quot;佐助&quot;, &quot;小樱&quot;]



" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>       <span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"鸣人"</span>,<span class="hljs-string">"鸣人"</span>,<span class="hljs-string">"佐助"</span>,<span class="hljs-string">"佐助"</span>,<span class="hljs-string">"小樱"</span>,<span class="hljs-string">"小樱"</span>];
   <span class="hljs-comment">//  方法1：  思路：定义一个新数组，遍历老数组，判断，如果新数组里面没有老数组的元素就添加，否则就不添加；</span>
       <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = [];
       <span class="hljs-comment">//遍历老数组</span>
       arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> </span>(ele,index,array) {
           <span class="hljs-comment">//检测老数组中的元素，如果新数组中存在就不添加了，不存在才添加;</span>
           <span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.indexOf(ele) === <span class="hljs-number">-1</span>){<span class="hljs-comment">//不存在就添加;（去新数组中查找元素索引值，如果为-1就是没有）</span>
               <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.push(ele);
           }
       });
       console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>); <span class="hljs-comment">// ["鸣人", "佐助", "小樱"]</span>



</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js中数组操作

## 原文链接
[https://segmentfault.com/a/1190000012276002](https://segmentfault.com/a/1190000012276002)


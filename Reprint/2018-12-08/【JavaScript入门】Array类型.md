---
title: '【JavaScript入门】Array类型' 
date: 2018-12-08 2:30:30
hidden: true
slug: wjkvrbfe1t
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Array</h1>
<blockquote>数组也是对象数据类型的 <code>typeof [] -&gt;'object'</code><p>数组也有属性名，只不过属性名是数字，我们把数字属性名称之为它的索引：数组是以数字作为索引，索引从零开始，有一个length属性代表数组的长度。</p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV6ZBh?w=313&amp;h=179" src="https://static.alili.tech/img/bV6ZBh?w=313&amp;h=179" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>类数组：类似于数组，但是不是数组<br>1、通过getElementsByTagName获取的元素集合是类数组<br>2、函数中的实参集合arguments也是类数组<br>...</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV6ZAN?w=504&amp;h=298" src="https://static.alili.tech/img/bV6ZAN?w=504&amp;h=298" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV6ZAZ?w=485&amp;h=372" src="https://static.alili.tech/img/bV6ZAZ?w=485&amp;h=372" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>循环数组中的每一项</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.aa = 100;

//=>FOR循环操作
for (var i = 0; i < ary.length; i++) {
    console.log(arr[i]);
}

//=>FOR IN循环操作
for (var key in arr) {
    //key:属性名(数组中的属性名是索引)
    console.log(arr[key]);
}

//=>FOR循环只能遍历到数组私有的一些属性，而FOR IN循环可以把一些自定义的公共属性也能遍历到" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Array</span>.prototype.aa = <span class="hljs-number">100</span>;

<span class="hljs-comment">//=&gt;FOR循环操作</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; ary.length; i++) {
    <span class="hljs-built_in">console</span>.log(arr[i]);
}

<span class="hljs-comment">//=&gt;FOR IN循环操作</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> arr) {
    <span class="hljs-comment">//key:属性名(数组中的属性名是索引)</span>
    <span class="hljs-built_in">console</span>.log(arr[key]);
}

<span class="hljs-comment">//=&gt;FOR循环只能遍历到数组私有的一些属性，而FOR IN循环可以把一些自定义的公共属性也能遍历到</span></code></pre>
<h2 id="articleHeader1">数组中的常用方法</h2>
<blockquote>数组中有很多常用方法  <code>console.dir(Array.prototype)</code>
</blockquote>
<p>1、方法的意义和作用<br>2、方法的形参<br>3、方法的返回值<br>4、通过此方法，原来的数组是否发生了改变</p>
<h3 id="articleHeader2"><strong><code>实现数组的增加、修改、删除</code></strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ary = [12,23,34];
push/unshift
//=>增加
/*
 * 1、push：向数组的末尾追加新内容
 *   参数：一到多个，任何数据类型都可以，想要给数组末尾追加什么，直接传递到push方法中即可，传递多个用逗号隔开
 *   返回值：新增后数组的长度
 *   原有数组改变了
 */ 

/*
 * 2、unshift：向数组开头追加新内容
 *   参数：需要追加的内容（可以是多个任何数据类型的值）
 *   返回值：新增后数组的长度
 *   原来数组改变了
*/

/*
 * 3、把数组当做一个普通的对象，使用对象键值对的操作，给其设置新的属性（索引）
 * arr[arr.length]=xxx  向数组的末尾追加了新的内容
*/

//=>删除
/*
 * 1、pop：删除数组最后一项
 *   参数：无
 *   返回值：被删除的那一项内容
 *   原有数组改变了
*/

/*
 * 2、shift：删除数组第一项
 *   参数：无
 *   返回值：被删除那一项的内容
 *   原有数组改变了
 * 使用shift删除第一项之后，后面每一项的索引都要向前进一位（导致后面项的索引发生改变）
*/

/*
 * 3、把数组当做普通的对象操作
 * delete删除：`delete ary[索引]`删除指定索引这一项(当前项被删除后，原有数组其它项的索引不会改变；当前数组的length也不会改变；)
 * 
 * ary.length--：删除数组最后一项
*/

//=>splice：数组中内置的方法，可以实现数组的增加、修改、删除
/*
 * splice实现删除
 *   splice(n,m)：从索引n开始删除m个（m不写是删除到数组的末尾）
 *   返回值：被删除的内容(以一个新数组保存)
 *   原有数组改变了
 *   -> splice(0) 清空数组
 *   -> splice()  一项都不删除,返回一个新的空数组
 *   -> splice(0,1) 删除第一项
 *   -> splice(ary.length-1) 删除最后一项
 *  
 * splice实现修改
 *  splice(n,m,x)：在原有删除的基础上，用x代替删除的内容
 * 
 * splice实现增加
 *  splice(n,0,x)：在修改的基础上，我们一项都不删除，把x插入到索引n的前面
 *  -> ary.splice(0,0,x) 向数组开头追加新的内容
 *  -> ary.splice(ary.length,0,x) 向数组末尾追加新元素
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ary = [<span class="hljs-number">12</span>,<span class="hljs-number">23</span>,<span class="hljs-number">34</span>];
push/unshift
<span class="hljs-comment">//=&gt;增加</span>
<span class="hljs-comment">/*
 * 1、push：向数组的末尾追加新内容
 *   参数：一到多个，任何数据类型都可以，想要给数组末尾追加什么，直接传递到push方法中即可，传递多个用逗号隔开
 *   返回值：新增后数组的长度
 *   原有数组改变了
 */</span> 

<span class="hljs-comment">/*
 * 2、unshift：向数组开头追加新内容
 *   参数：需要追加的内容（可以是多个任何数据类型的值）
 *   返回值：新增后数组的长度
 *   原来数组改变了
*/</span>

<span class="hljs-comment">/*
 * 3、把数组当做一个普通的对象，使用对象键值对的操作，给其设置新的属性（索引）
 * arr[arr.length]=xxx  向数组的末尾追加了新的内容
*/</span>

<span class="hljs-comment">//=&gt;删除</span>
<span class="hljs-comment">/*
 * 1、pop：删除数组最后一项
 *   参数：无
 *   返回值：被删除的那一项内容
 *   原有数组改变了
*/</span>

<span class="hljs-comment">/*
 * 2、shift：删除数组第一项
 *   参数：无
 *   返回值：被删除那一项的内容
 *   原有数组改变了
 * 使用shift删除第一项之后，后面每一项的索引都要向前进一位（导致后面项的索引发生改变）
*/</span>

<span class="hljs-comment">/*
 * 3、把数组当做普通的对象操作
 * delete删除：`delete ary[索引]`删除指定索引这一项(当前项被删除后，原有数组其它项的索引不会改变；当前数组的length也不会改变；)
 * 
 * ary.length--：删除数组最后一项
*/</span>

<span class="hljs-comment">//=&gt;splice：数组中内置的方法，可以实现数组的增加、修改、删除</span>
<span class="hljs-comment">/*
 * splice实现删除
 *   splice(n,m)：从索引n开始删除m个（m不写是删除到数组的末尾）
 *   返回值：被删除的内容(以一个新数组保存)
 *   原有数组改变了
 *   -&gt; splice(0) 清空数组
 *   -&gt; splice()  一项都不删除,返回一个新的空数组
 *   -&gt; splice(0,1) 删除第一项
 *   -&gt; splice(ary.length-1) 删除最后一项
 *  
 * splice实现修改
 *  splice(n,m,x)：在原有删除的基础上，用x代替删除的内容
 * 
 * splice实现增加
 *  splice(n,0,x)：在修改的基础上，我们一项都不删除，把x插入到索引n的前面
 *  -&gt; ary.splice(0,0,x) 向数组开头追加新的内容
 *  -&gt; ary.splice(ary.length,0,x) 向数组末尾追加新元素
*/</span></code></pre>
<h3 id="articleHeader3"><strong><code>数组的查询</code></strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * slice：数组的查询
 *  参数：slice(n,m) 从索引n开始找到索引为m处（不包含m）
 *  返回值：把找到的部分以一个新数组返回
 *  原来的数组不变
 *   
 *  -> slice(n) 从索引n开始找到末尾
 *  -> slice(0) / slice() 数组克隆,克隆一份和原来数组一模一样的新数组
 *  -> slice支持负数索引，如果传递的索引为负数，浏览器解析的时候是按照 总长度+负数索引 来处理的
 *  ...
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * slice：数组的查询
 *  参数：slice(n,m) 从索引n开始找到索引为m处（不包含m）
 *  返回值：把找到的部分以一个新数组返回
 *  原来的数组不变
 *   
 *  -&gt; slice(n) 从索引n开始找到末尾
 *  -&gt; slice(0) / slice() 数组克隆,克隆一份和原来数组一模一样的新数组
 *  -&gt; slice支持负数索引，如果传递的索引为负数，浏览器解析的时候是按照 总长度+负数索引 来处理的
 *  ...
*/</span></code></pre>
<h3 id="articleHeader4"><strong><code>将两个数组进行拼接</code></strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * concat：将多个数组拼接在一起
 *  参数：要拼接的内容（把内容放在原数组的后面），可以是一个数组，也可以是一些数据值
 *  返回：拼接后的新数组
 *  原有数组不变
 *   
 *  -> concat() 什么都没有拼接，相当于把原有数组克隆一份一模一样的新数组出来
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * concat：将多个数组拼接在一起
 *  参数：要拼接的内容（把内容放在原数组的后面），可以是一个数组，也可以是一些数据值
 *  返回：拼接后的新数组
 *  原有数组不变
 *   
 *  -&gt; concat() 什么都没有拼接，相当于把原有数组克隆一份一模一样的新数组出来
*/</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV6ZA4?w=912&amp;h=250" src="https://static.alili.tech/img/bV6ZA4?w=912&amp;h=250" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5"><strong><code>把数组转换为字符串的</code></strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * 1、toString：实现把数组转化为字符串（转换后的字符串以逗号分隔每一项）
 *   参数：无
 *   返回值：转换的字符串
 *   原有数组不变
*/

/*
 * 2、join：把数组按照指定的分隔符转换为字符串，和字符串中的split相对应
 *   参数：指定的链接符
 *   返回值：转换后的字符串
 *   原有数组不变
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * 1、toString：实现把数组转化为字符串（转换后的字符串以逗号分隔每一项）
 *   参数：无
 *   返回值：转换的字符串
 *   原有数组不变
*/</span>

<span class="hljs-comment">/*
 * 2、join：把数组按照指定的分隔符转换为字符串，和字符串中的split相对应
 *   参数：指定的链接符
 *   返回值：转换后的字符串
 *   原有数组不变
*/</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV6ZA6?w=523&amp;h=305" src="https://static.alili.tech/img/bV6ZA6?w=523&amp;h=305" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//=>已知数组中的每一项都是数字，想实现数组求和，我们如何实现？
//1、循环实现
var total=null;
for(var i=0;i<ary.length;i++){
    total+=ary[i];
}

//2、利用join
var total = eval(ary.join('+')); //->evel：把字符串变为JS表达式执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//=&gt;已知数组中的每一项都是数字，想实现数组求和，我们如何实现？</span>
<span class="hljs-comment">//1、循环实现</span>
<span class="hljs-keyword">var</span> total=<span class="hljs-literal">null</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;ary.length;i++){
    total+=ary[i];
}

<span class="hljs-comment">//2、利用join</span>
<span class="hljs-keyword">var</span> total = <span class="hljs-built_in">eval</span>(ary.join(<span class="hljs-string">'+'</span>)); <span class="hljs-comment">//-&gt;evel：把字符串变为JS表达式执行</span></code></pre>
<h3 id="articleHeader6"><strong><code>实现数组中每一项的排序和排列</code></strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * 1、reverse：把数组中的每一项倒过来排列
 *   参数：无
 *   返回值：排序后的数组
 *   原有数组改变 
*/

/*
 * 2、sort：实现数组的排序
 *   参数：无或者回调函数
 *   返回值：排序后的数组
 *   原有数组改变
 *   
 * 不传递参数的情况下：可以给10以内的数字进行升序排列，但是超过10的就无法处理了（多位数只识别第一位）
 *  
 * ary.sort(function(a,b){
 *     return a-b; //->升序
 *     return b-a; //->降序
 * });
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * 1、reverse：把数组中的每一项倒过来排列
 *   参数：无
 *   返回值：排序后的数组
 *   原有数组改变 
*/</span>

<span class="hljs-comment">/*
 * 2、sort：实现数组的排序
 *   参数：无或者回调函数
 *   返回值：排序后的数组
 *   原有数组改变
 *   
 * 不传递参数的情况下：可以给10以内的数字进行升序排列，但是超过10的就无法处理了（多位数只识别第一位）
 *  
 * ary.sort(function(a,b){
 *     return a-b; //-&gt;升序
 *     return b-a; //-&gt;降序
 * });
*/</span></code></pre>
<h3 id="articleHeader7"><strong><code>验证数组中是否包含某一项</code></strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * indexOf / lastIndexOf：获取当前项在数组中第一次或者最后一次出现位置的索引
 *   数组中的这两个方法在IE6~8下不兼容
 *   字符串中的这两个方法兼容所有的浏览器
 * 
 * 如果当前数组中并没有这一项，返回的索引是-1，我们根据这一点可以验证数组中是否包含这一项 
*/
if(ary.indexOf(12)>-1){
    //->数组中包含12
}

Array.prototype.myIndexOf = function myIndexOf(value){
    var result = -1;
    for(var i=0;i<this.length;i++){
        if(value===this[i]){
            result = i;
            break;
        }
    }
    return result;
}
arr.myIndexOf(12)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * indexOf / lastIndexOf：获取当前项在数组中第一次或者最后一次出现位置的索引
 *   数组中的这两个方法在IE6~8下不兼容
 *   字符串中的这两个方法兼容所有的浏览器
 * 
 * 如果当前数组中并没有这一项，返回的索引是-1，我们根据这一点可以验证数组中是否包含这一项 
*/</span>
<span class="hljs-keyword">if</span>(ary.indexOf(<span class="hljs-number">12</span>)&gt;<span class="hljs-number">-1</span>){
    <span class="hljs-comment">//-&gt;数组中包含12</span>
}

<span class="hljs-built_in">Array</span>.prototype.myIndexOf = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myIndexOf</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-keyword">var</span> result = <span class="hljs-number">-1</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.length;i++){
        <span class="hljs-keyword">if</span>(value===<span class="hljs-keyword">this</span>[i]){
            result = i;
            <span class="hljs-keyword">break</span>;
        }
    }
    <span class="hljs-keyword">return</span> result;
}
arr.myIndexOf(<span class="hljs-number">12</span>)</code></pre>
<h3 id="articleHeader8"><strong><code>遍历数组中每一项的方法</code></strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//=>以下方法在IE6~8下都不兼容

/*
 * forEach：遍历数组中的每一项
*/
arr.forEach(function(value,index){
    //=>数组中有多少项，当前回调函数执行多少次；每一次传递进来的value就是当前遍历数组这一项的值，index就是遍历这一项的索引
});

/*
 * map：遍历数组中的每一项，在forEach的基础上，可以修改每一项的值
*/
arr.map(function(value,index){
    //=>数组中有多少项，当前回调函数执行多少次；每一次传递进来的value就是当前遍历数组这一项的值，index就是遍历这一项的索引
    return xxx; //=>RETURN后面返回的结果就是把当前遍历的这一项修改为xxx
});

filter
find
reduce
every
...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//=&gt;以下方法在IE6~8下都不兼容</span>

<span class="hljs-comment">/*
 * forEach：遍历数组中的每一项
*/</span>
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,index</span>)</span>{
    <span class="hljs-comment">//=&gt;数组中有多少项，当前回调函数执行多少次；每一次传递进来的value就是当前遍历数组这一项的值，index就是遍历这一项的索引</span>
});

<span class="hljs-comment">/*
 * map：遍历数组中的每一项，在forEach的基础上，可以修改每一项的值
*/</span>
arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,index</span>)</span>{
    <span class="hljs-comment">//=&gt;数组中有多少项，当前回调函数执行多少次；每一次传递进来的value就是当前遍历数组这一项的值，index就是遍历这一项的索引</span>
    <span class="hljs-keyword">return</span> xxx; <span class="hljs-comment">//=&gt;RETURN后面返回的结果就是把当前遍历的这一项修改为xxx</span>
});

filter
find
reduce
every
...
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【JavaScript入门】Array类型

## 原文链接
[https://segmentfault.com/a/1190000014020767](https://segmentfault.com/a/1190000014020767)


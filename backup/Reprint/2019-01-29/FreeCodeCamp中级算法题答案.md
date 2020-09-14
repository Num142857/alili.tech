---
title: 'FreeCodeCamp中级算法题答案' 
date: 2019-01-29 2:30:10
hidden: true
slug: 5dbaikv4emi
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">Diff Two Arrays</h3>
<blockquote><p>比较两个数组，然后返回一个新数组，该数组的元素为两个给定数组中所有独有的数组元素。换言之，返回两个数组的差异。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function diff(arr1, arr2) {
   var a1=arr1.filter(function(val){
        return arr2.indexOf(val)< 0;
   });
   var a2=arr2.filter(function(val){
       return arr1.indexOf(val)< 0;
   });
   return a1.concat(a2);
}

diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diff</span><span class="hljs-params">(arr1, arr2)</span> </span>{
   <span class="hljs-keyword">var</span> a1=arr1.filter(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(val)</span></span>{
        <span class="hljs-keyword">return</span> arr2.indexOf(val)&lt; <span class="hljs-number">0</span>;
   });
   <span class="hljs-keyword">var</span> a2=arr2.filter(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(val)</span></span>{
       <span class="hljs-keyword">return</span> arr1.indexOf(val)&lt; <span class="hljs-number">0</span>;
   });
   <span class="hljs-keyword">return</span> a1.concat(a2);
}

diff([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]);</code></pre>
<h3 id="articleHeader1">Roman Numeral Converter</h3>
<blockquote><p>将给定的数字转换成罗马数字。<br>所有返回的 罗马数字 都应该是大写形式。<br>可参考<a href="http://www.mathsisfun.com/roman-numerals.html" rel="nofollow noreferrer" target="_blank">Here</a></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function convert(num) {
  var nums = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  var romans =[&quot;m&quot;,&quot;cm&quot;,&quot;d&quot;,&quot;cd&quot;,&quot;c&quot;,&quot;xc&quot;,&quot;l&quot;,&quot;xl&quot;,&quot;x&quot;,&quot;ix&quot;,&quot;v&quot;,&quot;iv&quot;,&quot;i&quot;];
  var str = '';
  nums.forEach(function(item,index,array){
    while(num >= item){
      str += romans[index];
      num -= item;
    }
  });
  
 return str.toUpperCase();
}
convert(36);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function convert(num) {
  var nums = [<span class="hljs-number">1000</span>,<span class="hljs-number">900</span>,<span class="hljs-number">500</span>,<span class="hljs-number">400</span>,<span class="hljs-number">100</span>,<span class="hljs-number">90</span>,<span class="hljs-number">50</span>,<span class="hljs-number">40</span>,<span class="hljs-number">10</span>,<span class="hljs-number">9</span>,<span class="hljs-number">5</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1</span>];
  var romans =[<span class="hljs-string">"m"</span>,<span class="hljs-string">"cm"</span>,<span class="hljs-string">"d"</span>,<span class="hljs-string">"cd"</span>,<span class="hljs-string">"c"</span>,<span class="hljs-string">"xc"</span>,<span class="hljs-string">"l"</span>,<span class="hljs-string">"xl"</span>,<span class="hljs-string">"x"</span>,<span class="hljs-string">"ix"</span>,<span class="hljs-string">"v"</span>,<span class="hljs-string">"iv"</span>,<span class="hljs-string">"i"</span>];
  var str = '';
  nums.forEach(function(item,index,array){
    while(num &gt;= item){
      str += romans[index];
      num -= item;
    }
  });
  
 return str.toUpperCase();
}
convert(<span class="hljs-number">36</span>);</code></pre>
<h3 id="articleHeader2">Where art thou</h3>
<blockquote>
<p>写一个 function，它遍历一个对象数组（第一个参数）并返回一个包含相匹配的属性-值对（第二个参数）的所有对象的数组。如果返回的数组中包含 source 对象的属性-值对，那么此对象的每一个属性-值对都必须存在于 collection 的对象中。</p>
<p>例如，如果第一个参数是 [{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }]，第二个参数是 { last: "Capulet" }，那么你必须从数组（第一个参数）返回其中的第三个对象，因为它包含了作为第二个参数传递的属性-值对。</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//法一
function where(collection, source) {
  var keys =  Object.keys(source);
  return collection.filter(function(obj){
      return keys.every(function(item){
          return obj.hasOwnProperty(item) &amp;&amp; obj[item] === source[item];
      });
  });
}
//法二
function where(collection, source) {
  var keys =  Object.keys(source);
  return collection.filter(function(obj){
      return keys.every(function(item){
          return obj.hasOwnProperty(item) &amp;&amp; obj[item] === source[item];
      });
  });
}

where([{ first: &quot;Romeo&quot;, last: &quot;Montague&quot; }, { first: &quot;Mercutio&quot;, last: null }, { first: &quot;Tybalt&quot;, last: &quot;Capulet&quot; }], { last: &quot;Capulet&quot; });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//法一</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">where</span>(<span class="hljs-params">collection, source</span>) </span>{
  <span class="hljs-keyword">var</span> keys =  <span class="hljs-built_in">Object</span>.keys(source);
  <span class="hljs-keyword">return</span> collection.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
      <span class="hljs-keyword">return</span> keys.every(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
          <span class="hljs-keyword">return</span> obj.hasOwnProperty(item) &amp;&amp; obj[item] === source[item];
      });
  });
}
<span class="hljs-comment">//法二</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">where</span>(<span class="hljs-params">collection, source</span>) </span>{
  <span class="hljs-keyword">var</span> keys =  <span class="hljs-built_in">Object</span>.keys(source);
  <span class="hljs-keyword">return</span> collection.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
      <span class="hljs-keyword">return</span> keys.every(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
          <span class="hljs-keyword">return</span> obj.hasOwnProperty(item) &amp;&amp; obj[item] === source[item];
      });
  });
}

where([{ <span class="hljs-attr">first</span>: <span class="hljs-string">"Romeo"</span>, <span class="hljs-attr">last</span>: <span class="hljs-string">"Montague"</span> }, { <span class="hljs-attr">first</span>: <span class="hljs-string">"Mercutio"</span>, <span class="hljs-attr">last</span>: <span class="hljs-literal">null</span> }, { <span class="hljs-attr">first</span>: <span class="hljs-string">"Tybalt"</span>, <span class="hljs-attr">last</span>: <span class="hljs-string">"Capulet"</span> }], { <span class="hljs-attr">last</span>: <span class="hljs-string">"Capulet"</span> });
</code></pre>
<h3 id="articleHeader3">Search and Replace</h3>
<blockquote><p>使用给定的参数对句子执行一次查找和替换，然后返回新句子。第一个参数是将要对其执行查找和替换的句子。第二个参数是将被替换掉的单词（替换前的单词）。第三个参数用于替换第二个参数（替换后的单词）。<br>注意：替换时保持原单词的大小写。例如，如果你想用单词 "dog" 替换单词 "Book" ，你应该替换成 "Dog"。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//法一
function myReplace(str, before, after) {
    if(before[0] === before[0].toUpperCase()){
        after = after[0].toUpperCase() + after.slice(1);
    }
    str = str.replace(before,after);
    return str;
}


//法二
function myReplace(str, before, after) {
  var re = /^[A-Z]/;
  if(re.test(before.charAt(0))){
    after = after.charAt(0).toUpperCase() + after.slice(1);
  }
  str = str.replace(before,after);
  return str;
}
myReplace(&quot;A quick brown fox jumped over the lazy dog&quot;, &quot;jumped&quot;, &quot;leaped&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>
//法一
function myReplace(str, <span class="hljs-built_in">before</span>, <span class="hljs-built_in">after</span>) {
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">before</span>[<span class="hljs-number">0</span>] === <span class="hljs-built_in">before</span>[<span class="hljs-number">0</span>].toUpperCase()){
        <span class="hljs-built_in">after</span> = <span class="hljs-built_in">after</span>[<span class="hljs-number">0</span>].toUpperCase() + <span class="hljs-built_in">after</span>.slice(<span class="hljs-number">1</span>);
    }
    str = str.<span class="hljs-built_in">replace</span>(<span class="hljs-built_in">before</span>,<span class="hljs-built_in">after</span>);
    <span class="hljs-keyword">return</span> str;
}


//法二
function myReplace(str, <span class="hljs-built_in">before</span>, <span class="hljs-built_in">after</span>) {
  var re = /^[A-Z]/;
  <span class="hljs-keyword">if</span>(re.test(<span class="hljs-built_in">before</span>.charAt(<span class="hljs-number">0</span>))){
    <span class="hljs-built_in">after</span> = <span class="hljs-built_in">after</span>.charAt(<span class="hljs-number">0</span>).toUpperCase() + <span class="hljs-built_in">after</span>.slice(<span class="hljs-number">1</span>);
  }
  str = str.<span class="hljs-built_in">replace</span>(<span class="hljs-built_in">before</span>,<span class="hljs-built_in">after</span>);
  <span class="hljs-keyword">return</span> str;
}
myReplace(<span class="hljs-string">"A quick brown fox jumped over the lazy dog"</span>, <span class="hljs-string">"jumped"</span>, <span class="hljs-string">"leaped"</span>);</code></pre>
<h3 id="articleHeader4">Pig Latin</h3>
<blockquote><p>把指定的字符串翻译成 <a href="http://en.wikipedia.org/wiki/Pig_Latin" rel="nofollow noreferrer" target="_blank">pig latin</a>。<br>Pig Latin 把一个英文单词的第一个辅音或辅音丛（consonant cluster）移到词尾，然后加上后缀 "ay"。<br>如果单词以元音开始，你只需要在词尾添加 "way" 就可以了。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function translate(str) {
    var myStr = '';
    var regex = /[aeiou]/gi;
    if(str[0].match(regex)){
        myStr = str + 'way';
    }else{
        var index = str.indexOf(str.match(regex)[0]);
        myStr = str.substr(index) + str.substring(0,index) + 'ay';
    }
  return myStr;
}

translate(&quot;consonant&quot;);//onsonantcay
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>function <span class="hljs-built_in">translate</span>(<span class="hljs-built_in">str</span>) {
    var myStr = <span class="hljs-string">''</span>;
    var regex = /[aeiou]/gi;
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">str</span>[<span class="hljs-number">0</span>].<span class="hljs-built_in">match</span>(regex)){
        myStr = <span class="hljs-built_in">str</span> + <span class="hljs-string">'way'</span>;
    }<span class="hljs-keyword">else</span>{
        var index = <span class="hljs-built_in">str</span>.indexOf(<span class="hljs-built_in">str</span>.<span class="hljs-built_in">match</span>(regex)[<span class="hljs-number">0</span>]);
        myStr = <span class="hljs-built_in">str</span>.substr(index) + <span class="hljs-built_in">str</span>.substring(<span class="hljs-number">0</span>,index) + <span class="hljs-string">'ay'</span>;
    }
  <span class="hljs-keyword">return</span> myStr;
}

<span class="hljs-built_in">translate</span>(<span class="hljs-string">"consonant"</span>);<span class="hljs-comment">//onsonantcay</span>
</code></pre>
<h3 id="articleHeader5">DNA Pairing</h3>
<blockquote><p>DNA 链缺少配对的碱基。依据每一个碱基，为其找到配对的碱基，然后将结果作为第二个数组返回。<br><a>Base pairs（碱基对）</a> 是一对 AT 和 CG，为给定的字母匹配缺失的碱基。<br>在每一个数组中将给定的字母作为第一个碱基返回。<br>例如，对于输入的 GCG，相应地返回 [["G", "C"], ["C","G"],["G", "C"]]<br>字母和与之配对的字母在一个数组内，然后所有数组再被组织起来封装进一个数组。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function pair(str) {
  var arr = str.split('');
  var pair = '';
  return arr.map(function(item){
      switch(item){
          case 'C':
              pair = 'G';
            break;
          case 'G':
              pair = 'C';
            break;
        case 'A':
            pair = 'T';
            break;
        case 'T':
            pair = 'A';
             break;
      }
      return [item,pair];
  });
}

pair(&quot;GCG&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pair</span><span class="hljs-params">(str)</span> </span>{
  <span class="hljs-keyword">var</span> arr = str.split(<span class="hljs-string">''</span>);
  <span class="hljs-keyword">var</span> pair = <span class="hljs-string">''</span>;
  <span class="hljs-keyword">return</span> arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span></span>{
      <span class="hljs-keyword">switch</span>(item){
          <span class="hljs-keyword">case</span> <span class="hljs-string">'C'</span>:
              pair = <span class="hljs-string">'G'</span>;
            <span class="hljs-keyword">break</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">'G'</span>:
              pair = <span class="hljs-string">'C'</span>;
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'A'</span>:
            pair = <span class="hljs-string">'T'</span>;
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'T'</span>:
            pair = <span class="hljs-string">'A'</span>;
             <span class="hljs-keyword">break</span>;
      }
      <span class="hljs-keyword">return</span> [item,pair];
  });
}

pair(<span class="hljs-string">"GCG"</span>);
</code></pre>
<h3 id="articleHeader6">Missing letters</h3>
<blockquote><p>从传递进来的字母序列中找到缺失的字母并返回它。<br>如果所有字母都在序列中，返回 undefined。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="法一：
    var arr = str.split('');
    for(var i = 0;i < arr.length;i++){
        var minus = arr[i+1].charCodeAt() - arr[i].charCodeAt();/后项减去前项/
        if( minus > 1){
            return String.fromCharCode(arr[i].charCodeAt()+1);
        }
    }
法二:
function fearNotLetter(str) {
    var compare = str.charCodeAt(0),missing;
    str.split('').map(function(item,index){
        if(str.charCodeAt(index) === compare){
            ++ compare;
        }else{
            missing = String.fromCharCode(compare);
        }
    });
    return missing;
}
fearNotLetter(&quot;abce&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>法一：
    <span class="hljs-keyword">var</span> arr = str.split(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; arr.length;i++){
        <span class="hljs-keyword">var</span> minus = arr[i+<span class="hljs-number">1</span>].charCodeAt() - arr[i].charCodeAt();<span class="hljs-regexp">/后项减去前项/</span>
        <span class="hljs-keyword">if</span>( minus &gt; <span class="hljs-number">1</span>){
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span>.fromCharCode(arr[i].charCodeAt()+<span class="hljs-number">1</span>);
        }
    }
法二:
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fearNotLetter</span>(<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">var</span> compare = str.charCodeAt(<span class="hljs-number">0</span>),missing;
    str.split(<span class="hljs-string">''</span>).map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item,index</span>)</span>{
        <span class="hljs-keyword">if</span>(str.charCodeAt(index) === compare){
            ++ compare;
        }<span class="hljs-keyword">else</span>{
            missing = <span class="hljs-built_in">String</span>.fromCharCode(compare);
        }
    });
    <span class="hljs-keyword">return</span> missing;
}
fearNotLetter(<span class="hljs-string">"abce"</span>);</code></pre>
<h3 id="articleHeader7">Boo who</h3>
<blockquote><p>检查一个值是否是基本布尔类型，并返回 true 或 false。<br>基本布尔类型即 true 和 false。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function boo(bool) {
 return typeof bool === 'boolean';
}

boo(true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">boo</span>(<span class="hljs-params">bool</span>) </span>{
 <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">bool</span> === <span class="hljs-string">'boolean'</span>;
}

boo(<span class="hljs-literal">true</span>);</code></pre>
<h3 id="articleHeader8">Sorted Union</h3>
<blockquote><p>写一个 function，传入两个或两个以上的数组，返回一个以给定的原始数组排序的不包含重复值的新数组。<br>例如：unite([1, 3, 2], [5, 2, 1, 4], [2, 1]) 应该返回 [1, 3, 2, 5, 4]。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unite(arr1, arr2, arr3) {
  var args = Array.from(arguments);
  var arr = args.reduce(function(prev,cur){
    return prev.concat(cur);
  });
  return arr.filter(function(item,index,arr){
    return arr.indexOf(item) === index;  
  });
}
unite([1, 3, 2], [5, 2, 1, 4], [2, 1]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unite</span>(<span class="hljs-params">arr1, arr2, arr3</span>) </span>{
  <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">arguments</span>);
  <span class="hljs-keyword">var</span> arr = args.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev,cur</span>)</span>{
    <span class="hljs-keyword">return</span> prev.concat(cur);
  });
  <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item,index,arr</span>)</span>{
    <span class="hljs-keyword">return</span> arr.indexOf(item) === index;  
  });
}
unite([<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">1</span>]);
</code></pre>
<h3 id="articleHeader9">Convert HTML Entities</h3>
<blockquote><p>将字符串中的字符 &amp;、&lt;、&gt;、" （双引号）, 以及 ' （单引号）转换为它们对应的 HTML 实体。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="法一
function convert(str) {
  str = str.replace(/&amp;/g,&quot;&amp;amp;&quot;).replace(/</g,&quot;&amp;lt;&quot;).replace(/>/g,&quot;&amp;gt;&quot;)
           .replace(/&quot;/g,&quot;&amp;quot;&quot;).replace(/'/g,&quot;&amp;apos;&quot;);
  return str;
}
convert(&quot;Dolce &amp; Gabbana&quot;);
法二：
function convert(str) {
    var htmlEntities={
        '&amp;':'&amp;amp;',
        '<':'&amp;lt;',
        '>':'&amp;gt;',
        '\&quot;':'&amp;quot;',
        '\'':'&amp;apos;',
    };
    return str.split('').map(function(entity){
        return htmlEntities[entity] || entity;
    }).join('');
}
convert(&quot;Dolce &amp; Gabbana&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>法一
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">convert</span>(<span class="hljs-params">str</span>) </span>{
  str = str.replace(<span class="hljs-regexp">/&amp;/g</span>,<span class="hljs-string">"&amp;amp;"</span>).replace(<span class="hljs-regexp">/&lt;/g</span>,<span class="hljs-string">"&amp;lt;"</span>).replace(<span class="hljs-regexp">/&gt;/g</span>,<span class="hljs-string">"&amp;gt;"</span>)
           .replace(<span class="hljs-regexp">/"/g</span>,<span class="hljs-string">"&amp;quot;"</span>).replace(<span class="hljs-regexp">/'/g</span>,<span class="hljs-string">"&amp;apos;"</span>);
  <span class="hljs-keyword">return</span> str;
}
convert(<span class="hljs-string">"Dolce &amp; Gabbana"</span>);
法二：
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">convert</span>(<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">var</span> htmlEntities={
        <span class="hljs-string">'&amp;'</span>:<span class="hljs-string">'&amp;amp;'</span>,
        <span class="hljs-string">'&lt;'</span>:<span class="hljs-string">'&amp;lt;'</span>,
        <span class="hljs-string">'&gt;'</span>:<span class="hljs-string">'&amp;gt;'</span>,
        <span class="hljs-string">'\"'</span>:<span class="hljs-string">'&amp;quot;'</span>,
        <span class="hljs-string">'\''</span>:<span class="hljs-string">'&amp;apos;'</span>,
    };
    <span class="hljs-keyword">return</span> str.split(<span class="hljs-string">''</span>).map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">entity</span>)</span>{
        <span class="hljs-keyword">return</span> htmlEntities[entity] || entity;
    }).join(<span class="hljs-string">''</span>);
}
convert(<span class="hljs-string">"Dolce &amp; Gabbana"</span>);
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
FreeCodeCamp中级算法题答案

## 原文链接
[https://segmentfault.com/a/1190000007958374](https://segmentfault.com/a/1190000007958374)


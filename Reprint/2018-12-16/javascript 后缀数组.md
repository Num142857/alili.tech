---
title: 'javascript 后缀数组' 
date: 2018-12-16 2:30:10
hidden: true
slug: qc6es9sosmm
categories: [reprint]
---

{{< raw >}}

                    
<p>后缀数组是处理字符串的利器, 它本身涉及许多辅助概念.</p>
<h2 id="articleHeader0">基本概念</h2>
<h3 id="articleHeader1">1.1子串</h3>
<p>表示字符串的某一小段, 如awbcdewg拥有 awbc， awbcd， awbcde等子串。</p>
<h3 id="articleHeader2">1.2后缀</h3>
<p>后缀是字符串从某个位置起到达末尾的一种特殊子串。后缀可以等于自身，相等于从一个字符开始. 假令我们设计一个取后缀的函数, 它可以这样实现:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function suffix(str, i ){
    if(i >= 0 || i <= str.length-1){
       return str.slice(i)
    }
    throw &quot;i越界了&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">suffix</span><span class="hljs-params">(str, i )</span></span>{
    <span class="hljs-keyword">if</span>(i &gt;= <span class="hljs-number">0</span> || i &lt;= str.length<span class="hljs-number">-1</span>){
       <span class="hljs-keyword">return</span> str.slice(i)
    }
    <span class="hljs-keyword">throw</span> <span class="hljs-string">"i越界了"</span>
}</code></pre>
<p>后缀必须包含最后一个字符.</p>
<p>字符串rubylouvre，它的后缀就包含rubylouvre、ubylouvre、bylouvre、 ylouvre、louvre、ouvre，uvre、vre、 re、 e 它们都必须包含最后一个字符e。</p>
<h3 id="articleHeader3">1.3 字典排序</h3>
<p>字符串默认的比较算法, "aa" &lt; "ab" 返回true而不是返回false就是依靠这个标准进行. </p>
<p>首先从左到右, 各自取得第一个字符, "a"与"a", 如果相同, 则比较各自的第二个字符. 否则, 比较其charCode值.  如i 和 b比, i的charCode为105, b的charCode为98, b肯定比i小, 那么不用再比较.</p>
<p>如果其中之一是另一个的前缀，则短的那个排前面：aaa &lt; aaab</p>
<h3 id="articleHeader4">1.4后缀数组</h3>
<p>后端数组就是某个字符串的所有后缀按照字典顺序进行排序后得到的位置数组. 如字符串ADCEFD, 当i从0到5递增时,我们通过上面的suffix函数得到其所有 后缀.</p>
<table>
<thead><tr>
<th align="center">index</th>
<th>A</th>
<th>D</th>
<th>C</th>
<th>E</th>
<th>F</th>
<th>D</th>
</tr></thead>
<tbody>
<tr>
<td align="center">0</td>
<td>A</td>
<td>D</td>
<td>C</td>
<td>E</td>
<td>F</td>
<td>D</td>
</tr>
<tr>
<td align="center">1</td>
<td>&nbsp;</td>
<td>D</td>
<td>C</td>
<td>E</td>
<td>F</td>
<td>D</td>
</tr>
<tr>
<td align="center">2</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>C</td>
<td>E</td>
<td>F</td>
<td>D</td>
</tr>
<tr>
<td align="center">3</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>E</td>
<td>F</td>
<td>D</td>
</tr>
<tr>
<td align="center">4</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>F</td>
<td>D</td>
</tr>
<tr>
<td align="center">5</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>D</td>
</tr>
</tbody>
</table>
<p>按字典排序后</p>
<table>
<thead><tr>
<th align="center">index</th>
<th>A</th>
<th>D</th>
<th>C</th>
<th>E</th>
<th>F</th>
<th>D</th>
</tr></thead>
<tbody>
<tr>
<td align="center">0</td>
<td>A</td>
<td>D</td>
<td>C</td>
<td>E</td>
<td>F</td>
<td>D</td>
</tr>
<tr>
<td align="center">2</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>C</td>
<td>E</td>
<td>F</td>
<td>D</td>
</tr>
<tr>
<td align="center">5</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>D</td>
</tr>
<tr>
<td align="center">1</td>
<td>&nbsp;</td>
<td>D</td>
<td>C</td>
<td>E</td>
<td>F</td>
<td>D</td>
</tr>
<tr>
<td align="center">3</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>E</td>
<td>F</td>
<td>D</td>
</tr>
<tr>
<td align="center">4</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>F</td>
<td>D</td>
</tr>
</tbody>
</table>
<p>这个[0,2,5,1,3,4]就是字符串的后缀数组.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// by 司徒正美
var str = &quot;ADCEFD&quot;, arr = []
function spawnSuffix(str, arr){
     if(str){
        arr.push(str)
        spawnSuffix(str.slice(1), arr)
     }
 }
spawnSuffix(str, arr)
console.log(arr)
//[&quot;ADCEFD&quot;, &quot;DCEFD&quot;, &quot;CEFD&quot;, &quot;EFD&quot;, &quot;FD&quot;, &quot;D&quot;]
// 对abadefg的所有后缀子串数组进行加工
var sa = arr.map(function(str, i){
  return {el: str, index: i}
}).sort(function(a, b){
 return a.el > b.el
}).map(function(obj){
 return obj.index  //可以加1，也可以不加，看你的习惯
})
console.log(sa)// [0, 2, 5, 1, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>// by 司徒正美
var str = <span class="hljs-string">"ADCEFD"</span>, arr = []
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">spawnSuffix</span><span class="hljs-params">(str, arr)</span>{</span>
     <span class="hljs-keyword">if</span>(str){
        arr.push(str)
        spawnSuffix(str.slice(<span class="hljs-number">1</span>), arr)
     }
 }
spawnSuffix(str, arr)
console.<span class="hljs-built_in">log</span>(arr)
//[<span class="hljs-string">"ADCEFD"</span>, <span class="hljs-string">"DCEFD"</span>, <span class="hljs-string">"CEFD"</span>, <span class="hljs-string">"EFD"</span>, <span class="hljs-string">"FD"</span>, <span class="hljs-string">"D"</span>]
// 对abadefg的所有后缀子串数组进行加工
var <span class="hljs-keyword">sa</span> = arr.<span class="hljs-keyword">map</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(str, i)</span>{</span>
  <span class="hljs-keyword">return</span> {<span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> str, <span class="hljs-built_in">index</span>: i}
}).<span class="hljs-keyword">sort</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a, b)</span>{</span>
 <span class="hljs-keyword">return</span> <span class="hljs-keyword">a</span>.<span class="hljs-keyword">el</span> &gt; <span class="hljs-keyword">b</span>.<span class="hljs-keyword">el</span>
}).<span class="hljs-keyword">map</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span>{</span>
 <span class="hljs-keyword">return</span> obj.<span class="hljs-built_in">index</span>  //可以加<span class="hljs-number">1</span>，也可以不加，看你的习惯
})
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">sa</span>)// [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]</code></pre>
<h2 id="articleHeader5">倍增算法</h2>
<p>上面我们通过非常朴素的方式,逐个取得它的所有后缀,然后通过语言本身的sort方法进行字典排序.这个sort在不同的宿主环境中,内部采取的排序算法都不一样,就是一个黑箱.</p>
<p>整个过程大家可以参考罗穗骞的论文，但由于语言的差异，我看不  懂他在写什么，直接对着它的那张图搞出来了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012999757?w=576&amp;h=500" src="https://static.alili.tech/img/remote/1460000012999757?w=576&amp;h=500" alt="image_1c4je3cp5elqktssnf6h914pt9.png-77.4kB" title="image_1c4je3cp5elqktssnf6h914pt9.png-77.4kB" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// by 司徒正美
function getSuffix(str) {
    var len = str.length, 
        max = str.charCodeAt(0), 
        min = max,
        xbuckets = [],
        sa = [],
        rank = [];
    // 将用户传入的字符串全部转换为charCode值，并求出最大最小值
    for (let i = 0; i < len; i++) {
        let c = str.charCodeAt(i);
        rank[i] = c;
        max = Math.max(max, c);
        min = Math.min(min, c);
    }
    //我们要对rank进行计数排序，但是它们太大，都是90－128左右，
    // 这样我们要创建上百个桶
    //我们通过减去最小值，来缩小规模, 现在只需2－10个桶就够了。

    //这些新得到的数字其实在原论文中构成一个叫 x 的数组
    //但是我们并没有这样用，而是让它作为rank对象数组的一个属性
    rank.forEach(function(el, i){
        rank[i] = {x: el - min + 1 };
    });
  
    var hasDuplicate = true, k = 0;
    while(hasDuplicate){
        //重置数据
        hasDuplicate = false;
        xbuckets.length = 0;
        //k倍增，隔空拼凑y数组
        //y作为基数排序的第二个关键字
        var d = 1 << k; k ++;
        rank.forEach(function(el, i){
            el.y = rank[i+ d] ? rank[i+ d].x: 0;
        });
        //根据关键字x，进行基数排序
        rank.forEach(function(el){
            var index = el.x;
            if(!xbuckets[index]){
                xbuckets[index] = [el];
            }else{
                xbuckets[index].push(el);
            }
        });
        //对每个桶内xbucket根据y进行排序
        var newIndex = 1, last = {};
        xbuckets.forEach(function(bucket){
            if(bucket){
                let cache = {};
                bucket.sort(function(a, b){
                    return a.y - b.y;
                }).forEach(function(el ){
                    //重写x
                    if(el.y !== last.y){
                        el.x = newIndex++;
                        cache[el.y] = el.x;
                    }else{
                        hasDuplicate = true;
                        el.x = cache[el.y];
                    }
                    last = el;
                });
            }
        });
    }
    //rank是从1开始的，因此这里面要减1
    rank = rank.map(function(el, i ){
        sa[el.x - 1] = i;
        return el.x;
    });
    console.log(&quot;rank数组&quot;, rank);
    console.log(&quot;后缀数组&quot;, sa);
    return sa;
}

var ret = getSuffix(&quot;aabaaaab&quot;); 
//ret:  3, 4, 5, 0, 6, 1, 7, 2 
/*" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-comment">// by 司徒正美</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSuffix</span><span class="hljs-params">(str)</span> {</span>
    var len = <span class="hljs-built_in">str</span>.length, 
        <span class="hljs-built_in">max</span> = <span class="hljs-built_in">str</span>.charCodeAt(<span class="hljs-number">0</span>), 
        <span class="hljs-built_in">min</span> = <span class="hljs-built_in">max</span>,
        xbuckets = [],
        sa = [],
        rank = [];
    <span class="hljs-comment">// 将用户传入的字符串全部转换为charCode值，并求出最大最小值</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">let</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
        <span class="hljs-built_in">let</span> c = <span class="hljs-built_in">str</span>.charCodeAt(i);
        rank[i] = c;
        <span class="hljs-built_in">max</span> = Math.<span class="hljs-built_in">max</span>(<span class="hljs-built_in">max</span>, c);
        <span class="hljs-built_in">min</span> = Math.<span class="hljs-built_in">min</span>(<span class="hljs-built_in">min</span>, c);
    }
    <span class="hljs-comment">//我们要对rank进行计数排序，但是它们太大，都是90－128左右，</span>
    <span class="hljs-comment">// 这样我们要创建上百个桶</span>
    <span class="hljs-comment">//我们通过减去最小值，来缩小规模, 现在只需2－10个桶就够了。</span>

    <span class="hljs-comment">//这些新得到的数字其实在原论文中构成一个叫 x 的数组</span>
    <span class="hljs-comment">//但是我们并没有这样用，而是让它作为rank对象数组的一个属性</span>
    rank.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el, i)</span>{</span>
        rank[i] = {x: el - <span class="hljs-built_in">min</span> + <span class="hljs-number">1</span> };
    });
  
    var hasDuplicate = <span class="hljs-literal">true</span>, k = <span class="hljs-number">0</span>;
    while(hasDuplicate){
        <span class="hljs-comment">//重置数据</span>
        hasDuplicate = <span class="hljs-literal">false</span>;
        xbuckets.length = <span class="hljs-number">0</span>;
        <span class="hljs-comment">//k倍增，隔空拼凑y数组</span>
        <span class="hljs-comment">//y作为基数排序的第二个关键字</span>
        var d = <span class="hljs-number">1</span> &lt;&lt; k; k ++;
        rank.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el, i)</span>{</span>
            el.y = rank[i+ d] ? rank[i+ d].x: <span class="hljs-number">0</span>;
        });
        <span class="hljs-comment">//根据关键字x，进行基数排序</span>
        rank.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el)</span>{</span>
            var index = el.x;
            <span class="hljs-keyword">if</span>(!xbuckets[index]){
                xbuckets[index] = [el];
            }<span class="hljs-keyword">else</span>{
                xbuckets[index].push(el);
            }
        });
        <span class="hljs-comment">//对每个桶内xbucket根据y进行排序</span>
        var newIndex = <span class="hljs-number">1</span>, last = {};
        xbuckets.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(bucket)</span>{</span>
            <span class="hljs-keyword">if</span>(bucket){
                <span class="hljs-built_in">let</span> cache = {};
                bucket.sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a, b)</span>{</span>
                    return a.y - b.y;
                }).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el )</span>{</span>
                    <span class="hljs-comment">//重写x</span>
                    <span class="hljs-keyword">if</span>(el.y !== last.y){
                        el.x = newIndex++;
                        cache[el.y] = el.x;
                    }<span class="hljs-keyword">else</span>{
                        hasDuplicate = <span class="hljs-literal">true</span>;
                        el.x = cache[el.y];
                    }
                    last = el;
                });
            }
        });
    }
    <span class="hljs-comment">//rank是从1开始的，因此这里面要减1</span>
    rank = rank.map(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el, i )</span>{</span>
        sa[el.x - <span class="hljs-number">1</span>] = i;
        return el.x;
    });
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"rank数组"</span>, rank);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"后缀数组"</span>, sa);
    return sa;
}

var ret = getSuffix(<span class="hljs-string">"aabaaaab"</span>); 
<span class="hljs-comment">//ret:  3, 4, 5, 0, 6, 1, 7, 2 </span>
<span class="hljs-comment">/*</span></code></pre>
<p>但这依赖于原生的sort, 我们可以将sort改成计数排序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// by 司徒正美
function getSuffix(str) {
    var len = str.length, 
        max = str.charCodeAt(0), 
        min = max,
        xbuckets = [],
        sa = [],
        rank = [];
    // 字符串转charCode
    for (let i = 0; i < len; i++) {
        let c = str.charCodeAt(i);
        rank[i] = c;
        max = Math.max(max, c);
        min = Math.min(min, c);
    }
    //压缩charCode值
    rank.forEach(function(el, i){
        rank[i] = {x: el - min + 1 };
    });
    var hasDuplicate = true, k = 0;
    while(hasDuplicate){
        //重置数据
        hasDuplicate = false;
        xbuckets.length = 0;
        //倍增，目的是求关键字y
        var d = 1 << k; k ++;

        rank.forEach(function(el, i){
            //根据关键字x，进行基数排序，并同时计算关键字y
            el.y = rank[i+ d] ? rank[i+ d].x: 0;
           
            var index = el.x;
            if(!xbuckets[index]){
                xbuckets[index] = [el];
            }else{
                xbuckets[index].push(el);
            }
        });

        var newIndex = 1, last = {};
        xbuckets.forEach(function(bucket){
            if(bucket){
                //使用计数排序对每个桶再进行排序
                var cache = {};
                var yxbuckets = [];
                bucket.forEach(function(el){
                    var index = el.y;
                    if(!yxbuckets[index]){
                        yxbuckets[index] = [el];
                    }else{
                        yxbuckets[index].push(el);
                    }
                });
                var j = 0;
                yxbuckets.forEach(function(ybucket){
                    if(ybucket){
                        ybucket.forEach(function(el){
                            if(el.y !== last.y){
                                el.x = newIndex++;
                                cache[el.y] = el.x;
                            }else{
                                hasDuplicate = true;
                                el.x = cache[el.y];
                            }
                            bucket[j++] = el; //这里可以不要
                            last = el;
                        });
                    }
                });
            }
        });
     
    }
    //rank是从1开始的，因此这里面要减1
    rank = rank.map(function(el, i ){
        sa[el.x - 1] = i;
        return el.x;
    });
    console.log(&quot;rank数组&quot;, rank);
    console.log(&quot;后缀数组&quot;, sa);
    return sa;
}
var a = getSuffix(&quot;aabaaaab&quot;); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-comment">// by 司徒正美</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSuffix</span><span class="hljs-params">(str)</span> </span>{
    <span class="hljs-keyword">var</span> len = str.length, 
        max = str.charCodeAt(<span class="hljs-number">0</span>), 
        min = max,
        xbuckets = [],
        sa = [],
        rank = [];
    <span class="hljs-comment">// 字符串转charCode</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
        <span class="hljs-keyword">let</span> c = str.charCodeAt(i);
        rank[i] = c;
        max = Math.max(max, c);
        min = Math.min(min, c);
    }
    <span class="hljs-comment">//压缩charCode值</span>
    rank.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el, i)</span></span>{
        rank[i] = {x: el - min + <span class="hljs-number">1</span> };
    });
    <span class="hljs-keyword">var</span> hasDuplicate = <span class="hljs-keyword">true</span>, k = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">while</span>(hasDuplicate){
        <span class="hljs-comment">//重置数据</span>
        hasDuplicate = <span class="hljs-keyword">false</span>;
        xbuckets.length = <span class="hljs-number">0</span>;
        <span class="hljs-comment">//倍增，目的是求关键字y</span>
        <span class="hljs-keyword">var</span> d = <span class="hljs-number">1</span> &lt;&lt; k; k ++;

        rank.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el, i)</span></span>{
            <span class="hljs-comment">//根据关键字x，进行基数排序，并同时计算关键字y</span>
            el.y = rank[i+ d] ? rank[i+ d].x: <span class="hljs-number">0</span>;
           
            <span class="hljs-keyword">var</span> index = el.x;
            <span class="hljs-keyword">if</span>(!xbuckets[index]){
                xbuckets[index] = [el];
            }<span class="hljs-keyword">else</span>{
                xbuckets[index].push(el);
            }
        });

        <span class="hljs-keyword">var</span> newIndex = <span class="hljs-number">1</span>, last = {};
        xbuckets.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(bucket)</span></span>{
            <span class="hljs-keyword">if</span>(bucket){
                <span class="hljs-comment">//使用计数排序对每个桶再进行排序</span>
                <span class="hljs-keyword">var</span> cache = {};
                <span class="hljs-keyword">var</span> yxbuckets = [];
                bucket.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el)</span></span>{
                    <span class="hljs-keyword">var</span> index = el.y;
                    <span class="hljs-keyword">if</span>(!yxbuckets[index]){
                        yxbuckets[index] = [el];
                    }<span class="hljs-keyword">else</span>{
                        yxbuckets[index].push(el);
                    }
                });
                <span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>;
                yxbuckets.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(ybucket)</span></span>{
                    <span class="hljs-keyword">if</span>(ybucket){
                        ybucket.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el)</span></span>{
                            <span class="hljs-keyword">if</span>(el.y !== last.y){
                                el.x = newIndex++;
                                cache[el.y] = el.x;
                            }<span class="hljs-keyword">else</span>{
                                hasDuplicate = <span class="hljs-keyword">true</span>;
                                el.x = cache[el.y];
                            }
                            bucket[j++] = el; <span class="hljs-comment">//这里可以不要</span>
                            last = el;
                        });
                    }
                });
            }
        });
     
    }
    <span class="hljs-comment">//rank是从1开始的，因此这里面要减1</span>
    rank = rank.map(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el, i )</span></span>{
        sa[el.x - <span class="hljs-number">1</span>] = i;
        <span class="hljs-keyword">return</span> el.x;
    });
    console.log(<span class="hljs-string">"rank数组"</span>, rank);
    console.log(<span class="hljs-string">"后缀数组"</span>, sa);
    <span class="hljs-keyword">return</span> sa;
}
<span class="hljs-keyword">var</span> a = getSuffix(<span class="hljs-string">"aabaaaab"</span>); </code></pre>
<h2 id="articleHeader6">height数组</h2>
<p>那么如何计算height？我们定义h[i]=height[rank[i]]，也就是Suffix[i]和它前一名的最长公共前缀，那么很明显有h[i]&gt;=h[i-1]-1。因为h[i-1]是Suffix[i-1]和它前一名的最长公共前缀，设为Suffix[k]，那么Suffix[i]和Suffix[k+1] 的最长公共前缀为h[i-1]-1，所以h[i]至少是h[i-1]-1。所以我们可以按照求h[1],h[2],h[3] 顺序计算所有的height。代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by司徒正美
function getHeight(str, sa){
    var n = str.length, k = 0, rank = [], height = []
    for(var i = 1;i<=n;i++) {
        rank[sa[i]]=i;
    }
    for(var i=0;i<n;i++){
         if(k) k--;
         var j=sa[rank[i]-1];
         while(i+k < n &amp;&amp; j+k<n &amp;&amp;rank[i+k]==rank[j+k]) {
            k++;
         }
         height[rank[i]]=k;
    }
    return height
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>//by司徒正美
function getHeight(str, sa){
    <span class="hljs-built_in">var</span> n = str.<span class="hljs-built_in">length</span>, k = <span class="hljs-number">0</span>, <span class="hljs-built_in">rank</span> = [], <span class="hljs-built_in">height</span> = []
    <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">1</span>;i&lt;=n;i++) {
        <span class="hljs-built_in">rank</span>[sa[i]]=i;
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>;i&lt;n;i++){
         <span class="hljs-keyword">if</span>(k) k--;
         <span class="hljs-built_in">var</span> j=sa[<span class="hljs-built_in">rank</span>[i]-<span class="hljs-number">1</span>];
         <span class="hljs-keyword">while</span>(i+k &lt; n &amp;&amp; j+k&lt;n &amp;&amp;<span class="hljs-built_in">rank</span>[i+k]==<span class="hljs-built_in">rank</span>[j+k]) {
            k++;
         }
         <span class="hljs-built_in">height</span>[<span class="hljs-built_in">rank</span>[i]]=k;
    }
    <span class="hljs-built_in">return</span> <span class="hljs-built_in">height</span>
}</code></pre>
<h2 id="articleHeader7">DC3算法</h2>
<p>DC3算法(Difference Cover mod 3)是J. Kärkkäinen和P. Sanders在2003年发表的论文 "Simple Linear Work Suffix Array Construction"中描述的线性时间内构造后缀数组的算法。详见下文</p>
<p><a href="http://spencer-carroll.com/the-dc3-algorithm-made-simple/" rel="nofollow noreferrer" target="_blank">http://spencer-carroll.com/th...</a></p>
<p>太难了，略过。 此外还有其他构造算法，如SA-IS：</p>
<p><a href="https://zhuanlan.zhihu.com/p/28331415" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a> </p>
<p>我应该是搞错学习顺序了，应该先学hash树再学trie树再学压缩树再学后缀树再学后缀自动机。即便我头脑这么好使，跨度这么大，还是碰得一脸灰的。</p>
<h2 id="articleHeader8">参考链接</h2>
<ul>
<li><a href="http://blog.csdn.net/sojisub__0173/article/details/50286319" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/sojisub_...</a></li>
<li><a href="http://blog.csdn.net/yxuanwkeith/article/details/50636898" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/yxuanwke...</a></li>
<li>
<a href="https://wenku.baidu.com/view/f3f9a1ba33d4b14e852468dc.html" rel="nofollow noreferrer" target="_blank">https://wenku.baidu.com/view/...</a> (PPT)</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript 后缀数组

## 原文链接
[https://segmentfault.com/a/1190000012999754](https://segmentfault.com/a/1190000012999754)


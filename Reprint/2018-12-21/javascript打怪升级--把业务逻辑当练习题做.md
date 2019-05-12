---
title: 'javascript打怪升级--把业务逻辑当练习题做' 
date: 2018-12-21 2:30:11
hidden: true
slug: 34qe6b8eyh9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>开发项目和出没社区有一段时间了，会遇上一些比较有印象业务需求。这些业务需求，可能是自己开发项目遇上的，可能是在社区看到的业务需求，或者其他情况接触到的需求，但是这些业务需求的实现逻辑都值得一写。因为这些业务逻辑可以当做练习题一样，可以给大家练手。也希望大家从这些需求实现的逻辑里面可以能到javascript的相关知识，当然如果大家觉得代码需要怎样优化，或者有什么建议，更好的实现方案，觉得我哪里写错了，或者有觉得可以分享的需求，可以在评论提下！</p>
<h2 id="articleHeader1">2.月份坐标轴</h2>
<p>这个需求是，看下图就懂了</p>
<p><span class="img-wrap"><img data-src="/img/bVZE5G?w=655&amp;h=72" src="https://static.alili.tech/img/bVZE5G?w=655&amp;h=72" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZE59?w=667&amp;h=87" src="https://static.alili.tech/img/bVZE59?w=667&amp;h=87" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>实现方式其实很简单，我在代码打上注释，大家就懂了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _date=[],dateData=[&quot;1月&quot;,&quot;2月&quot;,&quot;3月&quot;,&quot;4月&quot;,&quot;5月&quot;,&quot;6月&quot;,&quot;7月&quot;,&quot;8月&quot;,&quot;9月&quot;,&quot;10月&quot;,&quot;11月&quot;,&quot;12月&quot;];
//准备一个月份反转的数组
var dateDataRet=Object.assign([],dateData).reverse();
//获取当前年份
var yearText=new Date().getFullYear();
//获取当前月份  调试的时候，大家可以通过调整now调试  3月-now=2,12月now=11...
var now=new Date().getMonth();
for(let i=0;i<6;i++){
    if(now-i<0){
        //如果now-i<0，从dateDataRet里面拿数据，下标=|now-i|-1。
        _date.push(yearText-1+'年'+dateDataRet[Math.abs(now-i)-1]);
    }
    else{
        //从dateData里面拿数据，下标=now-i
        _date.push(yearText+'年'+dateData[now-i]);
    }

}
_date.reverse();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> _date=[],dateData=[<span class="hljs-string">"1月"</span>,<span class="hljs-string">"2月"</span>,<span class="hljs-string">"3月"</span>,<span class="hljs-string">"4月"</span>,<span class="hljs-string">"5月"</span>,<span class="hljs-string">"6月"</span>,<span class="hljs-string">"7月"</span>,<span class="hljs-string">"8月"</span>,<span class="hljs-string">"9月"</span>,<span class="hljs-string">"10月"</span>,<span class="hljs-string">"11月"</span>,<span class="hljs-string">"12月"</span>];
<span class="hljs-comment">//准备一个月份反转的数组</span>
<span class="hljs-keyword">var</span> dateDataRet=<span class="hljs-built_in">Object</span>.assign([],dateData).reverse();
<span class="hljs-comment">//获取当前年份</span>
<span class="hljs-keyword">var</span> yearText=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getFullYear();
<span class="hljs-comment">//获取当前月份  调试的时候，大家可以通过调整now调试  3月-now=2,12月now=11...</span>
<span class="hljs-keyword">var</span> now=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getMonth();
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">6</span>;i++){
    <span class="hljs-keyword">if</span>(now-i&lt;<span class="hljs-number">0</span>){
        <span class="hljs-comment">//如果now-i&lt;0，从dateDataRet里面拿数据，下标=|now-i|-1。</span>
        _date.push(yearText<span class="hljs-number">-1</span>+<span class="hljs-string">'年'</span>+dateDataRet[<span class="hljs-built_in">Math</span>.abs(now-i)<span class="hljs-number">-1</span>]);
    }
    <span class="hljs-keyword">else</span>{
        <span class="hljs-comment">//从dateData里面拿数据，下标=now-i</span>
        _date.push(yearText+<span class="hljs-string">'年'</span>+dateData[now-i]);
    }

}
_date.reverse();</code></pre>
<p>可能大家看着会懵，直接看下面的循环图就懂了</p>
<p><span class="img-wrap"><img data-src="/img/bVZFef?w=597&amp;h=279" src="https://static.alili.tech/img/bVZFef?w=597&amp;h=279" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">3.数值区间</h2>
<p>如下图，就是几个数值区间，而且会有一个最小值和最大值</p>
<p><span class="img-wrap"><img data-src="/img/bVZqVP?w=408&amp;h=114" src="https://static.alili.tech/img/bVZqVP?w=408&amp;h=114" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _min=5,_max=50;
function checkArr(arr,min,max){
    //排序
    arr.sort(function(n1,n2){return n1.min-n2.min})
    //遍历
    for(var i=0;i<arr.length;i++){
        //区间的最小值不能大于等于区间最大值
        if(arr[i].min>=arr[i].max){
            console.log('区间的最小值不能大于等于区间最大值');
            return;
        }
        //区间的最小值不能小于默认最小值
        if(arr[i].min<min){
            console.log('区间的最小值不能小于默认最小值');
            return;
        }
                    
        //区间的最大值不能大于默认最大值
        if(arr[i].max>max){
            console.log('区间的最大值不能大于默认最大值');
            return;
        }
        //元素对比，从第二个元素开始
        if(i>0){
            //minInclude，maxInclude，为false就是不包含，为true就是包含
            //{min:10,max:20,minInclude:false,maxInclude:false}
            //等同于(10,20)
            //{min:20,max:30,minInclude:true,maxInclude:false}
            //等同于[20,30);
            
            //如果前一个的最大值和当前的最小值都是包含情况，那么当前区间的最小值一定要比前一个区间的最大值大1
            if(arr[i].minInclude&amp;&amp;arr[i-1].maxInclude&amp;&amp;arr[i].min-arr[i-1].max!==1){
                console.log('取值范围错误-当前区间的最小值和前一个区间的最大值都是包含情况，当前区间的最小值一定要比前一个区间的最大值大1');
                   return;
                
            }
            //如果前一个的最大值和当前的最小值。一个是包含，一个是不包含，那么当前区间的的最小值一定要等于上一个区间的最大值
            else if(arr[i].minInclude!==arr[i-1].maxInclude&amp;&amp;arr[i].min!==arr[i-1].max){
                console.log('取值范围错误-当前区间的最小值和前一个区间的最大值其中一个是包含，一个是不包含情况，当前区间的最小值一定要等于前一个区间的最大值');
                return;
            }
            //如果前一个的最大值和当前的最小值都是不包含，肯定不满足
            else if((!arr[i].minInclude)&amp;&amp;(!arr[i-1].maxInclude)){
                console.log('取值范围错误-前一个的最大值和当前的最小值都是不包含情况，不满足收尾相连');
                return;
            }
        }
    }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>var _min=<span class="hljs-number">5</span>,_max=<span class="hljs-number">50</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkArr</span><span class="hljs-params">(arr,min,max)</span>{</span>
    <span class="hljs-comment">//排序</span>
    arr.sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(n1,n2)</span>{<span class="hljs-title">return</span> <span class="hljs-title">n1</span>.<span class="hljs-title">min</span>-<span class="hljs-title">n2</span>.<span class="hljs-title">min</span>})</span>
    <span class="hljs-comment">//遍历</span>
    <span class="hljs-keyword">for</span>(var i=<span class="hljs-number">0</span>;i&lt;arr.<span class="hljs-built_in">length</span>;i++){
        <span class="hljs-comment">//区间的最小值不能大于等于区间最大值</span>
        <span class="hljs-keyword">if</span>(arr[i].<span class="hljs-built_in">min</span>&gt;=arr[i].<span class="hljs-built_in">max</span>){
            console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'区间的最小值不能大于等于区间最大值'</span>);
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-comment">//区间的最小值不能小于默认最小值</span>
        <span class="hljs-keyword">if</span>(arr[i].<span class="hljs-built_in">min</span>&lt;<span class="hljs-built_in">min</span>){
            console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'区间的最小值不能小于默认最小值'</span>);
            <span class="hljs-keyword">return</span>;
        }
                    
        <span class="hljs-comment">//区间的最大值不能大于默认最大值</span>
        <span class="hljs-keyword">if</span>(arr[i].<span class="hljs-built_in">max</span>&gt;<span class="hljs-built_in">max</span>){
            console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'区间的最大值不能大于默认最大值'</span>);
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-comment">//元素对比，从第二个元素开始</span>
        <span class="hljs-keyword">if</span>(i&gt;<span class="hljs-number">0</span>){
            <span class="hljs-comment">//minInclude，maxInclude，为false就是不包含，为true就是包含</span>
            <span class="hljs-comment">//{min:10,max:20,minInclude:false,maxInclude:false}</span>
            <span class="hljs-comment">//等同于(10,20)</span>
            <span class="hljs-comment">//{min:20,max:30,minInclude:true,maxInclude:false}</span>
            <span class="hljs-comment">//等同于[20,30);</span>
            
            <span class="hljs-comment">//如果前一个的最大值和当前的最小值都是包含情况，那么当前区间的最小值一定要比前一个区间的最大值大1</span>
            <span class="hljs-keyword">if</span>(arr[i].minInclude&amp;&amp;arr[i<span class="hljs-number">-1</span>].maxInclude&amp;&amp;arr[i].<span class="hljs-built_in">min</span>-arr[i<span class="hljs-number">-1</span>].<span class="hljs-built_in">max</span>!==<span class="hljs-number">1</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'取值范围错误-当前区间的最小值和前一个区间的最大值都是包含情况，当前区间的最小值一定要比前一个区间的最大值大1'</span>);
                   <span class="hljs-keyword">return</span>;
                
            }
            <span class="hljs-comment">//如果前一个的最大值和当前的最小值。一个是包含，一个是不包含，那么当前区间的的最小值一定要等于上一个区间的最大值</span>
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(arr[i].minInclude!==arr[i<span class="hljs-number">-1</span>].maxInclude&amp;&amp;arr[i].<span class="hljs-built_in">min</span>!==arr[i<span class="hljs-number">-1</span>].<span class="hljs-built_in">max</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'取值范围错误-当前区间的最小值和前一个区间的最大值其中一个是包含，一个是不包含情况，当前区间的最小值一定要等于前一个区间的最大值'</span>);
                <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-comment">//如果前一个的最大值和当前的最小值都是不包含，肯定不满足</span>
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>((!arr[i].minInclude)&amp;&amp;(!arr[i<span class="hljs-number">-1</span>].maxInclude)){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'取值范围错误-前一个的最大值和当前的最小值都是不包含情况，不满足收尾相连'</span>);
                <span class="hljs-keyword">return</span>;
            }
        }
    }
}

</code></pre>
<p>测试用例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1=[{min:10,max:20,minInclude:false,maxInclude:true},{min:21,max:30,minInclude:true,maxInclude:true}],
arr2=[{min:10,max:20,minInclude:false,maxInclude:true},{min:20,max:30,minInclude:true,maxInclude:false}],
arr3=[{min:10,max:20,minInclude:false,maxInclude:true},{min:20,max:30,minInclude:false,maxInclude:false}],
arr4=[{min:10,max:20,minInclude:false,maxInclude:false},{min:20,max:30,minInclude:true,maxInclude:false}],
arr5=[{min:10,max:20,minInclude:false,maxInclude:false},{min:21,max:30,minInclude:true,maxInclude:false}],
arr6=[{min:10,max:20,minInclude:false,maxInclude:false},{min:15,max:30,minInclude:false,maxInclude:false}],
arr7=[{min:10,max:20,minInclude:false,maxInclude:false},{min:20,max:30,minInclude:false,maxInclude:false}],
arr8=[{min:1,max:20,minInclude:false,maxInclude:false},{min:20,max:30,minInclude:false,maxInclude:false}],
arr9=[{min:20,max:20,minInclude:false,maxInclude:false},{min:20,max:30,minInclude:false,maxInclude:false}], 
arr10=[{min:20,max:30,minInclude:false,maxInclude:false},{min:20,max:70,minInclude:false,maxInclude:false}];  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var arr1=[{<span class="hljs-string">min:</span><span class="hljs-number">10</span>,<span class="hljs-string">max:</span><span class="hljs-number">20</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">true</span>},{<span class="hljs-string">min:</span><span class="hljs-number">21</span>,<span class="hljs-string">max:</span><span class="hljs-number">30</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">true</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">true</span>}],
arr2=[{<span class="hljs-string">min:</span><span class="hljs-number">10</span>,<span class="hljs-string">max:</span><span class="hljs-number">20</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">true</span>},{<span class="hljs-string">min:</span><span class="hljs-number">20</span>,<span class="hljs-string">max:</span><span class="hljs-number">30</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">true</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>}],
arr3=[{<span class="hljs-string">min:</span><span class="hljs-number">10</span>,<span class="hljs-string">max:</span><span class="hljs-number">20</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">true</span>},{<span class="hljs-string">min:</span><span class="hljs-number">20</span>,<span class="hljs-string">max:</span><span class="hljs-number">30</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>}],
arr4=[{<span class="hljs-string">min:</span><span class="hljs-number">10</span>,<span class="hljs-string">max:</span><span class="hljs-number">20</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>},{<span class="hljs-string">min:</span><span class="hljs-number">20</span>,<span class="hljs-string">max:</span><span class="hljs-number">30</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">true</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>}],
arr5=[{<span class="hljs-string">min:</span><span class="hljs-number">10</span>,<span class="hljs-string">max:</span><span class="hljs-number">20</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>},{<span class="hljs-string">min:</span><span class="hljs-number">21</span>,<span class="hljs-string">max:</span><span class="hljs-number">30</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">true</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>}],
arr6=[{<span class="hljs-string">min:</span><span class="hljs-number">10</span>,<span class="hljs-string">max:</span><span class="hljs-number">20</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>},{<span class="hljs-string">min:</span><span class="hljs-number">15</span>,<span class="hljs-string">max:</span><span class="hljs-number">30</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>}],
arr7=[{<span class="hljs-string">min:</span><span class="hljs-number">10</span>,<span class="hljs-string">max:</span><span class="hljs-number">20</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>},{<span class="hljs-string">min:</span><span class="hljs-number">20</span>,<span class="hljs-string">max:</span><span class="hljs-number">30</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>}],
arr8=[{<span class="hljs-string">min:</span><span class="hljs-number">1</span>,<span class="hljs-string">max:</span><span class="hljs-number">20</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>},{<span class="hljs-string">min:</span><span class="hljs-number">20</span>,<span class="hljs-string">max:</span><span class="hljs-number">30</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>}],
arr9=[{<span class="hljs-string">min:</span><span class="hljs-number">20</span>,<span class="hljs-string">max:</span><span class="hljs-number">20</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>},{<span class="hljs-string">min:</span><span class="hljs-number">20</span>,<span class="hljs-string">max:</span><span class="hljs-number">30</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>}], 
arr10=[{<span class="hljs-string">min:</span><span class="hljs-number">20</span>,<span class="hljs-string">max:</span><span class="hljs-number">30</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>},{<span class="hljs-string">min:</span><span class="hljs-number">20</span>,<span class="hljs-string">max:</span><span class="hljs-number">70</span>,<span class="hljs-string">minInclude:</span><span class="hljs-literal">false</span>,<span class="hljs-string">maxInclude:</span><span class="hljs-literal">false</span>}];  
</code></pre>
<p>运行结果</p>
<p><span class="img-wrap"><img data-src="/img/bVZFwH?w=909&amp;h=570" src="https://static.alili.tech/img/bVZFwH?w=909&amp;h=570" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">4.数组对比</h2>
<p>这个基于我回答过的一个问题，现在化用，改写一下</p>
<p>JavaScript如何对比两个数组？数组B根据数组A来做出增删？ (不用jquery，原生js)<br>具体问题是这样的：</p>
<p>arryA</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arrayA = ['a','b','c'];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var arrayA</span> = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>];
</code></pre>
<p>arryB</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arrayB = [{
    key:'a',
    num1:'1',
    num2:'2',
    num3:'3',
    tot:'6'
},{
    key:'b',
    num1:'11',
    num2:'22',
    num3:'33',
    tot:'66'
},{
    key: 'c',
    num1: '111',
    num2: '222',
    num3: '333',
    tot:666
}];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>var arrayB = [{
    key:<span class="hljs-string">'a'</span>,
    <span class="hljs-symbol">num1</span>:<span class="hljs-string">'1'</span>,
    <span class="hljs-symbol">num2</span>:<span class="hljs-string">'2'</span>,
    <span class="hljs-symbol">num3</span>:<span class="hljs-string">'3'</span>,
    tot:<span class="hljs-string">'6'</span>
},{
    key:<span class="hljs-string">'b'</span>,
    <span class="hljs-symbol">num1</span>:<span class="hljs-string">'11'</span>,
    <span class="hljs-symbol">num2</span>:<span class="hljs-string">'22'</span>,
    <span class="hljs-symbol">num3</span>:<span class="hljs-string">'33'</span>,
    tot:<span class="hljs-string">'66'</span>
},{
    key: <span class="hljs-string">'c'</span>,
    <span class="hljs-symbol">num1</span>: <span class="hljs-string">'111'</span>,
    <span class="hljs-symbol">num2</span>: <span class="hljs-string">'222'</span>,
    <span class="hljs-symbol">num3</span>: <span class="hljs-string">'333'</span>,
    tot:<span class="hljs-number">666</span>
}];
</code></pre>
<p>1、如果arryA中有a，arryB中没有，那么在arryB中增加一个key值为a的boj，且其他属性值可均为'0';如下： {key:'a',num1:'0',num2:'0',num3:'0',tot':0'}</p>
<p>2、如果arryA中有a，arryB中也有key值为a的obj,那么arryB则不改变，并且该obj里的其他属性和属性值均不变;</p>
<p>3、如果在arryA中删除了a，那么arryB中key值为a的obj整个删掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//准备临时数组
function compareArr(arr1,arr2){
    var result=[],arr;
    //遍历
    for(var i=0;i<arr1.length;i++){
        //根据arr1[i]的值，查找arrayB，如果arr2中的有满足条件（arrayB中的对象，有key值等于arrayA[i]）的项，就会返回满足条件的项，否则返回underfind;
        arr=arr2.find(function(val){return val.key===arr1[i]});
        //如果arr不是undefind，就会添加arr，否则添加{key:arrayA[i],num1:'0',num2:'0',num3:'0',tot:'0'}。
        arr?result.push(arr):result.push({key:arrayA[i],num1:'0',num2:'0',num3:'0',tot:'0'});
    }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//准备临时数组</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compareArr</span><span class="hljs-params">(arr1,arr2)</span></span>{
    <span class="hljs-keyword">var</span> result=[],arr;
    <span class="hljs-comment">//遍历</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr1.length;i++){
        <span class="hljs-comment">//根据arr1[i]的值，查找arrayB，如果arr2中的有满足条件（arrayB中的对象，有key值等于arrayA[i]）的项，就会返回满足条件的项，否则返回underfind;</span>
        arr=arr2.find(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(val)</span></span>{<span class="hljs-keyword">return</span> val.key===arr1[i]});
        <span class="hljs-comment">//如果arr不是undefind，就会添加arr，否则添加{key:arrayA[i],num1:'0',num2:'0',num3:'0',tot:'0'}。</span>
        arr?result.push(arr):result.push({key:arrayA[i],num1:<span class="hljs-string">'0'</span>,num2:<span class="hljs-string">'0'</span>,num3:<span class="hljs-string">'0'</span>,tot:<span class="hljs-string">'0'</span>});
    }
}

</code></pre>
<p>测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arrayA = ['b','c'];
var arrayB = [{
    key:'a',
    num1:'1',
    num2:'2',
    num3:'3',
    tot:'6'
},{
    key:'b',
    num1:'11',
    num2:'22',
    num3:'33',
    tot:'66'
},{
    key: 'c',
    num1: '111',
    num2: '222',
    num3: '333',
    tot:666
}];
compareArr(arrayA,arrayB);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>var arrayA = [<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>];
var arrayB = [{
    key:<span class="hljs-string">'a'</span>,
    <span class="hljs-symbol">num1</span>:<span class="hljs-string">'1'</span>,
    <span class="hljs-symbol">num2</span>:<span class="hljs-string">'2'</span>,
    <span class="hljs-symbol">num3</span>:<span class="hljs-string">'3'</span>,
    tot:<span class="hljs-string">'6'</span>
},{
    key:<span class="hljs-string">'b'</span>,
    <span class="hljs-symbol">num1</span>:<span class="hljs-string">'11'</span>,
    <span class="hljs-symbol">num2</span>:<span class="hljs-string">'22'</span>,
    <span class="hljs-symbol">num3</span>:<span class="hljs-string">'33'</span>,
    tot:<span class="hljs-string">'66'</span>
},{
    key: <span class="hljs-string">'c'</span>,
    <span class="hljs-symbol">num1</span>: <span class="hljs-string">'111'</span>,
    <span class="hljs-symbol">num2</span>: <span class="hljs-string">'222'</span>,
    <span class="hljs-symbol">num3</span>: <span class="hljs-string">'333'</span>,
    tot:<span class="hljs-number">666</span>
}];
compareArr<span class="hljs-comment">(arrayA,arrayB)</span>;
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZFB6?w=510&amp;h=77" src="https://static.alili.tech/img/bVZFB6?w=510&amp;h=77" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">5.学院获奖</h2>
<p>统计学生申请优秀毕业生，并且符合条件的（成绩优秀，拿过奖学金，获得过三好学生）。前提是要申请</p>
<p>大概的流程图就是像下面这样！</p>
<p><span class="img-wrap"><img data-src="/img/bVZGtZ?w=775&amp;h=785" src="https://static.alili.tech/img/bVZGtZ?w=775&amp;h=785" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我在代码上写上注释，相信不难理解了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//学生列表
//isApply：是否有申请优秀毕业生
let studentList = [
    {
        name: 'aa',
        isApply: false,
        id: 1
    },
    {
        name: 'bb',
        isApply: true,
        id: 2
    },
    {
        name: 'cc',
        isApply: true,
        id: 3
    }
];

//申请优秀毕业生的学生 isApply:true

let _student = studentList.filter(function (item) {
    return item.isApply;
});
//isExcellent:优秀学生的id列表
//isScholarship:获得过奖学金的学生的id列表
//isThreeGood:获得过三好学生的学生的id列表
//accord:集合
let isExcellent = [1, 2, 3, 4, 5], isScholarship = [4, 2, 5, 6, 2, 1, 2], isThreeGood = [2, 1, 4, 52, 36], accord = [];
//数组去重函数
function removeRepeatArr(arr) {
    return arr.filter(function (item, index, self) {
        return self.indexOf(item) === index;
    });
}

//统计数组中，一个遇上元素的出现次数
function getEleCount(obj, ele) {
    let num = 0;
    for (let i = 0, len = obj.length; i < len; i++) {
        if (ele === obj[i]) {
            num++;
        }
    }
    return num;
}

//添加学生记录，把获得成绩优秀的学生的id，获得过奖学金的学生的id，获得过三好学生的id添加进去。
//但是添加之前，要对获得成绩优秀的学生的id，获得过奖学金的学生的id，获得过三好学生的id。这个三个数组进行去重再添加进accord，因为一个学生可能不止一次成绩优秀，不止一次获得过奖学金，不止一次获得过三好学生
//这样就方便下面的判断，只要学生的id在accord里面出现两次及以上就符合条件
accord.push.apply(accord, removeRepeatArr(isExcellent));
accord.push.apply(accord, removeRepeatArr(isScholarship));
accord.push.apply(accord, removeRepeatArr(isThreeGood));
console.log(accord);
//符合条件的学生列表
let accordStudent = [];
for (let i = 0; i < _student.length; i++) {
    //只要学生的id在accord里面出现两次及以上
    if (getEleCount(accord, _student[i].id) >= 2) {
        //记录哪些学生符合条件
        accordStudent.push(_student[i]);
    }
}
console.log(accordStudent);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">//学生列表</span>
<span class="hljs-comment">//isApply：是否有申请优秀毕业生</span>
<span class="hljs-keyword">let</span> studentList = [
    {
        <span class="hljs-attribute">name</span>: <span class="hljs-string">'aa'</span>,
        <span class="hljs-attribute">isApply</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 1
    },
    {
        name</span>: <span class="hljs-string">'bb'</span>,
        <span class="hljs-attribute">isApply</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 2
    },
    {
        name</span>: <span class="hljs-string">'cc'</span>,
        <span class="hljs-attribute">isApply</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 3
    }
];

//申请优秀毕业生的学生 isApply</span>:<span class="hljs-literal">true</span>

<span class="hljs-keyword">let</span> _student = studentList.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
    <span class="hljs-keyword">return</span> item.isApply;
});
<span class="hljs-comment">//isExcellent:优秀学生的id列表</span>
<span class="hljs-comment">//isScholarship:获得过奖学金的学生的id列表</span>
<span class="hljs-comment">//isThreeGood:获得过三好学生的学生的id列表</span>
<span class="hljs-comment">//accord:集合</span>
<span class="hljs-keyword">let</span> isExcellent = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>], isScholarship = [<span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>], isThreeGood = [<span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">52</span>, <span class="hljs-number">36</span>], accord = [];
<span class="hljs-comment">//数组去重函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeRepeatArr</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item, index, self</span>) </span>{
        <span class="hljs-keyword">return</span> self.indexOf(item) === index;
    });
}

<span class="hljs-comment">//统计数组中，一个遇上元素的出现次数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getEleCount</span>(<span class="hljs-params">obj, ele</span>) </span>{
    <span class="hljs-keyword">let</span> num = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = obj.length; i &lt; len; i++) {
        <span class="hljs-keyword">if</span> (ele === obj[i]) {
            num++;
        }
    }
    <span class="hljs-keyword">return</span> num;
}

<span class="hljs-comment">//添加学生记录，把获得成绩优秀的学生的id，获得过奖学金的学生的id，获得过三好学生的id添加进去。</span>
<span class="hljs-comment">//但是添加之前，要对获得成绩优秀的学生的id，获得过奖学金的学生的id，获得过三好学生的id。这个三个数组进行去重再添加进accord，因为一个学生可能不止一次成绩优秀，不止一次获得过奖学金，不止一次获得过三好学生</span>
<span class="hljs-comment">//这样就方便下面的判断，只要学生的id在accord里面出现两次及以上就符合条件</span>
accord.push.apply(accord, removeRepeatArr(isExcellent));
accord.push.apply(accord, removeRepeatArr(isScholarship));
accord.push.apply(accord, removeRepeatArr(isThreeGood));
<span class="hljs-built_in">console</span>.log(accord);
<span class="hljs-comment">//符合条件的学生列表</span>
<span class="hljs-keyword">let</span> accordStudent = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; _student.length; i++) {
    <span class="hljs-comment">//只要学生的id在accord里面出现两次及以上</span>
    <span class="hljs-keyword">if</span> (getEleCount(accord, _student[i].id) &gt;= <span class="hljs-number">2</span>) {
        <span class="hljs-comment">//记录哪些学生符合条件</span>
        accordStudent.push(_student[i]);
    }
}
<span class="hljs-built_in">console</span>.log(accordStudent);
</code></pre>
<h2 id="articleHeader5">6.数组连续的最大长度</h2>
<p>这个也是出于我回答过的问题：如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//假如有一个数组，下面这个数组最大的连续长度就是4——————8,9,10,11
var arr=[1,2,4,5,6,8,9,10,11];

//代码实现
function countLen(arr){
    //如果参数不是数组或者长度为0，直接返回0
    if(arr.constructor!==Array||arr.length===0){return 0;}
    //首先进入当前连续长度nowLen设初始化为1，最大连续长度maxLen初始化为0
    var nowLen=1,maxLen=0;
    
    for(var i=1,len=arr.length;i<len;i++){
        //当前数组元素是不是比上一个数组大1
        if(arr[i]-arr[i-1]===1){
            //如果是，当前连续长度nowLen+1    
            nowLen++;
        }
        else{
            //否则先判断，当前连续长度是否大于最大连续长度
            if(maxLen<nowLen){
                //如果是就赋值
                maxLen=nowLen
            }
            //当前连续长度初始化为1
            nowLen=1;
        }
    }
    //循环完再判断一次当前连续长度是否大于最大连续长度（避免最大连续长度是数组最后面几个数组时产生的bug）
    if(maxLen<nowLen){
        maxLen=nowLen
    }
    //返回最大连续长度
    return maxLen;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">//假如有一个数组，下面这个数组最大的连续长度就是4——————8,9,10,11</span>
var arr=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>,<span class="hljs-number">10</span>,<span class="hljs-number">11</span>];

<span class="hljs-comment">//代码实现</span>
function countLen(arr){
    <span class="hljs-comment">//如果参数不是数组或者长度为0，直接返回0</span>
    if(arr.constructor!==Array||arr.length===<span class="hljs-number">0</span>){return <span class="hljs-number">0</span>;}
    <span class="hljs-comment">//首先进入当前连续长度nowLen设初始化为1，最大连续长度maxLen初始化为0</span>
    var nowLen=<span class="hljs-number">1</span>,maxLen=<span class="hljs-number">0</span>;
    
    for(var i=<span class="hljs-number">1</span>,len=arr.length;i&lt;len;i++){
        <span class="hljs-comment">//当前数组元素是不是比上一个数组大1</span>
        if(arr[i]-arr[i<span class="hljs-number">-1</span>]===<span class="hljs-number">1</span>){
            <span class="hljs-comment">//如果是，当前连续长度nowLen+1    </span>
            nowLen++;
        }
        else{
            <span class="hljs-comment">//否则先判断，当前连续长度是否大于最大连续长度</span>
            if(maxLen&lt;nowLen){
                <span class="hljs-comment">//如果是就赋值</span>
                maxLen=nowLen
            }
            <span class="hljs-comment">//当前连续长度初始化为1</span>
            nowLen=<span class="hljs-number">1</span>;
        }
    }
    <span class="hljs-comment">//循环完再判断一次当前连续长度是否大于最大连续长度（避免最大连续长度是数组最后面几个数组时产生的bug）</span>
    if(maxLen&lt;nowLen){
        maxLen=nowLen
    }
    <span class="hljs-comment">//返回最大连续长度</span>
    return maxLen;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVVkoG?w=409&amp;h=81" src="https://static.alili.tech/img/bVVkoG?w=409&amp;h=81" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVVkrT?w=383&amp;h=78" src="https://static.alili.tech/img/bVVkrT?w=383&amp;h=78" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">7.答题连对数</h2>
<p>这个和上面的代码基本一样，只是判断条件毫厘之差，直接贴，大家看就好</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function countTrue(arr){debugger;
    //如果参数不是数组或者长度为0，直接返回0
    if(arr.constructor!==Array||arr.length===0){return 0;}
    //首先初始化连续答对长度nowLen为0，最大连续答对长度maxLen为0
    var nowLen=0,maxLen=0;
    for(var i=0,len=arr.length;i<len;i++){
        //当前数组元素是不是比上一个数组大1
        if(arr[i]){
            //如果是，当前连续长度nowLen+1
            nowLen++;
        }
        else{
            //否则先判断，当前连续长度是否大于最大连续长度
            if(maxLen<nowLen){
                //如果是就赋值
                maxLen=nowLen
            }
            //当前连续长度初始化为0
            nowLen=0;
        }
    }
    //循环完再判断一次当前连续长度是否大于最大连续长度（避免最大连续长度是数组最后面几个数组时产生的bug）
    if(maxLen<nowLen){
        maxLen=nowLen
    }
    //返回最大连续长度
    return maxLen;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countTrue</span>(<span class="hljs-params">arr</span>)</span>{<span class="hljs-keyword">debugger</span>;
    <span class="hljs-comment">//如果参数不是数组或者长度为0，直接返回0</span>
    <span class="hljs-keyword">if</span>(arr.constructor!==<span class="hljs-built_in">Array</span>||arr.length===<span class="hljs-number">0</span>){<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;}
    <span class="hljs-comment">//首先初始化连续答对长度nowLen为0，最大连续答对长度maxLen为0</span>
    <span class="hljs-keyword">var</span> nowLen=<span class="hljs-number">0</span>,maxLen=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,len=arr.length;i&lt;len;i++){
        <span class="hljs-comment">//当前数组元素是不是比上一个数组大1</span>
        <span class="hljs-keyword">if</span>(arr[i]){
            <span class="hljs-comment">//如果是，当前连续长度nowLen+1</span>
            nowLen++;
        }
        <span class="hljs-keyword">else</span>{
            <span class="hljs-comment">//否则先判断，当前连续长度是否大于最大连续长度</span>
            <span class="hljs-keyword">if</span>(maxLen&lt;nowLen){
                <span class="hljs-comment">//如果是就赋值</span>
                maxLen=nowLen
            }
            <span class="hljs-comment">//当前连续长度初始化为0</span>
            nowLen=<span class="hljs-number">0</span>;
        }
    }
    <span class="hljs-comment">//循环完再判断一次当前连续长度是否大于最大连续长度（避免最大连续长度是数组最后面几个数组时产生的bug）</span>
    <span class="hljs-keyword">if</span>(maxLen&lt;nowLen){
        maxLen=nowLen
    }
    <span class="hljs-comment">//返回最大连续长度</span>
    <span class="hljs-keyword">return</span> maxLen;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZFHs?w=555&amp;h=116" src="https://static.alili.tech/img/bVZFHs?w=555&amp;h=116" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">8.命名方式转换</h2>
<p>比如驼峰命名方式转'-'命名方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;shouHou&quot;;
//$1-第一个括号匹配的内容
//这个实例，$1='H'
str = str.replace(/([A-Z])/g,&quot;-$1&quot;).toLowerCase();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var str = <span class="hljs-string">"shouHou"</span>;
<span class="hljs-regexp">//</span><span class="hljs-variable">$1</span>-第一个括号匹配的内容
<span class="hljs-regexp">//</span>这个实例，<span class="hljs-variable">$1</span>=<span class="hljs-string">'H'</span>
str = str.replace(<span class="hljs-regexp">/([A-Z])/g</span>,<span class="hljs-string">"-$1"</span>).toLowerCase();
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZFM3?w=416&amp;h=51" src="https://static.alili.tech/img/bVZFM3?w=416&amp;h=51" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>比如'-'命名方式转驼峰命名方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=&quot;shou-hou&quot;;
//$0-匹配的结果   $1-第一个括号匹配的内容
//这个实例$0='-h'    $1='h'
str=str.replace(/-(\w)/g,function($0,$1){
    return $1.toUpperCase();
}); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var str=<span class="hljs-string">"shou-hou"</span>;
<span class="hljs-regexp">//</span><span class="hljs-variable">$0</span>-匹配的结果   <span class="hljs-variable">$1</span>-第一个括号匹配的内容
<span class="hljs-regexp">//</span>这个实例<span class="hljs-variable">$0</span>=<span class="hljs-string">'-h'</span>    <span class="hljs-variable">$1</span>=<span class="hljs-string">'h'</span>
str=str.replace(<span class="hljs-regexp">/-(\w)/g</span>,<span class="hljs-keyword">function</span>(<span class="hljs-variable">$0</span>,<span class="hljs-variable">$1</span>){
    return <span class="hljs-variable">$1</span>.toUpperCase();
}); 
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZFND?w=393&amp;h=107" src="https://static.alili.tech/img/bVZFND?w=393&amp;h=107" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">9.格式化字符</h2>
<p>这个最常见的就是在金额方面的显示需求上，比如后台返回10000。前端要显示成10,000或者其他格式等！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//str
//size-每隔几个字符进行分割 默认3
//delimiter-分割符 默认','
function formatText(str,size,delimiter){
    var _str=str.toString();
    var _size=size||3,_delimiter=delimiter||',';
    /* 
     如果_size是3
     &quot;\d{1,3}(?=(\d{3})+$)&quot; 
     */
    var regText='\\d{1,'+_size+'}(?=(\\d{'+_size+'})+$)';
    /*   
    /\d{1,3}(?=(\d{3})+$)/g     这个正则的意思：匹配连续的三个数字，但是这些三个数字不能是字符串的开头1-3个字符  
     */
    var reg=new RegExp(regText,'g');
    /* 
    (-?) 匹配前面的-号   (\d+)匹配中间的数字   ((\.\d+)?)匹配小数点后面的数字
    //$0-匹配结果，$1-第一个括号返回的内容----(-?)    $2,$3如此类推  
    */
    return _str.replace(/^(-?)(\d+)((\.\d+)?)$/, function ($0, $1, $2, $3) {
          return $1 + $2.replace(reg, '$&amp;,') + $3;
    })
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">//str</span>
<span class="hljs-comment">//size-每隔几个字符进行分割 默认3</span>
<span class="hljs-comment">//delimiter-分割符 默认','</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatText</span>(<span class="hljs-params">str,size,delimiter</span>)</span>{
    <span class="hljs-built_in">var</span> _str=str.toString();
    <span class="hljs-built_in">var</span> _size=<span class="hljs-built_in">size</span>||<span class="hljs-number">3</span>,_delimiter=delimiter||<span class="hljs-string">','</span>;
    <span class="hljs-comment">/* 
     如果_size是3
     "\d{1,3}(?=(\d{3})+$)" 
     */</span>
    <span class="hljs-built_in">var</span> regText=<span class="hljs-string">'\\d{1,'</span>+_size+<span class="hljs-string">'}(?=(\\d{'</span>+_size+<span class="hljs-string">'})+$)'</span>;
    <span class="hljs-comment">/*   
    /\d{1,3}(?=(\d{3})+$)/g     这个正则的意思：匹配连续的三个数字，但是这些三个数字不能是字符串的开头1-3个字符  
     */</span>
    <span class="hljs-built_in">var</span> reg=<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regText,<span class="hljs-string">'g'</span>);
    <span class="hljs-comment">/* 
    (-?) 匹配前面的-号   (\d+)匹配中间的数字   ((\.\d+)?)匹配小数点后面的数字
    //$0-匹配结果，$1-第一个括号返回的内容----(-?)    $2,$3如此类推  
    */</span>
    <span class="hljs-keyword">return</span> _str.replace(<span class="hljs-regexp">/^(-?)(\d+)((\.\d+)?)$/</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$0, $1, $2, $3</span>) </span>{
          <span class="hljs-keyword">return</span> $<span class="hljs-number">1</span> + $<span class="hljs-number">2.</span>replace(reg, <span class="hljs-string">'$&amp;,'</span>) + $<span class="hljs-number">3</span>;
    })
}

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZGem?w=422&amp;h=186" src="https://static.alili.tech/img/bVZGem?w=422&amp;h=186" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">10.对象合并，并且记录异常数据</h2>
<p>这个需求，可能大家有点懵。下面实例分析<br>比如有两个都地方记录了我的信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let info1={
        name:&quot;守候&quot;,
        sex:&quot;男&quot;,
        age:24,
        job:&quot;web前端&quot;
    },info2={
        name:&quot;守候!&quot;,
        country:&quot;china&quot;,
        interest:&quot;basketball&quot;,
        phone:&quot;12345678910&quot;,
        job:&quot;web前端&quot;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>let info1={
<span class="hljs-symbol">        name:</span><span class="hljs-string">"守候"</span>,
<span class="hljs-symbol">        sex:</span><span class="hljs-string">"男"</span>,
<span class="hljs-symbol">        age:</span><span class="hljs-number">24</span>,
<span class="hljs-symbol">        job:</span><span class="hljs-string">"web前端"</span>
    },info2={
<span class="hljs-symbol">        name:</span><span class="hljs-string">"守候!"</span>,
<span class="hljs-symbol">        country:</span><span class="hljs-string">"china"</span>,
<span class="hljs-symbol">        interest:</span><span class="hljs-string">"basketball"</span>,
<span class="hljs-symbol">        phone:</span><span class="hljs-string">"12345678910"</span>,
<span class="hljs-symbol">        job:</span><span class="hljs-string">"web前端"</span>
    }</code></pre>
<p>现在要合并我的信息，并且记录可能有异常的信息。比如上面的name属性，在两个对象都有，而且两个对象的值不一样，那么就不知道到底是info1中的name属性是正确的，还是info2中的name属性是正确的。所以，就得把name这个属性记录起来，方便以后核对name这个属性。</p>
<p>如下图</p>
<p><span class="img-wrap"><img data-src="/img/bVZK5J?w=538&amp;h=150" src="https://static.alili.tech/img/bVZK5J?w=538&amp;h=150" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下面，一步一步来，先不管3721，直接合并属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let objAll={};
function assignObj(objArr) {
    let _obj={};
    for(let i=0;i<objArr.length;i++){
        _obj=Object.assign(_obj,objArr[i],{});
    }
    return JSON.parse(JSON.stringify(_obj));
}
objAll=assignObj([objA,objB]); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> objAll={};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">assignObj</span>(<span class="hljs-params">objArr</span>) </span>{
    <span class="hljs-keyword">let</span> _obj={};
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;objArr.length;i++){
        _obj=<span class="hljs-built_in">Object</span>.assign(_obj,objArr[i],{});
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(_obj));
}
objAll=assignObj([objA,objB]); </code></pre>
<p>然后先准备一个字段，记录哪些异常信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="objAll.warnInfo=[];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">objAll.warnInfo=[]<span class="hljs-comment">;</span></code></pre>
<p>最后检查对象，判断哪些信息有异常</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function checkObj(_objAll,objList) {
        //获取所有属性
        let _keys=Object.keys(_objAll);
        for(let i=0;i<objList.length;i++){
            for(let j=0;j<_keys.length;j++){
                //如果_keys[j]这个属性，在objList[i]和_objAll里面都存在，而且这两个值是不一样的，那么就是一场数据，需要记录！
                if(objList[i][_keys[j]]!==undefined&amp;&amp;_objAll[_keys[j]]!==objList[i][_keys[j]]){
                    _objAll.isError.push(_keys[j]);
                }
            }
        }
        return _objAll;
    }
    console.log(checkObj(objAll,[objA,objB]));  
     
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>  function checkObj(<span class="hljs-variable">_objAll</span>,objList) {
        <span class="hljs-comment">//获取所有属性</span>
        let <span class="hljs-variable">_keys</span>=Object.keys(<span class="hljs-variable">_objAll</span>);
        <span class="hljs-keyword">for</span>(let i=<span class="hljs-number">0</span>;i&lt;objList.length;i++){
            <span class="hljs-keyword">for</span>(let j=<span class="hljs-number">0</span>;j&lt;<span class="hljs-variable">_keys</span>.length;j++){
                <span class="hljs-comment">//如果_keys[j]这个属性，在objList[i]和_objAll里面都存在，而且这两个值是不一样的，那么就是一场数据，需要记录！</span>
                <span class="hljs-keyword">if</span>(objList[i][<span class="hljs-variable">_keys</span>[j]]!==undefined&amp;&amp;<span class="hljs-variable">_objAll</span>[<span class="hljs-variable">_keys</span>[j]]!==objList[i][<span class="hljs-variable">_keys</span>[j]]){
                    <span class="hljs-variable">_objAll</span>.isError.push(<span class="hljs-variable">_keys</span>[j]);
                }
            }
        }
        return <span class="hljs-variable">_objAll</span>;
    }
    console.<span class="hljs-built_in">log</span>(checkObj(objAll,[objA,objB]));  
     
</code></pre>
<h2 id="articleHeader10">11.筛选标签</h2>
<p>如下图，在下面渲染这个标签</p>
<p><span class="img-wrap"><img data-src="/img/bVZRX5?w=447&amp;h=53" src="https://static.alili.tech/img/bVZRX5?w=447&amp;h=53" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>大家可能第一可能觉得压根没难度<br>就是一个对象数组：比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var searchTag=[
    {label:'产品编码',value:'100072236-8'},
    {label:'产品名称',value:'甘油'}
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>var searchTag=[
    {<span class="hljs-keyword">label</span><span class="bash">:<span class="hljs-string">'产品编码'</span>,value:<span class="hljs-string">'100072236-8'</span>},
</span>    {<span class="hljs-keyword">label</span><span class="bash">:<span class="hljs-string">'产品名称'</span>,value:<span class="hljs-string">'甘油'</span>}
</span>]</code></pre>
<p>但是这样的数据，显然是要经过处理生成的</p>
<p>因为不可能这样发送请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://example.com?产品编码=100072236-8   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span><span class="hljs-comment">//example.com?产品编码=100072236-8   </span></code></pre>
<p>发送过去的参数应该是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://example.com?proId=100072236-8

var searchParam={proId:'100072236-8',proName:'甘油'}   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">http:</span><span class="hljs-comment">//example.com?proId=100072236-8</span>

var searchParam={<span class="hljs-string">proId:</span><span class="hljs-string">'100072236-8'</span>,<span class="hljs-string">proName:</span><span class="hljs-string">'甘油'</span>}   </code></pre>
<p>怎么进行数据的处理呢，其实很简单，代码不打注释，我想都看得懂</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var searchTag=[];
var searchText={proId:'产品编码',proName:'产品名称'};
var searchParam={proId:'100072236-8',proName:'甘油'};
Object.keys(searchParam).forEach(function (item) {
    searchTag.push({
        label:searchText[item],
        key:item,
        value:searchParam[item]
    })
})
console.log(searchTag)    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> searchTag=[];
<span class="hljs-keyword">var</span> searchText={<span class="hljs-attr">proId</span>:<span class="hljs-string">'产品编码'</span>,<span class="hljs-attr">proName</span>:<span class="hljs-string">'产品名称'</span>};
<span class="hljs-keyword">var</span> searchParam={<span class="hljs-attr">proId</span>:<span class="hljs-string">'100072236-8'</span>,<span class="hljs-attr">proName</span>:<span class="hljs-string">'甘油'</span>};
<span class="hljs-built_in">Object</span>.keys(searchParam).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
    searchTag.push({
        <span class="hljs-attr">label</span>:searchText[item],
        <span class="hljs-attr">key</span>:item,
        <span class="hljs-attr">value</span>:searchParam[item]
    })
})
<span class="hljs-built_in">console</span>.log(searchTag)    
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZR7C?w=424&amp;h=75" src="https://static.alili.tech/img/bVZR7C?w=424&amp;h=75" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>有了这些数据，渲染到页面这个就简单了！</p>
<h2 id="articleHeader11">12.导入excel内容</h2>
<p>就是excel上这样的内容</p>
<p><span class="img-wrap"><img data-src="/img/bV0cT9?w=365&amp;h=331" src="https://static.alili.tech/img/bV0cT9?w=365&amp;h=331" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>转成下面的数据</p>
<p><span class="img-wrap"><img data-src="/img/bV0cV8?w=337&amp;h=206" src="https://static.alili.tech/img/bV0cV8?w=337&amp;h=206" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV0cWa?w=151&amp;h=64" src="https://static.alili.tech/img/bV0cWa?w=151&amp;h=64" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>目录如下</p>
<p><span class="img-wrap"><img data-src="/img/bV0c7w?w=375&amp;h=281" src="https://static.alili.tech/img/bV0c7w?w=375&amp;h=281" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>下面开始写代码，我们利用node.js来写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let path = require('path');
//使用ejsexcel读取excel文件  npm install ejsexcel --save
let ejsExcel=require('ejsexcel');
let fs=require('fs');
//读取excel
let exBuf=fs.readFileSync(__dirname+'/resource/userList.xlsx');
let _data=[];
//获取成功后
ejsExcel.getExcelArr(exBuf).then(exlJson=>{
    //获取excel数据
    let workBook=exlJson;
    //获取excel第一张表 sheet1
    let workSheets=workBook[0];
    //导出js的路径
    let newfilepath=path.join(__dirname,&quot;/resource/test.js&quot;);
    //遍历第一张表的的每一行数据
    workSheets.forEach((item,index)=>{
        //从第二行开始插入，避免连表头也插入_data里面
        if(index>0){
            //往_data插入单元格个值，item[0]相当于excel中的姓名，item[1]就是excel中的联系电话
            _data.push({
                name:item[0],
                phone:item[1]
            })
        }
    });
    //写入js文件
    fs.writeFileSync(newfilepath, 'let _data='+JSON.stringify(_data)+';export {_data}');
}).catch(error=>{
    //打印获取失败信息
    console.log(&quot;读取错误!&quot;);
    console.log(error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-comment">//使用ejsexcel读取excel文件  npm install ejsexcel --save</span>
<span class="hljs-keyword">let</span> ejsExcel=<span class="hljs-built_in">require</span>(<span class="hljs-string">'ejsexcel'</span>);
<span class="hljs-keyword">let</span> fs=<span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-comment">//读取excel</span>
<span class="hljs-keyword">let</span> exBuf=fs.readFileSync(__dirname+<span class="hljs-string">'/resource/userList.xlsx'</span>);
<span class="hljs-keyword">let</span> _data=[];
<span class="hljs-comment">//获取成功后</span>
ejsExcel.getExcelArr(exBuf).then(<span class="hljs-function"><span class="hljs-params">exlJson</span>=&gt;</span>{
    <span class="hljs-comment">//获取excel数据</span>
    <span class="hljs-keyword">let</span> workBook=exlJson;
    <span class="hljs-comment">//获取excel第一张表 sheet1</span>
    <span class="hljs-keyword">let</span> workSheets=workBook[<span class="hljs-number">0</span>];
    <span class="hljs-comment">//导出js的路径</span>
    <span class="hljs-keyword">let</span> newfilepath=path.join(__dirname,<span class="hljs-string">"/resource/test.js"</span>);
    <span class="hljs-comment">//遍历第一张表的的每一行数据</span>
    workSheets.forEach(<span class="hljs-function">(<span class="hljs-params">item,index</span>)=&gt;</span>{
        <span class="hljs-comment">//从第二行开始插入，避免连表头也插入_data里面</span>
        <span class="hljs-keyword">if</span>(index&gt;<span class="hljs-number">0</span>){
            <span class="hljs-comment">//往_data插入单元格个值，item[0]相当于excel中的姓名，item[1]就是excel中的联系电话</span>
            _data.push({
                <span class="hljs-attr">name</span>:item[<span class="hljs-number">0</span>],
                <span class="hljs-attr">phone</span>:item[<span class="hljs-number">1</span>]
            })
        }
    });
    <span class="hljs-comment">//写入js文件</span>
    fs.writeFileSync(newfilepath, <span class="hljs-string">'let _data='</span>+<span class="hljs-built_in">JSON</span>.stringify(_data)+<span class="hljs-string">';export {_data}'</span>);
}).catch(<span class="hljs-function"><span class="hljs-params">error</span>=&gt;</span>{
    <span class="hljs-comment">//打印获取失败信息</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"读取错误!"</span>);
    <span class="hljs-built_in">console</span>.log(error);
});</code></pre>
<p>然后命令行执行该js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node importFile.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ <span class="hljs-keyword">node</span> <span class="hljs-title">importFile</span>.js
</code></pre>
<p>然后就发现多了一个test.js文件</p>
<p><span class="img-wrap"><img data-src="/img/bV0c8J?w=1179&amp;h=369" src="https://static.alili.tech/img/bV0c8J?w=1179&amp;h=369" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>excel的数据就这样导入成js的一个数组了，只要引入这个数组，就可以正常的使用了！</p>
<h2 id="articleHeader12">13.随机循环</h2>
<p>当时接到的业务是实际显示客户的信息，感觉有点像音乐播放器的随机循环。</p>
<p>要求有两个：<br>1.一个提示列表里面，提示的信息每隔500ms随机展示。<br>2.同一轮循环里面，一个提示信息只能展示一次。<br>3.列表的提示信息全部展示完了，进行下一轮展示。<br>这个逻辑没什么，直接在代码打上注释，我想大家就明白了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tipList=['提示1','提示2','提示3','提示4','提示5','提示6','提示7','提示8','提示9'];
var tipListShow=[];
tipListShow=Object.assign([],tipList);
var i=0,timer=null;
function play() {
    //随机显示一个，显示了之后，把这个项从tipListShow中删除掉，防止在同一轮重复出现！
    console.log(tipListShow.splice(Math.floor(Math.random() * tipListShow.length),1)[0]);
    //当循环完了之后，tipListShow的长度就会是0，然后就重新赋值，准备进行下一轮的随机循环
    if(tipListShow.length===0){
        tipListShow=Object.assign([],tipList);
        i=0;
    }
    //如果需要暂停或者停止的，清除这个定时器即可，下次执行就重新这样创建定时器，执行play();！
    timer=setTimeout(function () {
        play();
    },500);
}
play();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> tipList=[<span class="hljs-string">'提示1'</span>,<span class="hljs-string">'提示2'</span>,<span class="hljs-string">'提示3'</span>,<span class="hljs-string">'提示4'</span>,<span class="hljs-string">'提示5'</span>,<span class="hljs-string">'提示6'</span>,<span class="hljs-string">'提示7'</span>,<span class="hljs-string">'提示8'</span>,<span class="hljs-string">'提示9'</span>];
<span class="hljs-keyword">var</span> tipListShow=[];
tipListShow=<span class="hljs-built_in">Object</span>.assign([],tipList);
<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,timer=<span class="hljs-literal">null</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">play</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//随机显示一个，显示了之后，把这个项从tipListShow中删除掉，防止在同一轮重复出现！</span>
    <span class="hljs-built_in">console</span>.log(tipListShow.splice(<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * tipListShow.length),<span class="hljs-number">1</span>)[<span class="hljs-number">0</span>]);
    <span class="hljs-comment">//当循环完了之后，tipListShow的长度就会是0，然后就重新赋值，准备进行下一轮的随机循环</span>
    <span class="hljs-keyword">if</span>(tipListShow.length===<span class="hljs-number">0</span>){
        tipListShow=<span class="hljs-built_in">Object</span>.assign([],tipList);
        i=<span class="hljs-number">0</span>;
    }
    <span class="hljs-comment">//如果需要暂停或者停止的，清除这个定时器即可，下次执行就重新这样创建定时器，执行play();！</span>
    timer=setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        play();
    },<span class="hljs-number">500</span>);
}
play();
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0wv6?w=255&amp;h=635" src="https://static.alili.tech/img/bV0wv6?w=255&amp;h=635" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader13">14.小结</h2>
<p>好了，关于我收集到的一些业务需求逻辑，以及实现的方式，就说到这里了！接触到的业务需求逻辑很多，但是值得写的，可以当做练习题的，就记录到这里了。我上面代码实现可能会有点粗糙，大家有更好的实现方案，欢迎建议一下。如果大家有什么可以当做练习题的需求，可以提下。让大家有多些练习题可以尝试下，学习下！</p>
<p>-------------------------华丽的分割线--------------------<br>想了解更多，关注关注我的微信公众号：守候书阁</p>
<p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript打怪升级--把业务逻辑当练习题做

## 原文链接
[https://segmentfault.com/a/1190000012499256](https://segmentfault.com/a/1190000012499256)


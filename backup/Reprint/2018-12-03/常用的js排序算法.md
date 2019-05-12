---
title: '常用的js排序算法' 
date: 2018-12-03 2:30:08
hidden: true
slug: mw86l94lip
categories: [reprint]
---

{{< raw >}}

                    
<h3>插入排序</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010733909" src="https://static.alili.tech/img/remote/1460000010733909" alt="图" title="图"></span></p>
<p>算法描述：</p>
<ol>
<li>从第一个元素开始，该元素可以认为已经被排序</li>
<li>取出下一个元素，在已经排序的元素序列中从后向前扫描</li>
<li>如果该元素（已排序）大于新元素，将该元素移到下一位置</li>
<li>重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置</li>
<li>将新元素插入到该位置后</li>
<li>重复步骤 2~5</li>
</ol>
<pre><code>var arr = [5, 6, 3, 1, 8, 7, 2, 4];
for(let i = 1;i&lt;arr.length;i++){
    let myIndex = i;
    console.log('次数：'+i);
    for(let j = i-1 ; j &gt;= 0 ; j -- ){
        console.log('单次比较数据：'+arr[myIndex]+'---'+arr[j])
        if(arr[myIndex] &lt; arr[j]){
            [arr[myIndex],arr[j]] = [arr[j],arr[myIndex]];
            myIndex = j;
        }else{
          break;
        }
        console.log('数组'+arr);
    }
}</code></pre>
<p>时间复杂度 O(n^2)<br>运行过程<br><span class="img-wrap"><img data-src="/img/bVTcBr?w=171&amp;h=894" src="https://static.alili.tech/img/bVTcBr?w=171&amp;h=894" alt="clipboard.png" title="clipboard.png"></span></p>
<h3>选择排序</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014656124?w=671&amp;h=576" src="https://static.alili.tech/img/remote/1460000014656124?w=671&amp;h=576" alt="tu" title="tu"></span></p>
<p>算法描述</p>
<ul>
<li>直接从待排序数组中选择一个最小（或最大）数字，放入新数组中。</li>
<li>假定第一个数字是最小的，然后依次和后面的比较，哪个小哪个就记录当前那个的下标。</li>
<li>记录完下标了之后替换第一个和那个最小数字的位置</li>
<li>依次执行上述步骤，只不过最小的位置依次累加</li>
</ul>
<pre><code>var arr = [5, 6, 3, 1, 8, 7, 2, 4];
for(let i = 0; i &lt; arr.length - 1;i++){
    console.log('次数'+Number(i+1))
    let minIndex = i;
    for(let j = i ;j &lt; arr.length - 1; j++){
         console.log('单次比较数据:'+arr[minIndex]+'---'+arr[j+1])
         if(arr[minIndex] &gt; arr[j+1]){
            minIndex = j+1;
         }
    }
    [arr[minIndex],arr[i]] = [arr[i],arr[minIndex]];
    console.log('数组'+arr);

}</code></pre>
<p>时间复杂度 O(n^2)</p>
<p>运行过程<br><span class="img-wrap"><img data-src="/img/bVTcD5?w=199&amp;h=893" src="https://static.alili.tech/img/bVTcD5?w=199&amp;h=893" alt="clipboard.png" title="clipboard.png"></span></p>
<h3>冒泡排序</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014656125?w=659&amp;h=289" src="https://static.alili.tech/img/remote/1460000014656125?w=659&amp;h=289" alt="tu" title="tu"></span></p>
<pre><code>就几种算法来看，感觉冒泡是比较慢的</code></pre>
<p>算法描述：</p>
<ol>
<li>比较相邻的元素。如果第一个比第二个大，就交换他们两个。</li>
<li>对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。</li>
<li>针对所有的元素重复以上的步骤，除了最后一个。</li>
<li>持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。</li>
</ol>
<pre><code>var arr = [5, 6, 3, 1, 8, 7, 2, 4];
let count = 0;
for(let i = arr.length ; i &gt; 0; i --){
    console.log('次数'+i);
    for(let j = 1; j &lt; i; j ++){
        console.log('单次比较数据:'+arr[j]+'----'+arr[j-1])
        if(arr[j] &lt; arr[j-1]){
            [arr[j],arr[j-1]] = [arr[j-1],arr[j]]
        }
    }
    console.log(arr);
}</code></pre>
<p>时间复杂度 O(n^2)</p>
<p>运行过程<br><span class="img-wrap"><img data-src="/img/bVTcE8?w=264&amp;h=917" src="https://static.alili.tech/img/bVTcE8?w=264&amp;h=917" alt="clipboard.png" title="clipboard.png"></span></p>
<h3>归并排序</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014656126?w=588&amp;h=483" src="https://static.alili.tech/img/remote/1460000014656126?w=588&amp;h=483" alt="t" title="t"></span></p>
<pre><code>归并排序的图可能一下看不懂，是因为图代表的是运行的过程,主要看算法描述
</code></pre>
<p>归并排序：其基本思想是分治策略，先进行划分，然后再进行合并。<br>假设要对数组C进行归并排序，步骤是：<br>1.先将C划分为两个数组A和B（即把数组C从中间分开）<br>2.再分别对数组A、B重复步骤1的操作，逐步划分，直到不能再划分为止(每个子数组只剩下一个元素)，这样，划分的过程就结束了。<br>如：              [12 20 30 21 15 33 26 19 40 25]<br>划分为:  [12 20 30 21 15]                [33 26 19 40 25]</p>
<pre><code>       [12 20]      [30 21 15]       [33 26]       [19 40 25]
     [12]  [20]   [30]  [21 15]     [33]  [26]    [19]    [40 25]
     [12]  [20]   [30] [21] [15]    [33]  [26]    [19]   [40] [25]</code></pre>
<p>3.然后从下层往上层不断合并数组，每一层合并相邻的两个子数组，合并的过程是每次从待合并的两个子数组中选取一个最小的元素，然后把这个元素放到合并后的数组中，不断重复直到把两个子数组的元素都放到合并后的数组为止。<br>4.依次类推，直到合并到最上层结束，这时数据的排序已经完成了。</p>
<pre><code>var arr = [5, 6, 3, 1, 8, 7, 2, 4,9];
function mergeSort(arr){
    if(arr.length === 1){
        return arr;
    }
    let midIndex = Math.floor(arr.length / 2);
    let leftArr = arr.slice(0,midIndex);
    let rightArr = arr.slice(midIndex);
    console.log('拆分数组'+leftArr+'------'+rightArr)
    return mergeFn(mergeSort(leftArr),mergeSort(rightArr));
}.
function mergeFn(left,right){
    let tmp = [];
    console.log(left + '----' + right);
    while (left.length &amp;&amp; right.length) {
        console.log('单次比较数据：'+left[0]+'和'+right[0]+'谁小谁所在的数组就被shift掉一个')
        if (left[0] &lt; right[0]){
          tmp.push(left.shift());
        }
        else{
          tmp.push(right.shift());
        }
        console.log(tmp);
    }
    let arra = tmp.concat(left, right);
    console.log('本次比较完毕:'+arra);

    return arra;

}
mergeSort(arr);
</code></pre>
<p>时间复杂度 O(nlogn)</p>
<p>运行过程，看了运行过程就能看懂图了，也知道js函数里的参数有函数的情况下的执行顺序是自左向右<br><span class="img-wrap"><img data-src="/img/bVTcG4?w=346&amp;h=512" src="https://static.alili.tech/img/bVTcG4?w=346&amp;h=512" alt="clipboard.png" title="clipboard.png"></span><br><span class="img-wrap"><img data-src="/img/bVTcHi?w=362&amp;h=747" src="https://static.alili.tech/img/bVTcHi?w=362&amp;h=747" alt="clipboard.png" title="clipboard.png"></span></p>
<h3>快速排序</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014656127" src="https://static.alili.tech/img/remote/1460000014656127" alt="tt" title="tt"></span></p>
<p>图上的运行方式是按照基准是第0号位算的，看起来稍微有点乱，不过只要知道快排是怎么算的就好了</p>
<p>算法描述：</p>
<ul>
<li>在数据集之中，选择一个元素作为”基准”（pivot）。</li>
<li>所有小于”基准”的元素，都移到”基准”的左边；所有大于”基准”的元素，都移到”基准”的右边。这个操作称为分区 (partition)操作，分区操作结束后，基准元素所处的位置就是最终排序后它的位置。</li>
<li>对”基准”左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。</li>
</ul>
<pre><code>var arr = [5, 6, 3, 1, 8, 7, 2, 4];
function quickSort(arr){
    if(arr.length &lt;= 1){
        return arr;
    }
    //找基准
    let midIndex = Math.floor(arr.length/2);
    //剔除基准值
    let midNum = arr.splice(midIndex,1)[0];
    console.log('基准值:'+midNum);
    let leftArr = [],rightArr=[];
    for(let i = 0 ; i &lt; arr.length; i++){
        //小于基准的进左边，大于的进右边
        arr[i] &lt; midNum ? leftArr.push(arr[i]) : rightArr.push(arr[i])
    }
    console.log('小于基准值的数组：'+leftArr);
    console.log('大于基准值的数组:'+rightArr);
    return quickSort(leftArr).concat(midNum,quickSort(rightArr));
}
quickSort(arr);</code></pre>
<p>时间复杂度 O(nlogn)</p>
<p>运行过程<br><span class="img-wrap"><img data-src="/img/bVTcIS?w=272&amp;h=353" src="https://static.alili.tech/img/bVTcIS?w=272&amp;h=353" alt="clipboard.png" title="clipboard.png"></span><br>这个运行过程是按照基准为0号位算的；</p>
<h2>总结</h2>
<p>可以看到，快速排序和归并排序是比较快。而且快排更容易理解更好写一些。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常用的js排序算法

## 原文链接
[https://segmentfault.com/a/1190000014656119](https://segmentfault.com/a/1190000014656119)

